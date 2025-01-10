import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      alert('Login failed')
    } else {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/')
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Log In
          </h1>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleLogin} className="w-full mt-4">
              Log In
            </Button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
