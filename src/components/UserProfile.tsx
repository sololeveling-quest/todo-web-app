'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export function UserProfile() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b bg-gray-50">
      <div className="flex items-center space-x-3 mb-2 md:mb-0 text-sm">
        <Avatar>
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-base font-semibold leading-none">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="hover:bg-primary hover:text-white"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}
