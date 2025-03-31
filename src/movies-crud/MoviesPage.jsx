import { useEffect, useRef, useState } from "react";
import AddMovies from "./AddMovies";
import MoviesList from "./MoviesList";
import supabase from "./supabaseClient";

export default function MoviesPage() {
    const [movies, setMovies] = useState([])
    const [movieName, setMovieName] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        fetchMovieList()
        inputRef.current.focus()
    }, [])

    async function addMovie() {
        const newMovie = {
            name : movieName,
            isWatched : false
        }
        const {data, error} = await supabase.from('MoviesList').insert(newMovie).select()
        if(error) {
            console.log('Error adding movie:', error.message)
        }
        else {
            setMovies([...movies, ...data])
            setMovieName('')
            inputRef.current.focus()
        }
    }

    async function fetchMovieList() {
        const {data, error} = await supabase.from('MoviesList').select('*')
        if(error) {
            console.log('Error fetching movies:', error.message)
        }
        else {
            setMovies(data)
        }
    }

    async function toggleMovieState(id, isWatched) {
        const {error} = await supabase.from('MoviesList').update({isWatched: !isWatched}).eq('id', id)
        if(error) {
            console.log('Error updating movie:', error.message)
        }
        else {
            setMovies(movies.map(movie => movie.id === id ? {...movie, isWatched : !isWatched} : movie))
        }
    }


    async function deleteMovie(id) {
        const {error} = await supabase.from('MoviesList').delete().eq('id', id)
        if(error) {
            console.log('Error deleting movie:', error.message)
        }
        else {
            setMovies(movies.filter(movie => movie.id !== id))
        }
    }

  return (
    <>
        <AddMovies title={movieName} onChange={(e) => setMovieName(e.target.value)} onAdd={addMovie} ref={inputRef}/>
        <MoviesList movieList={movies} onChange={toggleMovieState} onDelete={deleteMovie} />
    </>
  )
}
