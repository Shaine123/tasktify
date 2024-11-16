
import React, { useRef } from 'react'
import './inputField.css'

interface Props {
   todo:string,
   setTodo: React.Dispatch<React.SetStateAction<string>>,
   handleAdd:() => void
}
const InputField = ({todo,setTodo,handleAdd}: Props) => {

  let inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
     event.preventDefault()
     handleAdd()
     inputRef.current?.blur()
  }

  return (
     <form className='input-form' onSubmit={handleSubmit} >
        <input 
          type="text" 
          name="" 
          id=""
          className='input-form__box'
          placeholder='Enter New Task'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          ref={inputRef}
         />
         <button type='submit' className='input-form__submit'>Go</button>
     </form>
  )
}

export default InputField
