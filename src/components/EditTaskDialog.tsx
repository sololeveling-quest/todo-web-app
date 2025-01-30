'use client'

import { useState, type KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, X } from 'lucide-react'
import type { Task, Step, Note } from '@/lib/types'

interface EditTaskDialogProps {
  task: Task
  onClose: () => void
  onSave: (updatedTask: Task) => void
}

export function EditTaskDialog({ task, onClose, onSave }: Readonly<EditTaskDialogProps>) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [completed, setCompleted] = useState(task.completed)
  const [dueDate, setDueDate] = useState(task.dueDate ?? '')
  const [reminder, setReminder] = useState(task.reminder ?? '')
  const [steps, setSteps] = useState<Step[]>(task.steps || [])
  const [newStep, setNewStep] = useState('')
  const [notes, setNotes] = useState<Note[]>(task.notes || [])
  const [newNote, setNewNote] = useState('')
  const [hashtags, setHashtags] = useState<string[]>(task.hashtags || [])
  const [newHashtag, setNewHashtag] = useState('')
  const [activeTab, setActiveTab] = useState('main')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSave({
        ...task,
        title: title.trim(),
        description: description.trim(),
        completed,
        dueDate: dueDate || undefined,
        reminder: reminder || undefined,
        steps,
        notes,
        hashtags,
      })
    }
  }

  const addStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, { id: Date.now().toString(), content: newStep.trim(), completed: false }])
      setNewStep('')
    }
  }

  const deleteStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
  }

  const toggleStepCompletion = (stepId: string) => {
    setSteps(
      steps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
    )
  }

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        { id: Date.now().toString(), content: newNote.trim(), createdAt: new Date().toISOString() },
      ])
      setNewNote('')
    }
  }

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()])
      setNewHashtag('')
    }
  }

  const deleteHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter((h) => h !== hashtag))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      action()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="main">Main</TabsTrigger>
              <TabsTrigger value="steps">Steps</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="main" className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reminder" className="text-right">
                    Reminder
                  </Label>
                  <Input
                    id="reminder"
                    type="datetime-local"
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="completed" className="text-right">
                    Completed
                  </Label>
                  <Checkbox
                    id="completed"
                    checked={completed}
                    onCheckedChange={(checked) => setCompleted(checked as boolean)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Hashtags</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((hashtag) => (
                        <div
                          key={hashtag}
                          className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
                        >
                          #{hashtag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteHashtag(hashtag)}
                            className="h-4 w-4 ml-1"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newHashtag}
                        onChange={(e) => setNewHashtag(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, addHashtag)}
                        placeholder="New hashtag"
                      />
                      <Button type="button" onClick={addHashtag} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="space-y-4">
              <div className="grid gap-4 py-4">
                <Label>Steps</Label>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        checked={step.completed}
                        onCheckedChange={() => toggleStepCompletion(step.id)}
                      />
                      <span className={step.completed ? 'line-through' : ''}>{step.content}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteStep(step.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, addStep)}
                    placeholder="New step"
                  />
                  <Button type="button" onClick={addStep} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div className="grid gap-4 py-4">
                <Label>Notes</Label>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {notes.map((note) => (
                    <div key={note.id} className="flex items-center space-x-2 mb-2">
                      <span>{note.content}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNote(note.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, addNote)}
                    placeholder="New note"
                  />
                  <Button type="button" onClick={addNote} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
