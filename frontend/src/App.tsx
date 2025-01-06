// import Header from "./components/layout/Header";
import { TodoApp } from "./components/layout/TodoApp";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/layout/Header";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {token ? (
                <div className='min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex flex-col'>
                  <main className='flex-grow flex items-center justify-center p-4'>
                    <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden'>
                      <div className='p-8'>
                        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
                          My Todo List
                        </h1>
                        <TodoApp />
                      </div>
                    </div>
                  </main>
                </div>
              ) : (
                <Navigate to='/login' />
              )}
            </>
          }
        />
        <Route
          path='/login'
          element={<>{token ? <Navigate to='/' /> : <Login />}</>}
        />
        <Route
          path='/register'
          element={<>{token ? <Navigate to='/' /> : <Register />}</>}
        />
      </Routes>
    </>
  );
}

export default App;

