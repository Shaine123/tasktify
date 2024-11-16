
import React from 'react'
import './todolist.css'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'
import { Droppable } from '@hello-pangea/dnd'

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}:Props) => {


  return (
  <div className="tasks-container">
    <Droppable droppableId='ActiveList'>
      {
         (provided,snapshot) => (
          <div 
            className={`active-task ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            <h3>Active Task</h3>
              <div className='todos'>
                    {
                        todos.map((todo,index) => (<SingleTodo index = {index} key={todo.id} todo = {todo} todos = {todos} setTodos = {setTodos}/>))
                    }
              </div>
              {provided.placeholder}
          </div>
         )
      }
    </Droppable>
    <Droppable droppableId='CompletedList'>
      {
         (provided,snapshot) => (
            <div 
            className={`completed-task ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
               ref = {provided.innerRef} 
               {...provided.droppableProps}
              >
             <h3>Completed Task</h3>
             <div className='todos'>
                    {
                        completedTodos.map((completedTodo,index) => (<SingleTodo index = {index} key={completedTodo.id} todo = {completedTodo} todos = {completedTodos} setTodos = {setCompletedTodos}/>))
                    }
              </div>
              {provided.placeholder}
            </div>
         )
      }
    </Droppable>
      
  </div>
  
  )
}

export default TodoList
