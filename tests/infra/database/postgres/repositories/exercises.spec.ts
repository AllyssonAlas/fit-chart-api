import { PrismaClient } from '@prisma/client';

import { ExerciseRepository } from '@/infra/database/postgres/repositories';

import { clearAllTables, createExercises, createRole, createUsers } from '@/tests/helpers';

describe('ExerciseRepository', () => {
  let prisma: PrismaClient;
  let sut: ExerciseRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    sut = new ExerciseRepository();
  });

  afterEach(async () => {
    clearAllTables(prisma);
  });

  describe('saveExercisesChart', () => {
    it('Should save an exercise chart', async () => {
      await createRole(prisma, 'any_role_name');
      await createUsers(prisma, [{ id: 'any_user_id', role: 'any_role_name' }]);
      await createExercises(prisma, 'any_category', [
        { id: 'any_exercise_id_1', name: 'any_exercise_name_1', equipment: 'any_equipment', availableAt: [] },
        { id: 'any_exercise_id_2', name: 'any_exercise_name_2', availableAt: [] },
        { id: 'any_exercise_id_3', name: 'any_exercise_name_3', availableAt: [] },
      ]);

      await sut.saveExercisesChart({
        userId: 'any_user_id',
        goals: 'any_goal',
        observation: 'any_observation',
        divisions: [
          { name: 'any_division_1', weekDays: [0, 2] },
          { name: 'any_division_2', weekDays: [1, 3] },
        ],
        exercises: [
          { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
          { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
        ],
      });
      const exercisesChart = await prisma.exercisesChart.findFirst({
        where: { userId: 'any_user_id' },
        include: { divisions: true, exercises: true },
      });

      expect(exercisesChart?.id).toBeTruthy();
      expect(exercisesChart?.goals).toBe('any_goal');
      expect(exercisesChart?.userId).toBe('any_user_id');
      expect(exercisesChart?.observation).toBe('any_observation');
      expect(exercisesChart?.divisions[0].name).toBe('any_division_1');
      expect(exercisesChart?.divisions[0].weekDays).toEqual([0, 2]);
      expect(exercisesChart?.divisions[1].name).toBe('any_division_2');
      expect(exercisesChart?.divisions[1].weekDays).toEqual([1, 3]);
      expect(exercisesChart?.exercises[0].exerciseId).toBe('any_exercise_id_2');
      expect(exercisesChart?.exercises[0].series).toBe(3);
      expect(exercisesChart?.exercises[0].repts).toBe(10);
      expect(exercisesChart?.exercises[0].weight).toBe(30);
      expect(exercisesChart?.exercises[0].division).toBe('any_division_2');
      expect(exercisesChart?.exercises[1].exerciseId).toBe('any_exercise_id_1');
      expect(exercisesChart?.exercises[1].series).toBe(4);
      expect(exercisesChart?.exercises[1].repts).toBe(12);
      expect(exercisesChart?.exercises[1].weight).toBe(20);
      expect(exercisesChart?.exercises[1].division).toBe('any_division_1');
    });
  });
});
