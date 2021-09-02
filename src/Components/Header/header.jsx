import React, { Component } from 'react';
import "./header.css";
import {Link} from "react-router-dom"

class Header extends Component {
    state = {
        newMovieName:"",
      }


    handleOnChange=(e)=>{
        let value=e.target.value;
        this.setState({
            newMovieName:value,
        })

    }
    handleKeyPress=(e)=>{
        if(e.key=="Enter"){
            this.props.setMovies(this.state.newMovieName);
        }

    }
    render() { 
        return ( <div className="header">
            <div className="logo">
                <img src="logo.svg" alt="" />
            </div>
            <div className="header-tabs">

                <div className="header-tab">
                <Link to="/">Home</Link>
                </div>
                <div className="header-tab">
                <Link to={{pathname:"/fav",state:this.props.favMovieObj}}>Favourite </Link>
                </div>
                 
            </div>
            <div className="search-box">
                <input className="search-movie" value={this.state.newMovieName} type="text" placeholder="Search Movie" onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />
            </div>
            
            

        </div> );
    }
}
 
export default Header;