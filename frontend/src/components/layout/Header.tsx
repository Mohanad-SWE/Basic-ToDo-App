import { UserPlus, LogIn } from 'lucide-react'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'
import { Link } from 'react-router-dom'

export default function Header() {
  const token = localStorage.getItem('token')

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                MaDo App
              </span>
            </div>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <ThemeToggle />
              {token ? (
                <Button
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.reload()
                  }}
                  variant="ghost"
                >
                  Log out
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="ghost">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
