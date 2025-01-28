"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/client/api"

interface Category {
  id: string
  name: string
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories()
    setCategories(fetchedCategories)
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategoryName.trim()) {
      const result = await addCategory({ name: newCategoryName.trim() })
      if (result.success && result.category) {
        setCategories([...categories, result.category])
        setNewCategoryName("")
      }
    }
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory && editingCategory.name.trim()) {
      const result = await updateCategory(editingCategory.id, { name: editingCategory.name.trim() })
      if (result.success) {
        setCategories(categories.map((c) => (c.id === editingCategory.id ? editingCategory : c)))
        setEditingCategory(null)
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteCategory(id)
    if (result.success) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddCategory} className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Add Category</Button>
        </form>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between p-2 bg-white rounded shadow">
              {editingCategory && editingCategory.id === category.id ? (
                <form onSubmit={handleUpdateCategory} className="flex space-x-2 flex-grow">
                  <Input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="flex-grow"
                  />
                  <Button type="submit">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <span>{category.name}</span>
                  <div>
                    <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)} className="mr-2">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

