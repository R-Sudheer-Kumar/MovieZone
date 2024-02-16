import React, { useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './Home.css';
import MovieList from '../../components/movieList/MovieList';


function Home() {

    const [popularMovies , setPopularMovies] = useState([]);
    const [lang ,setLang] = useState("te");

    useEffect( () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&include_adult=false&include_video=false&with_original_language=${lang}&page=1&sort_by=release_date.desc&release_date.lte=2023-10-10`)
        // fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&with_original_language=te")
        .then( (res) => res.json())
        .then( (data) => setPopularMovies(data.results)) 
        
    },[])

    return (

        <>
            <div className="poster">
                <Carousel
                    showThumbs = {false}
                    autoPlay={true}
                    transitionTime={1500}
                    interval={4000}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map( (movie) => {
                            
                            return(
                                <Link style={ {textDecoration:"none" , color:"white"} } to= {"/movie/"+ movie.id}  key={movie.id}>
                                    <div className="posterImage">
                                        <img src={"https://image.tmdb.org/t/p/original"+  (movie.backdrop_path ? movie.backdrop_path : movie.poster_path) } alt="" />
                                    </div>
                                    <div className="posterImage_overlay">
                                        <div className="posterImage_title"> { movie ? movie.original_title : "" } </div>
                                        <div className="posterImage_runtime">
                                            {movie ? movie.release_date : ""}
                                            <span className="posterImage_rating">
                                                {movie ? movie.vote_average : "" } {" "}
                                                <i className='fas fa-star'/> 
                                            </span> 
                                        </div>

                                        <div className="posterImage_description"> {movie ? movie.overview : "" } </div>                                       
                                    </div>
                                </Link>
                       
                            )
                        })
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

export default Home;