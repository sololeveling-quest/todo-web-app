'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateTask, deleteTask, getTasks } from '@/lib/client/api'
import {
  Search,
  Calendar,
  Bell,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Edit,
  Trash2,
} from 'lucide-react'
import { EditTaskDialog } from './EditTaskDialog'
import type { Task } from '@/lib/types'

interface TaskListProps {
  tasks: Task[]
  onTasksChange: () => void
}

export function TaskList({ tasks, onTasksChange }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [expandedTasks, setExpandedTasks] = useState<string[]>([])
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        // const fetchedTasks = await getTasks()
        // Update your tasks state here -  This would require a mechanism to update the tasks state from the fetchedTasks.  This is omitted as the provided code doesn't show how tasks are managed.  A potential solution would be to pass a setTasks function as a prop.
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      const result = await updateTask(taskId, { completed: !task.completed })
      if (result) {
        onTasksChange()
      }
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    const result = await deleteTask(taskId)
    if (result) {
      onTasksChange()
    }
  }

  const handleEditTask = async (updatedTask: Task) => {
    const result = await updateTask(updatedTask.id, updatedTask)
    if (result) {
      onTasksChange()
      setEditingTask(null)
    }
  }

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId],
    )
  }

  const filteredTasks = tasks?.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedHashtag || task.hashtags.includes(selectedHashtag)),
  )

  const allHashtags = Array.from(new Set(tasks?.flatMap((task) => task.hashtags)))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {allHashtags.map((hashtag) => (
          <Button
            key={hashtag}
            variant={selectedHashtag === hashtag ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setSelectedHashtag(selectedHashtag === hashtag ? null : hashtag)}
          >
            #{hashtag}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">No tasks found</div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-card text-card-foreground rounded-lg shadow-sm border border-border hover:shadow transition-all duration-200 ease-in-out"
            >
              <div className="flex items-start justify-between p-4">
                <div className="flex items-start space-x-3 flex-1">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task.id)}
                    id={`task-${task.id}`}
                    className="mt-1"
                    aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                  />
                  <div className="flex flex-col">
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`text-lg font-medium cursor-pointer ${
                        task.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {task.title}
                    </label>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                      {task.dueDate && (
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                      {task.reminder && (
                        <span className="flex items-center">
                          <Bell className="h-3 w-3 mr-1" />
                          {formatDate(task.reminder)}
                        </span>
                      )}
                      {task.notes && task.notes.length > 0 && (
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {task.notes.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingTask(task)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleTaskExpansion(task.id)}>
                    {expandedTasks.includes(task.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {expandedTasks.includes(task.id) && (
                <div className="px-4 pb-2">
                  {task.steps && task.steps.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold mb-1">Steps:</h4>
                      <ul className="space-y-1">
                        {task.steps.map((step) => (
                          <li key={step.id} className="flex items-center space-x-2">
                            <Checkbox checked={step.completed} disabled />
                            <span
                              className={step.completed ? 'line-through text-muted-foreground' : ''}
                            >
                              {step.content}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {task.notes && task.notes.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold mb-1">Notes:</h4>
                      <ul className="space-y-1">
                        {task.notes.map((note) => (
                          <li key={note.id} className="text-sm">
                            <span>{note.content}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {new Date(note.createdAt).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {task.hashtags && task.hashtags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Hashtags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {task.hashtags.map((hashtag) => (
                          <span
                            key={hashtag}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                          >
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleEditTask}
        />
      )}
    </div>
  )
}
