import React, { useEffect, useRef, useState } from 'react'
import './singletodo.css'
import { Todo } from '../model'
import { DeleteIcon, DoneIcon, EditIcon } from '../assets/icons'
import { Draggable } from '@hello-pangea/dnd'

interface Props {
   todo: Todo,
   todos: Todo[],
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
   index: number
}

const SingleTodo:React.FC<Props> = ({todo, todos, setTodos, index}:Props) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const [edit,setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  useEffect(() => {
    inputRef.current?.focus()
  },[edit])


  const handleDone = (id:number) => {
     setTodos(todos.map(todo => {
          if(todo.id == id){
             todo.isDone = !todo.isDone
          }
          return todo
     }))
  }

  const handleDelete = (id:number) => {
     setTodos(todos.filter(todo => todo.id !== id))
  }


  const handleEdit  = (event:React.FormEvent, id:number) => {
    event.preventDefault()
    setTodos(todos.map((todo) => todo.id == id ? {...todo,todo:editTodo} : todo))
    setEdit(false)
  }


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
         (provided) => (
          <form 
            className='singleTodo-card' 
            onSubmit={(e) => {handleEdit(e,todo.id)}}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
          {
            todo.isDone ? 
            <p className="singleTodo-card__text" style={{textDecoration: 'line-through'}}>{todo?.todo}</p>
              :
              edit ?
              <input 
              type="text" 
              name="editedText" 
              id="edit"
              value={editTodo}
              className='singleTodo-card__input'
              onChange={(e) => {
                setEditTodo(e.target.value)
              }} 
              ref={inputRef}
            />
              :
            <p className="singleTodo-card__text">{todo?.todo}</p>

          }
          <div className="singleTodo-card__buttons">
            <button type='button' className='singleTodo-card__button' onClick={() => {
              if(!edit && !todo.isDone){
                setEdit(!edit)
              }
            }}>
              <img src={EditIcon} alt="edit" />
            </button>
            <button type='button' className='singleTodo-card__button' onClick={() => {handleDelete(todo.id)}}>
              <img src={DeleteIcon} alt="delete" />
            </button>
            <button type='button' className='singleTodo-card__button' onClick={() => {handleDone(todo.id)}}>
              <img src={DoneIcon} alt="done" />
            </button>
          </div>
        </form>
         )
      }
    </Draggable>

  )
}

export default SingleTodo