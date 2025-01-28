import type { Category, Task } from '@/lib/types'

const API_URL = '/api'

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'An error occurred')
  }

  const json = await response.json()

  if (json.docs) {
    return json.docs
  }

  if (json.doc) {
    return json.doc
  }

  return json
}

// Auth-related functions
export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/users/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return handleResponse(response)
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: 'include',
  })
  return handleResponse(response)
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  return handleResponse(response)
}

// Category-related functions
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`, {
    credentials: 'include',
  })
  return handleResponse(response)
}

export async function addCategory(data: { name: string }): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function updateCategory(id: string, data: { name: string }): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  return handleResponse(response)
}

// Task-related functions
export async function getTasks(category: string): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks?where[category][equals]=${category}`, {
    credentials: 'include',
  })
  return handleResponse(response)
}

export async function addTask(data: {
  title: string
  description?: string
  category?: string
  dueDate?: string
  reminder?: string
  steps?: { content: string; completed: boolean }[]
  notes?: { content: string; createdAt: string }[]
  hashtags?: string[]
}): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  return handleResponse(response)
}
