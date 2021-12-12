import React from "react";
import NavBar from "../Components/Navbar";
import "./../App.css";
import BannerImage from "../Assets/DungeonElevatorIntroCutscene.png";
import axios from "axios";

export default function Main(){

    const getjoke = () => {
    axios.get ("https://official-joke-api.appspot.com/random.joke").then(
        (response) => {
        console.log(response)
        }
     );  
    };

    return (
        <div className="App">
            <div className="headerContainer" 
            style={{ backgroundImage: `url(${BannerImage})` }}
            >
            <NavBar/>
            <h1>Main</h1>
        </div> 
        </div>      
        )
}