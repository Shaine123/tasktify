import {  useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todo } from './model'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'

const App:React.FC =  () => {

  const [todo,setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = () => {

    if(todo){
      setTodos([...todos,{id: Date.now(), todo:todo, isDone: false}])
      setTodo("")
    }
  }

  const onDragEnd = (result:DropResult) => {

    const {source , destination } = result

    if (!destination) return;

    if(source.droppableId === destination.droppableId && source.index === destination.index) return;

    let add , active = todos, complete = completedTodos
    
    if(source.droppableId === 'ActiveList') {
      add = active[source.index]
      active.splice(source.index, 1)
    }else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }


    if(destination.droppableId === 'ActiveList') {
      active.splice(destination.index, 0, add)
    }else {
      complete.splice(destination.index, 0, add)
    }
    setCompletedTodos(complete)
    setTodos(active)
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='app-container'>
            <span className='heading'>Tasktify</span>
            <InputField todo = {todo} setTodo = {setTodo} handleAdd = {handleAdd}/>
            <TodoList todos={todos} setTodos={setTodos} completedTodos = {completedTodos} setCompletedTodos = {setCompletedTodos} />
        </div>
    </DragDropContext>

  )
}

export default App
