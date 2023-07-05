import { User } from "../storage/users/reducer";
import axios from "axios";
import { url } from "./config";

async function login(email: string, password: string): Promise<User> {
  const response = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) return response.json();
  throw new Error('Login failed');
}

async function register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
  const response = await axios.post(`${url}/users`, {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
}

async function update(userId: number, firstName: string, lastName: string, gender: string, dob: string, weight: number, height: number): Promise<User> {
  const response = await axios.patch(`${url}/users/${userId}`, {
      firstName,
      lastName,
      gender,
      dob,
      weight,
      height,
  });
  return response.data;
}

export default {
  login,
  register,
  update,
};
