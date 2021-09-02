import React, { Component } from 'react';
import Movie from '../Movie/movie';
import "./movies.css";
class Movies extends Component {
    state = {  }
    render() { 
       return (<div className="movies">
        {this.props.movies.map( (movieObj)=>{
          return <Movie key ={movieObj.id} movie={movieObj} favMovieObj={this.props.favMovieObj} setFavMovie={this.props.setFavMovie}></Movie>
        })}
    </div>);
    }
}
 
export default Movies;