export namespace SaveExercisesChartRepository {
  export type Input = {
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

  export type Output = void;
}

export interface SaveExercisesChartRepository {
  saveExercisesChart(input: SaveExercisesChartRepository.Input): Promise<SaveExercisesChartRepository.Output>;
}
