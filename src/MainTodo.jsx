import { useEffect, useRef, useState } from "react"
import supabase from "./supabase-client"

export default function MainTodo() {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const inputRef = useRef(null)

    useEffect(() => {
        fetchTodos()
        inputRef.current.focus()   
    }, [])

    const addTodo = async () => {
        const createNewTodo = {
            title : newTodo,
            isCompleted : false
        }

        const {data, error} = await supabase.from('TodoList').insert([createNewTodo]).select();

        if(error) {
            console.log('Error inserting new todo:', error.message)
        }
        else {
            setTodos([...todos, ...data])
            setNewTodo('')
            fetchTodos()
            inputRef.current.focus()

        }
    }

    const fetchTodos = async () => {
        const {data, error} = await supabase.from('TodoList').select('*');

        if(error) {
            console.log('Error fetching todos:', error.message)
        }
        else {
            setTodos(data)
        }
    }

    const toggleTodo = async (id, isCompleted) => {
        const { error} = await supabase.from('TodoList').update({isCompleted : !isCompleted}).eq('id', id)
        if(error) {
            console.log('Error updating todo:', error.message)
        }
        else {
            setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted : !isCompleted} : todo))
            fetchTodos()
        }
    }

    const deleteTodo = async (id) => {
        const {error} = await supabase.from('TodoList').delete().eq('id', id)
        if(error) {
            console.log('Error deleting todo:', error.message)
        }
        else {
            const newTodoList = todos.filter(todo => todo.id !== id)
            setTodos(newTodoList)
            fetchTodos()
        }
    }
  return (
    <>
        <h2>Todo List:</h2>
        <div>
            <input ref={inputRef} type="text" value={newTodo} placeholder="Add new todo" onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={addTodo} disabled={newTodo.trim() === ''}>Add Todo</button>
        </div>
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.title} - <button onClick={() => toggleTodo(todo.id)}>{todo.isCompleted ? 'Completed' : 'Not Complete'}</button>
                    {' '}
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </>
  )
}
