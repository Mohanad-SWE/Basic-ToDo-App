import { useState } from 'react'
import { Task } from '../type/types'
import { Trash2, Edit2, Check, X, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

export function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.title)

  const handleEdit = () => {
    onEdit(task.id, editedText)
    setIsEditing(false)
  }

  return (
    <div className="flex  flex-col bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-2 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center space-x-2   ">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="h-5 w-5"
        />
        {isEditing ? (
          <Input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-grow"
          />
        ) : (
          <p
            className={`flex-grow max-w-[250px] break-words  ${
              task.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-800 dark:text-gray-200'
            }`}
          >
            {task.title} {/* Updated from task.text */}
          </p>
        )}
        {isEditing ? (
          <>
            <Button size="icon" variant="ghost" onClick={handleEdit}>
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="h-3 w-3 mr-1" />
        {format(new Date(task.createdAt), "MMM d, yyyy 'at' h:mm a")}
      </div>
    </div>
  )
}
