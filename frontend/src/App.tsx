import Header from './components/layout/Header'
import { TodoApp } from './components/layout/TodoApp'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                My Todo List
              </h1>
              <TodoApp />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
