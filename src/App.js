import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7101b39a'
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm ] = useState('');
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data, 'data')
        setMovies(data.Search)
    }
    
    useEffect(() => {
        searchMovies('Spiderman')

    }, []) // empty array which is a dependency only if we want to call this effect at the start

    return (
        <div className="app" >
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt='searchIcon'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length > 0
                    ? (

                        <div className="container">
                            {
                                movies.map((movie, index) => (
                                    <MovieCard movie={movie} key={index} />
                                ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>
                                No movies found
                            </h2>

                        </div>

                    )}


        </div>
    );
};

export default App;
