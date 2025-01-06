import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { initializeDB } from './db'
import { todos } from './db/schemas'
import dotenv from 'dotenv'
import { eq } from 'drizzle-orm'
import { users } from './db/schemas/users'
// Register
import bcrypt from 'bcrypt'
// import { authMiddleware } from './db/middlewares/auth'

dotenv.config()

const app = new Hono()
const port = 3000

app.use(
  '*',
  cors({
    origin: (origin) => {
      return origin
    },
    credentials: true,
  })
)

// app.use("/auth/*", authMiddleware);

app.post('/login', async (c) => {
  const data = await c.req.json()
  const db = initializeDB(process.env.DATABASE_URL || '')

  if (data.email === '' || data.password === '') {
    return c.json({ message: 'Email and password are required' }, 400)
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .execute()

  if (user.length === 0) {
    return c.json({ message: 'User not found' }, 404)
  }

  // Verify hashed password
  const isValid = await bcrypt.compare(data.password, user[0].password)

  if (!isValid) {
    return c.json({ message: 'Invalid password' }, 401)
  }

  // Generate JWT token
  const payload = { userId: user[0].id, email: user[0].email }
  const token = await sign(payload, process.env.JWT_SECRET || 'super-secret')

  // Don't send password in response
  const { password, ...userWithoutPassword } = user[0]

  return c.json({
    message: 'Logged in successfully',
    user: userWithoutPassword,
    token,
  })
})

app.post('/register', async (c) => {
  const data = await c.req.json()
  const db = initializeDB(process.env.DATABASE_URL || '')

  if (data.email === '' || data.password === '') {
    return c.json({ message: 'Email and password are required' }, 400)
  }

  // Password validation
  if (data.password.length < 6) {
    return c.json({ message: 'Password must be at least 6 characters' }, 400)
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.password, salt)

  const user = await db
    .insert(users)
    .values({
      email: data.email,
      password: hashedPassword,
    })
    .returning()
    .execute()

  // Don't return password in response
  const { password, ...userWithoutPassword } = user[0]

  return c.json(userWithoutPassword, 201)
})

// Logout endpoint
app.post('/logout', async (c) => {
  // Client should remove token from storage
  return c.json({
    message: 'Logged out successfully',
    status: true,
  })
})

// Get all todos
app.get('/auth/todo', async (c) => {
  const db = initializeDB(process.env.DATABASE_URL || '')
  const data = await db.select().from(todos).execute()

  return c.json(data)
})

// Get a todo by id
app.get('/auth/todo/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const db = initializeDB(process.env.DATABASE_URL || '')

  if (!id) {
    return c.json({ message: 'Invalid ID' }, 400)
  }

  const data = await db.select().from(todos).where(eq(todos.id, id)).execute()

  return c.json(data)
})

// Create a new todo
app.post('/auth/todo', async (c) => {
  const data = await c.req.json()
  const db = initializeDB(process.env.DATABASE_URL || '')

  if (data.title === '') {
    return c.json({ message: 'Title is required' }, 400)
  }

  const todo = await db
    .insert(todos)
    .values({
      title: data.title,
      description: data.description,
    })
    .returning()
    .execute()

  return c.json(todo[0], 201)
})

// Update a todo
app.patch('/auth/todo/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.json()
  const db = initializeDB(process.env.DATABASE_URL || '')

  if (data.title === '') {
    return c.json({ message: 'Title is required' }, 404)
  }

  const todo = await db
    .update(todos)
    .set({
      title: data.title,
      description: data.description,
    })
    .where(eq(todos.id, id))
    .returning()
    .execute()

  if (todo.length === 0) {
    return c.json({ message: 'Todo not found' }, 404)
  }

  return c.json(todo[0])
})

// Delete a todo
app.delete('/auth/todo/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const db = initializeDB(process.env.DATABASE_URL || '')

  if (!id) {
    return c.json({ message: 'Invalid ID' }, 400)
  }

  const singleTodo = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id))
    .execute()

  if (singleTodo.length === 0) {
    return c.json({ message: 'Todo not found' }, 404)
  }

  await db.delete(todos).where(eq(todos.id, singleTodo[0].id)).execute()

  return c.json({ message: 'Todo has been deleted' })
})

console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
