import React, { useEffect, useState } from 'react';
import { Pagination } from './Pagination';

export const MoviesList = () => {
    const [movies, setMovies] = useState([]);

    const totalMovies = movies.length;
    const [moviesPerPage, setMoviesPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    const firstIndex = (currentPage - 1) * moviesPerPage;
    const lastIndex = currentPage * moviesPerPage;

    const moviesList = async () => {
        const response = await fetch('http://localhost:4000/movies');
        const data = await response.json();
        setMovies(data);
    };

    useEffect(() => {
        moviesList();
    }, []);

    return (
        <>
            <div className='container-products'>
                {movies.slice(firstIndex, lastIndex).map(movie => (
                    <div className='card-product' key={movie.id}>
                        <figure className="container-img">
                            <img src={movie.imagen} alt={movie.title} />
                        </figure>
                        <div className="info-product">
                            <h3>{movie.title}</h3>
                            <p>{movie.protagonista}</p>
                            <p>{movie.categoria}</p>
                            <a href={movie.url} target="_blank" rel="noopener noreferrer"><button>Ver Pelicula</button></a>
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
    );
};
