import React, { useEffect, useState } from 'react'
import { Pagination } from './Pagination'

export const MoviesList = () => {

    const [movies, setMovies] = useState([])

    const totalMovies = movies.length
    const [moviesPerPage, setMoviesPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    const firsIndex = currentPage * moviesPerPage
    const lastIndex = lastIndex - moviesPerPage 

    const moviesList = async() => {
        const data = await fetch('http://localhost:5000/movies');
        const movies = await data.json();
        
        setMovies(movies)
    }

    useEffect(() => {
        moviesList()
    }, [])

    return (
        <>
            <div className='container-products'>
                {movies.map(movie => (
                    <div className='card-product' key={movie.id}>
                        <figure className="container-img" >
                            <img src={movie.imageUrl} alt={movie.title} />
                        </figure>
                        <div className="infro product">
                            <h3>{movie.title}</h3>
                            <p>{movie.protagonista}</p>
                            <p>{movie.categoria}</p>
                            <a href={movie.url} target="_blank"><button>Ver Pelicula</button></a>
                        </div>
                    </div>
                )).slice(firsIndex, lastIndex)}
            </div>
            <Pagination 
                moviesPerPage={moviesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalMovies={totalMovies}
            />
        </>
    )
}
