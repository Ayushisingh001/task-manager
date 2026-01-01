// src/api.js
const BASE_URL = "http://localhost:5000/api/v1"; // your API base URL

// Auth
export const registerUser = (user) =>
  fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

export const loginUser = (user) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

// Tasks CRUD
export const getTasks = (token) =>
  fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = (task, token) =>
  fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

// ✅ NEW: Update task
export const updateTask = (id, task, token) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

export const deleteTask = (id, token) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
