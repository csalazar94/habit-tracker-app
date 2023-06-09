import { HabitCategory } from "../storage/habit-categories/reducer";
import { url } from "./config";

async function findAll(): Promise<HabitCategory[]> {
  const response = await fetch(`${url}/habit-categories`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Get all habit categories failed');
}

export default {
  findAll,
};
