import { HabitCategory } from "../storage/habits/reducer";

async function findAll(): Promise<HabitCategory[]> {
  const response = await fetch('http://localhost:5500/habit-categories', {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Get all habit categories failed');
}

export default {
  findAll,
};
