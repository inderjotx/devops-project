import React from 'react';


// can also destructre the props to avoid writing props
// even in the parameter { movie1 }
const MovieCard = (props) => {
    return (
        <div className='movie'>
            <div>
                <p>{props.Movie.Year}</p>
            </div>
            <div>
                <img src={props.Movie.Poster !=='N/A' ? props.Movie.Poster : "https://source.unsplash.com/random/400x400" } alt={props.Movie.Title}></img>
            </div>

            <div>
                <span>{props.Movie.Type}</span>
                <h3>{props.Movie.Title}</h3>
            </div>
      </div>
    );
}






export default MovieCard;
