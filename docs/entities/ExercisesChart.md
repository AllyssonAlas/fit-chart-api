# ExercisesOnChart

- chartId: ExercisesChart id
- exerciseId: Exercise id
- exerciseName: Exercise name
- series: number
- reps: number
- weight: number
- division: string
- created_at: date
- updated_at: date

# ExercisesDivisions

- chartId: ExercisesChart id
- name: string
- weekDays: number[]

# ExercisesChart

- id: uuid
- userId: User id
- goals: string
- observation?: string
- exercises: ExercisesOnChart[]
- divisions: ExercisesDivisions[]
- created_at: date
- updated_at: date
