import React, { Component } from 'react';
import "./moviepage.css"
import axios from "axios";
import { API_KEY } from '../../API/secret';
import YouTube from "react-youtube";

class MoviePage extends Component {
    state = { 
        videoObject:{},
     }

    async componentDidMount(){
        // console.log(this.props.location.state.id);
        // https://api.themoviedb.org/3/movie/570/videos?api_key=422765915ce879dd7fefab2f8636123c&language=en-US

        let response=await axios.get(`https://api.themoviedb.org/3/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);
         
         let videoObj=response.data.results.filter((videoObj)=>{
              if(videoObj.type=="Trailer"&&videoObj.site=="YouTube"){
                  return true;
              }
              return false;
         });

         this.setState({
             videoObject:videoObj[0],
         })
    }
    render() { 
        const opts = {
            height:"100%",
            width:"100%",
            playerVars: {
              autoplay: 1,
            },
          };
        let {title,tagline,vote_average,poster_path,overview}=this.props.location.state;
        // let data=this.props.location.state;
        // console.log(data);
        return ( 
            <div className="movie-page">
                <div className="movie-page-cover-poster">
                    <img src={poster_path} alt="" />
                </div>
                <div className="movie-page-details">
                    <div className="movie-title-info">
                        <h1>{title}{" "}{vote_average } IMDB</h1>
                        <span>{tagline}</span>
                        <p>{overview}</p>
                    </div>
                    <div className="movie-tralier-video">
                    <YouTube videoId={this.state.videoObject.key} opts={opts}></YouTube>
                </div>
                </div>  
            </div>
        );
    }
}
 
export default MoviePage;


// return (
//     <div className="movie-page">
//       <div className="movie-page-poster">
//         <img src={poster_path} alt="" />
//       </div>
//       <div className="movie-page-details">
//         <div className="movie-title-info">
//           <h1>
//             {title} <br></br> {vote_average} IMDB
//           </h1>
//           <span>{tagline}</span>
//           <p>{overview}</p>
//         </div>
//         <div className="movie-trailer">
//           <YouTube videoId={this.state.videoObject.key} opts={opts}></YouTube>
//         </div>
//       </div>
//     </div>
//   );
// .movie-page{
//     height: calc(100vh - 50px);
//     position: relative;
// }

// .movie-page-poster{
//     height: 100%;
//     width: 100%;
// }

// .movie-page-poster img{
//     height:100%;
//     width: 100%;
//     object-fit: cover;
//     opacity: 0.4;
// }

// .movie-page-details{
//     position: absolute;
//     top: 0px;
//     color: white;
//     padding: 40px;
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     width:100%;
// }

// .movie-trailer{
//     height: 65%;
// }

// .movie-trailer div{
//     height: 100%;
// }