import { TaskItem } from './TaskItem'
import { AnimatePresence, motion } from 'framer-motion'
import { Task } from '../type/types'

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

export function TaskList({ tasks, onDelete, onToggle, onEdit }: TaskListProps) {
  return (
    <AnimatePresence>
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <TaskItem
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
