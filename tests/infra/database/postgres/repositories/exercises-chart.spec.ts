import { PrismaClient } from '@prisma/client';

import { ExercisesChartRepository } from '@/infra/database/postgres/repositories';

import { clearAllTables, createExercises, createExercisesChart, createRole, createUsers } from '@/tests/helpers';

describe('ExercisesChartRepository', () => {
  let prisma: PrismaClient;
  let sut: ExercisesChartRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    sut = new ExercisesChartRepository();
  });

  afterEach(async () => {
    await clearAllTables(prisma);
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

  describe('loadExercisesCharts', () => {
    it('Should return an empty array if user does not have exercises chart', async () => {
      const exercisesCharts = await sut.loadExercisesCharts({ userId: 'any_user_id' });

      expect(exercisesCharts).toEqual([]);
    });

    it('Should return user exercises chart list', async () => {
      await createRole(prisma, 'any_role_name');
      await createUsers(prisma, [
        { id: 'any_user_id_1', email: 'any_email_1@mail.com', role: 'any_role_name' },
        { id: 'any_user_id_2', email: 'any_email_2@mail.com', role: 'any_role_name' },
      ]);
      await createExercises(prisma, 'any_category', [
        { id: 'any_exercise_id_1', name: 'any_exercise_name_1', equipment: 'any_equipment', availableAt: [] },
        { id: 'any_exercise_id_2', name: 'any_exercise_name_2', availableAt: [] },
        { id: 'any_exercise_id_3', name: 'any_exercise_name_3', availableAt: [] },
      ]);

      await createExercisesChart(prisma, [
        {
          userId: 'any_user_id_1',
          goals: 'any_goal_1',
          observation: 'any_observation',
          divisions: [
            { name: 'any_division_1', weekDays: [0, 1] },
            { name: 'any_division_2', weekDays: [2, 3] },
          ],
          exercises: [
            { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
            { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
          ],
        },
        {
          userId: 'any_user_id_1',
          goals: 'any_goal_2',
          divisions: [
            { name: 'any_division_1', weekDays: [0, 1] },
            { name: 'any_division_2', weekDays: [2, 3] },
          ],
          exercises: [
            { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
            { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
          ],
        },
        {
          userId: 'any_user_id_2',
          goals: 'any_goal_3',
          divisions: [
            { name: 'any_division_1', weekDays: [0, 1] },
            { name: 'any_division_2', weekDays: [2, 3] },
            { name: 'any_division_3', weekDays: [4, 5, 6] },
          ],
          exercises: [{ exerciseId: 'any_exercise_id_3', series: 5, repts: 8, weight: 15, division: 'any_division_1' }],
        },
      ]);

      const exercisesChartsOne = await sut.loadExercisesCharts({ userId: 'any_user_id_1' });
      const exercisesChartsTwo = await sut.loadExercisesCharts({ userId: 'any_user_id_2' });

      expect(exercisesChartsOne).toHaveLength(2);
      expect(exercisesChartsOne[0]?.id).toBeTruthy();
      expect(exercisesChartsOne[0]?.goals).toBe('any_goal_1');
      expect(exercisesChartsOne[0]?.userId).toBe('any_user_id_1');
      expect(exercisesChartsOne[0]?.observation).toBe('any_observation');
      expect(exercisesChartsOne[0]?.divisions[0].name).toBe('any_division_1');
      expect(exercisesChartsOne[0]?.divisions[0].weekDays).toEqual([0, 1]);
      expect(exercisesChartsOne[0]?.divisions[1].name).toBe('any_division_2');
      expect(exercisesChartsOne[0]?.divisions[1].weekDays).toEqual([2, 3]);
      expect(exercisesChartsOne[0]?.exercises[0].exerciseId).toBe('any_exercise_id_1');
      expect(exercisesChartsOne[0]?.exercises[0].series).toBe(4);
      expect(exercisesChartsOne[0]?.exercises[0].repts).toBe(12);
      expect(exercisesChartsOne[0]?.exercises[0].weight).toBe(20);
      expect(exercisesChartsOne[0]?.exercises[0].division).toBe('any_division_1');
      expect(exercisesChartsOne[0]?.exercises[1].exerciseId).toBe('any_exercise_id_2');
      expect(exercisesChartsOne[0]?.exercises[1].series).toBe(3);
      expect(exercisesChartsOne[0]?.exercises[1].repts).toBe(10);
      expect(exercisesChartsOne[0]?.exercises[1].weight).toBe(30);
      expect(exercisesChartsOne[0]?.exercises[1].division).toBe('any_division_2');
      expect(exercisesChartsOne[1]?.id).toBeTruthy();
      expect(exercisesChartsOne[1]?.goals).toBe('any_goal_2');
      expect(exercisesChartsOne[1]?.userId).toBe('any_user_id_1');
      expect(exercisesChartsOne[1]?.observation).toBeUndefined();
      expect(exercisesChartsOne[1]?.divisions[0].name).toBe('any_division_1');
      expect(exercisesChartsOne[1]?.divisions[0].weekDays).toEqual([0, 1]);
      expect(exercisesChartsOne[1]?.divisions[1].name).toBe('any_division_2');
      expect(exercisesChartsOne[1]?.divisions[1].weekDays).toEqual([2, 3]);
      expect(exercisesChartsOne[1]?.exercises[0].exerciseId).toBe('any_exercise_id_1');
      expect(exercisesChartsOne[1]?.exercises[0].series).toBe(4);
      expect(exercisesChartsOne[1]?.exercises[0].repts).toBe(12);
      expect(exercisesChartsOne[1]?.exercises[0].weight).toBe(20);
      expect(exercisesChartsOne[1]?.exercises[0].division).toBe('any_division_1');
      expect(exercisesChartsOne[1]?.exercises[1].exerciseId).toBe('any_exercise_id_2');
      expect(exercisesChartsOne[1]?.exercises[1].series).toBe(3);
      expect(exercisesChartsOne[1]?.exercises[1].repts).toBe(10);
      expect(exercisesChartsOne[1]?.exercises[1].weight).toBe(30);
      expect(exercisesChartsOne[1]?.exercises[1].division).toBe('any_division_2');
      expect(exercisesChartsOne).toHaveLength(2);
      expect(exercisesChartsTwo[0]?.id).toBeTruthy();
      expect(exercisesChartsTwo[0]?.goals).toBe('any_goal_3');
      expect(exercisesChartsTwo[0]?.userId).toBe('any_user_id_2');
      expect(exercisesChartsTwo[0]?.observation).toBeUndefined();
      expect(exercisesChartsTwo[0]?.divisions[0].name).toBe('any_division_1');
      expect(exercisesChartsTwo[0]?.divisions[0].weekDays).toEqual([0, 1]);
      expect(exercisesChartsTwo[0]?.divisions[1].name).toBe('any_division_2');
      expect(exercisesChartsTwo[0]?.divisions[1].weekDays).toEqual([2, 3]);
      expect(exercisesChartsTwo[0]?.divisions[2].name).toBe('any_division_3');
      expect(exercisesChartsTwo[0]?.divisions[2].weekDays).toEqual([4, 5, 6]);
      expect(exercisesChartsTwo[0]?.exercises[0].exerciseId).toBe('any_exercise_id_3');
      expect(exercisesChartsTwo[0]?.exercises[0].series).toBe(5);
      expect(exercisesChartsTwo[0]?.exercises[0].repts).toBe(8);
      expect(exercisesChartsTwo[0]?.exercises[0].weight).toBe(15);
      expect(exercisesChartsTwo[0]?.exercises[0].division).toBe('any_division_1');
    });
  });
});
