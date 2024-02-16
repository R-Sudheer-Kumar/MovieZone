import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import { useParams } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
    const [movieList , setMovieList] = useState([]);
    const {type} = useParams();

    const getData = (type) =>
    {
       const max_date = new Date().toJSON();   
       if(type === "popular")
       {
        type='popularity';
       }
       else if(type === 'top_rated')
       {
        type = 'vote_average';
       }
       else
       {
        type = "release_date";
       }
        // fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&include_adult=false&with_original_language=te&sort_by=${type ? type : "popularity"}.desc&release_date.lte=${max_date}`)
        // fetch("https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&include_adult=false&with_original_language=te&sort_by=release_date.asc&primary_release_date.gte=2020-01-01&primary_release_date.lte=2023-10-20")
        .then( (res) => res.json())
        .then( (data) => setMovieList(data.results))
    }

    useEffect( () => {
        getData(type);
    },[type]);

  return (
    <div className="movie_list">
        <h2 className="list_title">{ ( type ? type:"POPULAR").toUpperCase() }</h2>
        <div className="list_cards">
            { 
                movieList.map((movie) => {
                    return <Card movie={movie}  key={movie.id}/>
                })
                
            }
        </div>
    </div>
  )
}

export default MovieList;