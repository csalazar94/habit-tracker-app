import { Habit } from "../storage/habits/reducer";
import { DailyRecord } from "../types/screens";
import { url } from "./config";

async function findOne(habitId: number): Promise<Habit> {
  const response = await fetch(`${url}/habits/${habitId}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Get one habit failed');
}

async function findAll(userId: number): Promise<Habit[]> {
  const response = await fetch(`${url}/users/${userId}/habits`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Get all habits failed');
}

async function create(userId: number, habitCategoryId: number, name: string, frequency: string, target: number): Promise<Habit[]> {
  const response = await fetch(`${url}/users/${userId}/habits`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habitCategoryId,
      name,
      frequency,
      target,
    }),
  });
  const data = await response.json();
  if (response.ok) return data;
  throw new Error('Create habit failed');
}

async function createDailyRecord(habitId: number, date: string): Promise<DailyRecord> {
  const response = await fetch(`${url}/daily-records`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habitId,
      date,
    }),
  });
  const data = await response.json();
  if (response.ok) return data;
  throw new Error('Create daily record failed');
}

async function deleteDailyRecord(dailyRecordId: number): Promise<DailyRecord> {
  const response = await fetch(`${url}/daily-records/${dailyRecordId}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) return response.json();
  throw new Error('Delete daily record failed');
}

export default {
  findOne,
  findAll,
  create,
  createDailyRecord,
  deleteDailyRecord,
};
