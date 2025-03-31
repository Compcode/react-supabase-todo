import { useEffect, useRef, useState } from "react";
import AddTodo from "./AddTodo";
import supabase from "./supabaseClient";
import TodoList from "./TodoList";

export default function Dashboard() {
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')
    const inputRef = useRef(null)
    
    useEffect(() => {
        fetchTodoList()
        inputRef.current.focus()
    }, [])

    async function addTodo() {
        const newTodo = {
            title : todoTitle,
            isCompleted: false
        }

        const { data, error} = await supabase.from('TodoList').insert([newTodo]).select()

        if(error) {
            console.log('Error inserting new todo', error);   
        }
        else {
            setTodos([...todos, ...data])
            setTodoTitle('')
            inputRef.current.focus()
        }
    }

    async function fetchTodoList() {
        const { data, error} = await supabase.from('TodoList').select('*')
        if(error) {
            console.log('Error fetching todo list', error);
        }
        else {
            setTodos(data)
        }
    }

    async function toggleTodoStatus(id, isCompleted) {
        const {error} = await supabase.from('TodoList').update({isCompleted: !isCompleted}).eq('id', id)
        if(error) {
            console.log('Error updating todo status', error);
        }
        else {
            setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted : !isCompleted} : todo))
        }
    }

    async function editTodo(id, newTodo) {
        const {error} = await supabase.from('TodoList').update({title: newTodo}).eq('id', id)
        if(error) {
            console.log('Error updating todo', error);
        }
        else {
            setTodos(todos.map(todo => todo.id === id ? {...todo, title: newTodo} : todo))
        }
    }

    async function deleteTodo(id) {
        const {error} = await supabase.from('TodoList').delete().eq('id', id)
        if(error) {
            console.log('Error deleting todo', error);
        }
        else {
            setTodos(todos.filter(todo => todo.id !== id))
        }
    }

  return (
    <div>
        <AddTodo ref={inputRef} title={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} onSubmit={(e) => {e.preventDefault(); addTodo()}}/>
        <TodoList todoList={todos} onToggle={toggleTodoStatus} onEdit={editTodo} onDelete={deleteTodo}/>
    </div>
  )
}
