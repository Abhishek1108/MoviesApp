import React, { Component } from 'react';
import { API_KEY, API_URL2, IMAGE_URL } from '../../API/secret';
import {Link} from "react-router-dom";
import axios from 'axios';
import "./movie.css"

class Movie extends Component {
    state = { 
        detailMovieInfo:{},
     };

   async componentDidMount(){
        //https://api.themoviedb.org/3/movie/550?api_key=422765915ce879dd7fefab2f8636123c
       // https://api.themoviedb.org/3/search/movie/299536?api_key=422765915ce879dd7fefab2f8636123c
//   console.log(`//https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=${API_KEY}`);
       let response=await axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=${API_KEY}`);
       let detailMovieInfo=response.data;
       let posterPath=IMAGE_URL+detailMovieInfo.poster_path;
       this.setState({
           detailMovieInfo:{...detailMovieInfo,poster_path:posterPath}
       })

    }
   
    render() { 
        let {poster_path,title,vote_average}=this.props.movie;
        let posterPath=IMAGE_URL+poster_path;
        return (<div className="movie-item">
            <div className="movie-poster">
                <div className="fav-movie" onClick={()=>{this.props.setFavMovie(this.props.movie.id)}}>
                {
                 this.props.favMovieObj.indexOf(this.props.movie.id)==-1?<i className="fas fa-heart"></i>:<i className="fas fa-heart red"></i>


                }
                </div>
            <Link to={{pathname:"/moviepage",state:this.state.detailMovieInfo}}>
            <img src={posterPath} alt="" />
            </Link>
                
            </div>
            <div className="movie-info">
               <div className="movie-title">{title}</div>
               <div className="movie-rating">{vote_average} IMDB</div>
            </div>
        </div>);
    }
}
 
export default Movie;