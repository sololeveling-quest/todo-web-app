'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { TaskList } from '@/components/TaskList'
import { AddTaskForm } from '@/components/AddTaskForm'
import { OnboardingTips } from '@/components/OnboardingTips'
import { addTask, getTasks } from '@/lib/client/api'
import type { Category, Task } from '@/lib/types'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [selectedCategory])

  const fetchTasks = async () => {
    if (selectedCategory) {
      const fetchedTasks = await getTasks(selectedCategory.id)
      setTasks(fetchedTasks)
    }
  }

  const handleAddTask = async (taskData: {
    title: string
    description?: string
    categoryId?: string
  }) => {
    const result = await addTask(taskData)
    if (result) {
      fetchTasks()
    }
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <button
          className="md:hidden p-2 bg-primary text-white rounded-md text-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0`}
        >
          <Sidebar
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            tasks={tasks}
          />
        </div>

        <main className="flex-1 py-6 px-4 md:py-10 md:px-8 overflow-auto custom-scrollbar">
          <div className="max-w-full md:max-w-4xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-4">
              <h1 className="text-3xl font-bold text-primary">
                {selectedCategory?.name ?? 'All Tasks'}
              </h1>
              <div className="flex items-center space-x-4">
                <AddTaskForm onAddTask={handleAddTask} selectedCategory={selectedCategory} />
              </div>
            </div>

            <TaskList tasks={filteredTasks} onTasksChange={fetchTasks} />
          </div>
        </main>
        <OnboardingTips />
      </div>
    </ProtectedRoute>
  )
}
