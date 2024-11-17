
import React from 'react'
import './todolist.css'
import SingleTodo from './SingleTodo'
import { Droppable } from '@hello-pangea/dnd'
import { Action, State } from '../App'

interface Props {
  dispatch:React.Dispatch<Action>,
  state: State
}

const TodoList:React.FC<Props> = ({ dispatch,state}:Props) => {


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
                        state.activeTodos.map((todo,index) => (<SingleTodo index = {index} key={todo.id} todo = {todo}  state = {state} dispatch = {dispatch}/>))
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
                        state.completedTodos.map((completedTodo,index) => (<SingleTodo index = {index} key={completedTodo.id} todo = {completedTodo}  state = {state} dispatch = {dispatch}/>))
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
