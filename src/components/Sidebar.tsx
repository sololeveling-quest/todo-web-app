'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Check, X, Pencil, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserProfile } from './UserProfile'
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getTaskCategoryCount,
} from '@/lib/client/api'
import type { Category, Task } from '@/lib/types'

interface SidebarProps {
  onSelectCategory: (category: Category) => void
  selectedCategory: Category | null
  tasks: Task[]
}

export function Sidebar({ onSelectCategory, selectedCategory, tasks }: Readonly<SidebarProps>) {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [editingName, setEditingName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [stats, setStats] = useState<{ category: string; count: number }[]>([])

  useEffect(() => {
    fetchCategories()
    fetchTasksCount()
  }, [])

  useEffect(() => {
    fetchTasksCount()
  }, [tasks])

  const fetchTasksCount = async () => {
    const fetchedTasks = await getTaskCategoryCount()
    setStats(fetchedTasks.stats)
  }

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
      if (fetchedCategories.length > 0) {
        onSelectCategory(fetchedCategories[0])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim()) {
      const result = await addCategory({ name: newCategory.trim() })
      if (result) {
        setCategories([...categories, result])
        setNewCategory('')
      }
    }
  }

  const handleUpdateCategory = async (id: string) => {
    if (editingName.trim()) {
      const result = await updateCategory(id, { name: editingName.trim() })
      if (result) {
        setCategories(categories.map((c) => (c.id === id ? { ...c, name: editingName.trim() } : c)))
        setEditingCategoryId(null)
        setEditingName('')
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteCategory(id)
    setCategories(categories.filter((c) => c.id !== id))
  }

  const getTaskCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return tasks.length
    }
    return stats.find((stat) => stat.category === categoryId)?.count ?? 0
  }

  return (
    <div className="w-80 border-r h-screen flex flex-col bg-gray-50">
      <UserProfile />

      <div className="p-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4 custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">No categories found</div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`group flex items-center justify-between py-3 px-2 rounded-md transition-all duration-200 ease-in-out ${
                selectedCategory?.id === category.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-secondary/50'
              }`}
            >
              {editingCategoryId === category.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateCategory(category.id)
                  }}
                  className="flex-1 flex items-center"
                >
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="mr-2"
                    autoFocus
                  />
                  <Button type="submit" size="sm" variant="ghost">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingCategoryId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <>
                  <button
                    onClick={() => onSelectCategory(category)}
                    className="flex items-center space-x-3 flex-1 text-left"
                    aria-label={`Select ${category.name} category`}
                  >
                    <span
                      className="text-lg"
                      aria-label={category.isPredefined ? 'Predefined category' : 'Custom category'}
                    >
                      {category.isPredefined ? '📁' : '📂'}
                    </span>
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground ml-4">
                      {getTaskCount(category.id)}
                    </span>
                  </button>
                  {!category.isPredefined && (
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingCategoryId(category.id)
                          setEditingName(category.name)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAddCategory} className="p-6 border-t">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
