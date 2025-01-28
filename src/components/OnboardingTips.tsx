"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const tips = [
  {
    title: "Welcome to Todo Web App!",
    description: "Let's get you started with a quick tour of the main features.",
  },
  {
    title: "Adding Tasks",
    description:
      "Click the 'Add Task' button to create a new task. You can add a title, description, due date, and more.",
  },
  {
    title: "Organizing with Categories",
    description: "Use the sidebar to create and manage categories. Assign tasks to categories for better organization.",
  },
  {
    title: "Using Hashtags",
    description:
      "Add hashtags to your tasks for easy filtering. Just include a # before any word in your task title or description.",
  },
  {
    title: "Breaking Down Tasks",
    description: "For complex tasks, you can add subtasks or steps. This helps you track progress on larger projects.",
  },
  {
    title: "You're All Set!",
    description: "Now you know the basics. Feel free to explore and customize your todo list. Happy organizing!",
  },
]

export function OnboardingTips() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setIsOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (currentTipIndex < tips.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenOnboarding", "true")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tips[currentTipIndex].title}</DialogTitle>
          <DialogDescription>{tips[currentTipIndex].description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleNext}>{currentTipIndex < tips.length - 1 ? "Next" : "Finish"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

