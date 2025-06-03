export type ExercisesChart = {
  userId: string;
  goals: string;
  observation?: string;
  divisions: {
    name: string;
    weekDays: number[];
  }[];
  exercises: {
    exerciseId: string;
    series: number;
    repts: number;
    weight: number;
    division: string;
  }[];
};
