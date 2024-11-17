import {  useReducer } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todo } from './model'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'


export interface State {
  todo: Todo,
  activeTodos: Todo[],
  completedTodos: Todo[],
  isEdit?: boolean,
}

export interface Action {
  type: 'add' | 'remove' | 'edit' | 'done' | 'input' | 'editInput' | 'activeTodos' | 'completedTodos',
  value: Todo,
  values: Todo[]
}



const App:React.FC =  () => {

  


  const reducer = (state:State,action:Action) => {

    const {type,value, values} = action
   
    switch(type){
    case 'add': {
      return {...state,activeTodos:[...state.activeTodos,{...value,todo:state.todo.todo}]}
    }
    case 'remove' : {
       return {...state, activeTodos:[...state.activeTodos.filter((obj) => obj.id !== value.id)]}
    }
    case 'edit' : {
      let updated = state.activeTodos.map((obj) => {
        if(obj.id === value.id){
           return {...obj, todo: state.todo.todo, isEditing: false}
        }
        return obj
      })
      return {...state, activeTodos:[...updated], isEdit: false}
    }
    case 'editInput' : {
       return {...state, activeTodos: [...state.activeTodos.map((obj) => {
         if(obj.id === value.id ){
            return {...obj, isEditing: value.isEditing}
         }
          return obj
       })]}
    }
    case 'done' : { 
      // return {...state, activeTodos: [...state.activeTodos.map((obj) => {
      //   if(obj.id === value.id ){
      //      return {...obj, isDone: value.isDone}
      //   }
      //    return obj
      // })]}

      if(value.isDone){
        const updated = state.activeTodos.filter((obj) => obj.id === value.id)

        return {...state, completedTodos: [...updated.map((obj) => {
           if(obj.id === value.id){
              return {...obj, isDone: true}
           }
  
            return obj
        })] , activeTodos: [...state.activeTodos.filter((obj) => obj.id !== value.id)]}
      }else {
        const updated = state.completedTodos.filter((obj) => obj.id === value.id)

        return {...state, activeTodos: [...updated.map((obj) => {
           if(obj.id === value.id){
              return {...obj, isDone: false}
           }
  
            return obj
        })] , completedTodos: [...state.activeTodos.filter((obj) => obj.id !== value.id)]}
      }

     
    }
    case 'input' : {
       return {...state, todo:value}
    }
    case 'activeTodos' : {
       return {...state,activeTodos: values }
    }
    case 'completedTodos' : {
      return {...state, completedTodos: values}
    }
      default:
       return state
    }
 
  }


  const [state,dispatch] = useReducer(reducer,{
    todo: {
       id: 0,
       todo: '',
       isDone: false,
       isEditing: false
    },
    activeTodos: [],
    completedTodos: []
  })



  const onDragEnd = (result:DropResult) => {

    const {source , destination } = result

    console.log(result)

    if (!destination) return;

    if(source.droppableId === destination.droppableId && source.index === destination.index) return;

    let add , active = state.activeTodos, complete = state.completedTodos
    
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
    // setCompletedTodos(complete)
    // setTodos(active)

    dispatch({type: 'activeTodos', value: {id: 0, todo: '', isDone: false, isEditing: false},values: active})
    dispatch({type: 'completedTodos', value: {id: 0, todo: '', isDone: false, isEditing: false},values: complete})
  }

  // console.log(state)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='app-container'>
            <span className='heading'>Tasktify</span>
            <InputField 
               dispatch = {dispatch}
               state = {state}
             />
            <TodoList 
               dispatch = {dispatch}
               state = {state}
           />
        </div>
    </DragDropContext>

  )
}

export default App
