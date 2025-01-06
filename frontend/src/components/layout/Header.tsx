import { UserPlus, LogIn } from 'lucide-react'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              MaDo App
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <ThemeToggle />
              <Button variant="ghost">
                <LogIn className="mr-2 h-4 w-4" />
                Log in
              </Button>
              <Button variant="ghost">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
