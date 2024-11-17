import React, { useEffect, useRef, useState } from 'react'
import './singletodo.css'
import { Todo } from '../model'
import { DeleteIcon, DoneIcon, EditIcon } from '../assets/icons'
import { Draggable } from '@hello-pangea/dnd'
import { Action, State } from '../App'

interface Props {
   todo: Todo,
   index: number,
   dispatch:React.Dispatch<Action>,
   state: State
}

const SingleTodo:React.FC<Props> = ({todo,  index, state, dispatch}:Props) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const [edit,setEdit] = useState<boolean>(false)

  useEffect(() => {
    inputRef.current?.focus()
  },[edit])


  const handleDone = (id:number) => {
    //  setTodos(todos.map(todo => {
    //       if(todo.id == id){
    //          todo.isDone = !todo.isDone
    //       }
    //       return todo
    //  }))
    dispatch({type: 'done', value: {id: id, todo: '', isDone: !todo.isDone, isEditing: false},values: []})
  }

  const handleDelete = (id:number) => {
    //  setTodos(todos.filter(todo => todo.id !== id))
    dispatch({type: 'remove', value: {id: id, todo: '', isDone: false, isEditing: false},values: []})
  }


  const handleEdit  = (event:React.FormEvent, id:number) => {
    event.preventDefault()
    // setTodos(todos.map((todo) => todo.id == id ? {...todo,todo:editTodo} : todo))
    // setEdit(false)

    dispatch({type: 'edit', value: {id: id, todo: '', isDone: false, isEditing: false}, values: []})
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
              todo.isEditing ?
              <input 
              type="text" 
              name="editedText" 
              id="edit"
              value={state.todo.todo}
              className='singleTodo-card__input'
              onChange={(e) => {
                dispatch({type: 'input', value: {id: 0, todo: e.target.value, isDone: false, isEditing: false}, values: []})
              }} 
              ref={inputRef}
            />
              :
            <p className="singleTodo-card__text">{todo?.todo}</p>

          }
          <div className="singleTodo-card__buttons">
            <button type='button' className='singleTodo-card__button' onClick={() => {
              if(!state.isEdit && !todo.isDone){
                 dispatch({type: 'editInput', value: {id: todo.id, todo: '', isDone: false, isEditing: !todo.isEditing}, values: []})
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