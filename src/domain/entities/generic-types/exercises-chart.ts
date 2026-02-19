type Exercise = {
  exerciseId: string;
  series: number;
  repts: number;
  weight: number;
  division: string;
};

export type RawExercisesChart = {
  userId: string;
  goals: string;
  observation?: string;
  divisions: {
    name: string;
    weekDays: number[];
  }[];
  exercises: Exercise[];
};

export type ExercisesChart = {
  id: string;
  userId: string;
  goals: string;
  observation?: string;
  divisions: {
    name: string;
    weekDays: number[];
  }[];
  exercises: Array<
    Exercise & {
      name: string;
      category: string;
      equipment?: string;
      reference?: string;
    }
  >;
};
