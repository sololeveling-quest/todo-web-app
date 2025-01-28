export interface Category {
  id: string
  name: string
  isPredefined?: boolean
}

export interface Step {
  id: string
  content: string
  completed: boolean
}

export interface Note {
  id: string
  content: string
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  category?: string
  hashtags: string[]
  dueDate?: string
  reminder?: string
  steps: Step[]
  notes: Note[]
}
