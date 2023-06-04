import { User } from "../storage/users/reducer";

async function login(email: string, password: string): Promise<User> {
  const response = await fetch('http://localhost:5500/auth/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) return response.json();
  throw new Error('Login failed');
}

async function register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
  const response = await fetch('http://localhost:5500/users', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  if (response.ok) return response.json();
  throw new Error('Register failed');
}

async function update(userId: number, firstName: string, lastName: string, gender: string, dob: string, weight: number, height: number): Promise<User> {
  const response = await fetch(`http://localhost:5500/users/${userId}`, {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      gender,
      dob,
      weight,
      height,
    }),
  });
  if (response.ok) return response.json();
  throw new Error('Update user failed');
}

export default {
  login,
  register,
  update,
};
