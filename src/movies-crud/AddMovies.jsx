import PropTypes from 'prop-types'

export default function AddMovies({title, onChange, onAdd, ref}) {
  return (
    <div>
        <label>Add Movie to List:</label> {' '}
        <input type='text' ref={ref} value={title} onChange={onChange} placeholder="Enter movie name" />
        <button onClick={onAdd} disabled={title.trim() === ''}>Add</button>
    </div>
  )
}

AddMovies.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    ref: PropTypes.object
}
