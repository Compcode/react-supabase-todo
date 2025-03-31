import React, { useState } from 'react'

export default function TodoList({todoList, onToggle, onEdit, onDelete}) {
    const [editId, setEditId] = useState(null)

  return (
    <>
        {todoList.length > 0 && <h2>Todo List Items</h2>}
        {todoList.map(todo => (
            <li key={todo.id}>
                <input type='checkbox' checked={todo.isCompleted} onChange={() => onToggle(todo.id, todo.isCompleted)}/> {' '}
                {editId === todo.id ? (<>
                    <input type='text' value={todo.title} onChange={(e) => onEdit(todo.id, e.target.value)}/> {' '}
                    <button onClick={() => setEditId(null)}>Save</button>
                    </>
                ) : (
                    <>
                        {todo.isCompleted ? <del>{todo.title}</del> : todo.title} {' '}
                        <button onClick={() => setEditId(todo.id)}>Edit</button>
                    </>
                )} {' '}
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </li>
        ))}
    </>
  )
}
