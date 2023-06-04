import { Habit } from "../storage/habits/reducer";

async function findAll(userId: number): Promise<Habit[]> {
  const response = await fetch(`http://localhost:5500/users/${userId}/habits`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Get all habits failed');
}

async function create(userId: number, habitCategoryId: number, name: string, frequency: string, target: number): Promise<Habit[]> {
  const response = await fetch(`http://localhost:5500/users/${userId}/habits`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habitCategoryId,
      name,
      frequency,
      target,
    }),
  });
  if (response.ok) return response.json();
  throw new Error('Create habit failed');
}

export default {
  findAll,
  create,
};
