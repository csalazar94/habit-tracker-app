import { User } from "../storage/user/reducer";

async function login(email: string, password: string): Promise<User> {
  const response = await fetch('http://localhost:5501/auth/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) return response.json();
  throw new Error('Login failed');
}

export default {
  login,
};
