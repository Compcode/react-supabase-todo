import React from 'react'
import PropTypes from 'prop-types'

export default function AddTodo({title, onChange, onSubmit, ref}) {
  return (
    <form onSubmit={onSubmit}>
        <label>Add Task to do</label>
        <input ref={ref} type='text' placeholder='Add Task' value={title} onChange={onChange}/>
        <button type="submit" disabled={title.trim() === ''}>Add</button>
    </form>
  )
}

AddTodo.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ref : PropTypes.object
}