import PropTypes from 'prop-types'
import React from 'react'

export default function MoviesList({movieList, onChange, onDelete}) {
  return (
    <>
        {movieList.length > 0 && <h2>Movies List</h2>}
        <ul>
            {movieList.map(movie => (
                <li key={movie.id}>
                    {movie.isWatched ? <del>{movie.name}</del> : movie.name}
                     - <button onClick={() => onChange(movie.id, movie.isWatched)}>{movie.isWatched ? 'Watched' : 'Not Watched'}</button>
                    {' '}
                    <button onClick={() => onDelete(movie.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </>
  )
}

MoviesList.propTypes = {
    movieList: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    onDelete: PropTypes.func
}
