import { Habit } from "../storage/habits/reducer";

async function findAll(userId: number): Promise<Habit[]> {
  const response = await fetch(`http://localhost:5500/users/${userId}/habits`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Get all habits failed');
}

export default {
  findAll,
};
