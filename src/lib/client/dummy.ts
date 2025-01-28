import type { Category, Task } from "@/lib/types"

export const mockCategories: Category[] = [
  { id: "all", name: "All Tasks", isPredefined: true },
  { id: "important", name: "Important", isPredefined: true },
  { id: "planned", name: "Planned", isPredefined: true },
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
]

export const mockTasks: Task[] = [
  { id: "1", title: "Complete project proposal", completed: false, categoryId: "1" },
  { id: "2", title: "Buy groceries", completed: true, categoryId: "2" },
  { id: "3", title: "Prepare for meeting", completed: false, categoryId: "1" },
  { id: "4", title: "Go for a run", completed: false, categoryId: "2" },
]

