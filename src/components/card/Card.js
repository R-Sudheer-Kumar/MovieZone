import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Link } from 'react-router-dom';
import './Card.css';
import "react-loading-skeleton/dist/skeleton.css";;


function Card({movie}) {

    const [isLoading , setIsLoading] = useState(true);

    useEffect( () => {
        setTimeout( () => {
            setIsLoading(false);
        },1500)
    },[])

  return (
    <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme baseColor="#202020" highlightColor="#444" >
                <Skeleton height={300} duration={2}  />
            </SkeletonTheme>

        </div>
        :
        <Link to={"/movie/"+ movie.id } style={ { textDecoration:"none" , color:"white" } }>
            <div className="cards">
                <img src={"https://image.tmdb.org/t/p/original"+ (movie.poster_path ? movie.poster_path : movie.backdrop_path) }  alt={movie.original_title} className="card_img" />
                <div className="card_overlay">
                    <div className="card_title"> { movie ? movie.original_title : "" } </div>
                    <div className="card_runtime">
                        {movie ? movie.release_date : ""}
                        <span className="card_rating">
                            {movie ? movie.vote_average : "" } {" "}
                            <i className='fas fa-star'/> 
                        </span> 
                    </div>
                    <div className="card_description"> {movie ? movie.overview.slice(0,100)+"........" : "" } </div>                                       
                </div>
            </div>
        </Link>
        }
    </>
  )
}

export default Card;