import { User } from "../storage/user/reducer";

async function login(email: string, password: string): Promise<User> {
  const response = await fetch('http://192.168.100.45:5500/auth/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) return response.json();
  throw new Error('Login failed');
}

async function register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
  const response = await fetch('http://192.168.100.45:5500/users', {
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

export default {
  login,
  register,
};
