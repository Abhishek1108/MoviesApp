import React, { Component } from 'react';
import Header from './Components/Header/header';
import Movies from './Components/Movies/movies';
import axios from "axios";
import { API_KEY, API_URL } from './API/secret';
import Pagination from './Components/Pagination/pagination';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import MoviePage from './Components/MoviePage/moviepage';
import Favourite from './Components/Favourite/favourite';
// import {API_URL,API_KEY} from './API/secret.js'


class App extends Component {
  state = {
    moviesData:[],
    currentMovie:"avengers",
      pages:[],
      currentPage:"1",
      favMovieObj:[],
    };

    
     async componentDidMount(){

   let data= await  axios.get(API_URL,{params:{api_key:API_KEY,page:1,query:this.state.currentMovie}
    
    });

    let allMovies=data.data.results;
    let totalPages=data.data.total_pages;
    let pagesArr=[];
    for(let i=1;i<=totalPages;i++){
       pagesArr[i-1]=i;
    }
  
    this.setState({
      moviesData:allMovies,
      pages:pagesArr,
    })
      
    }

    setMovies=async (newSearchedMovie)=>{
      let data= await  axios.get(API_URL,{params:{api_key:API_KEY,page:1,query:newSearchedMovie}
    
      });
  
      let allMovies=data.data.results;
     let totalPages=data.data.total_pages;
    let pagesArr=[];
    for(let i=1;i<=totalPages;i++){
       pagesArr[i-1]=i;
    }
      this.setState({
        moviesData:allMovies,
        currentMovie:newSearchedMovie,
        pages:pagesArr,
      })
    }
    previousPage= async()=>{
      let data= await  axios.get(API_URL,{params:{api_key:API_KEY,page:this.state.currentPage-1,query:this.state.currentMovie}
    
      });
   
      let allMovies=data.data.results;
      this.setState({
        moviesData:allMovies,
        currentPage:this.state.currentPage-1,
      })

    }
    setPage=async (pageCount)=>{
      
   let data= await  axios.get(API_URL,{params:{api_key:API_KEY,page:pageCount,query:this.state.currentMovie}
    
   });

   let allMovies=data.data.results;
   this.setState({
     moviesData:allMovies,
     currentPage:pageCount
   })

    }
    nextPage=async ()=>{
      let data= await  axios.get(API_URL,{params:{api_key:API_KEY,page:this.state.currentPage+1,query:this.state.currentMovie}
    
      });
   
      let allMovies=data.data.results;
      this.setState({
        moviesData:allMovies,
        currentPage:this.state.currentPage+1,
      })

    }
    setFavMovie=(id)=>{
      
      let updatedFavMovieObj=[];
      for(let i=0;i<this.state.favMovieObj.length;i++){
        updatedFavMovieObj[i]=this.state.favMovieObj[i];
      }
      updatedFavMovieObj.push(id);
      this.setState({
        favMovieObj:updatedFavMovieObj,
      })
    
    }
  render() { 
    return (
      <Router>
    <div className="App">
      <Header setMovies={this.setMovies} favMovieObj={this.state.favMovieObj}></Header>
      <Switch>
        <Route path="/" exact>
        {this.state.moviesData.length?<React.Fragment>
        <Movies movies={this.state.moviesData} favMovieObj={this.state.favMovieObj} setFavMovie={this.setFavMovie}> </Movies>
      <Pagination page={this.state.pages} currentPage={this.state.currentPage}
      previousPage={this.previousPage}
      setPage={this.setPage}
      nextPage={this.nextPage}
      ></Pagination>
        </React.Fragment>:<h1 >OOPS no movie found</h1>};
        </Route>
        <Route path="/fav" exact component={Favourite}>
          
        </Route>
        <Route path="/moviepage"  exact component={MoviePage}>
      
        </Route>
      </Switch>
      
      
    </div>
    </Router>
    );
  }
}
 

export default App;
