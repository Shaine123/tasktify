
import React, { useRef } from 'react'
import './inputField.css'
import { Action, State } from '../App'

interface Props {
   dispatch:React.Dispatch<Action>,
   state: State

}
const InputField = ({dispatch,state}: Props) => {

  let inputRef = useRef<HTMLInputElement>(null)

 

  return (
     <form 
        className='input-form' 
        onSubmit={(event) => {
            event.preventDefault()
            dispatch({type:'add', value: {id: Date.now(), todo: '', isDone: false, isEditing: false},values: []})
            }} >
        <input 
          type="text" 
          name="" 
          id=""
          className='input-form__box'
          placeholder='Enter New Task'
          value={state.todo.todo}
          onChange={(e) => dispatch({type: 'input', value: {id: Date.now(), todo:  e.target.value, isDone: false , isEditing: false},values: []})}
          ref={inputRef}
         />
         <button type='submit' className='input-form__submit'>Go</button>
     </form>
  )
}

export default InputField
