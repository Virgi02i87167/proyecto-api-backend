import React, { useEffect, useState } from 'react'
import { Pagination } from './Pagination'

export const MoviesList = () => {

    const [movies, setMovies] = useState([])

    const totalMovies = movies.length
    const [moviesPerPage, setMoviesPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)

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
                    <div className='card-product'>
                        <figure className="container-img">
                            <img src={movie.url} alt={movie.title} />
                            {/* <iframe width="560" height="315" src={movie.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/> */}
                        </figure>
                        <div className="infro product">
                            <h3>{movie.title}</h3>
                            <p>{movie.protagonista}</p>
                            <p>{movie.categoria}</p>
                            <a href={movie.url} target="_blank"><button>Ver Pelicula</button></a>
                        </div>
                    </div>
                ))}
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
