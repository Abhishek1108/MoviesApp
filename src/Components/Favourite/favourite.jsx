import React, { Component } from 'react';
import Movie from '../Movie/movie';
import axios from 'axios';
import { API_KEY, IMAGE_URL } from '../../API/secret';
import "./favourite.css"

class Favourite extends Component {
    state = { 
        favMovieData:[],
     }


     async componentDidMount(){
         let arr=[];
         let allFavMovie=this.props.location.state;
         for(let i=0;i<allFavMovie.length;i++){
            let response=await axios.get(`https://api.themoviedb.org/3/movie/${allFavMovie[i]}?api_key=${API_KEY}&language=en-US`);
           arr.push(response.data);
            this.setState({
              favMovieData:arr,
            })
         }
        // console.log(this.props.location.state.id);
        // https://api.themoviedb.org/3/movie/570/videos?api_key=422765915ce879dd7fefab2f8636123c&language=en-US
        // https://api.themoviedb.org/3/find/456?api_key=422765915ce879dd7fefab2f8636123c&language=en-US&external_source=imdb_id
        // https://api.themoviedb.org/3/movie/299534?api_key=422765915ce879dd7fefab2f8636123c&language=en-US    
    }
    render() { 
  
        return (
            <div className="favourite-movie-Page">
                {this.state.favMovieData.map((movieObj)=>{
                  let {poster_path,title,vote_average}=movieObj;
                  return(<div className="fav-movie-item">
                  <div className="fav-movie-poster">
                  <img src={IMAGE_URL+poster_path} alt="" /> 
                  </div>
                  <div className="fav-movie-info">
                     <div className="fav-movie-title">{title}</div>
                     <div className="fav-movie-rating">{vote_average} IMDB</div>
                  </div>
              </div>)
                })
                }
            </div>
         );
    }
}
 
export default Favourite;