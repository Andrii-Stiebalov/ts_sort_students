export interface Student {
  name: string,
  surname: string,
  age: number,
  married: boolean,
  grades: number[],
}

export type SortOrder= 'asc' | 'desc';

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades'
}

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const calulateAverge = (grades: number[]): number => {
    return grades.reduce((a, b) => a + b) / grades.length;
  };

  switch (sortBy) {
    case 'name':
    case 'surname':
      return order === 'asc'
        ? [...students].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : [...students].sort((a, b) => b[sortBy].localeCompare(a[sortBy]));

    case 'age':
    case 'married':
      return order === 'asc'
        ? [...students].sort((a, b) => +a[sortBy] - +b[sortBy])
        : [...students].sort((a, b) => +b[sortBy] - +a[sortBy]);

    case 'grades':
      return order === 'asc'
        ? [...students].sort((a, b) => {
          return calulateAverge(a[sortBy]) - calulateAverge(b[sortBy]);
        })
        : [...students].sort((a, b) => {
          return calulateAverge(b[sortBy]) - calulateAverge(a[sortBy]);
        });

    default:
      throw new Error('invalid sort option');
  }
}
