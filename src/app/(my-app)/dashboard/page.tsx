'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sidebar } from '@/components/Sidebar'
import { TaskList } from '@/components/TaskList'
import { AddTaskForm } from '@/components/AddTaskForm'
import { OnboardingTips } from '@/components/OnboardingTips'
import { addTask, getTasks } from '@/lib/client/api'
import type { Category, Task } from '@/lib/types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [hashtag, setHashtag] = useState('')
  const { user, logout } = useAuth()

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

  const filteredTasks = tasks
    .filter((task) => selectedCategory?.id === 'all' || task.categoryId === selectedCategory?.id)
    .filter(
      (task) =>
        !hashtag || task.hashtags.some((h) => h.toLowerCase().includes(hashtag.toLowerCase())),
    )

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          tasks={tasks}
        />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">{selectedCategory?.name || 'All Tasks'}</h1>
              <div className="flex items-center space-x-4">
                <AddTaskForm onAddTask={handleAddTask} selectedCategory={selectedCategory} />
              </div>
            </div>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Filter by hashtag"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                className="w-full"
              />
            </div>

            <TaskList tasks={tasks} onTasksChange={fetchTasks} />
          </div>
        </main>
        <OnboardingTips />
      </div>
    </ProtectedRoute>
  )
}
