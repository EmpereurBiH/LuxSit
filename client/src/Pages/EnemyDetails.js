import React, { useState, useEffect } from "react";
import "./../App.css";
import "../Components/Navbar"
import NavBar from "../Components/Navbar";
import { EnemyTable } from "../Components/Enemy/EnemyTable";
import Axios from "axios";
import Modal from './../Modal/Modal';
import { useLocation } from "react-router";
import axios from "axios";
import EnemyDetailsComponent from "../Components/Enemy/EnemyDetailsComponent";

const baseUrl = "https://luxsit.herokuapp.com/api/get/enemydetails/"

export default function Enemies(){

    const [enemyName, setEnemyName] = useState('');
    const [enemyDescription, setEnemyDescription] = useState('');
    const [show, setShow] = useState(false);
    const [enemydetails, setenemyDetailsData] = useState ([]);
    const [errorenemydetails, setErrorenemyDetails] = React.useState(null);
    const location = useLocation();
    const [enemyID, setenemyID] = useState('');
    
    useEffect(() => {
           console.log(location.pathname);
           console.log(location.search);
           console.log(location.state.idenemy);
           setenemyID(location.state.idenemy);
        }, [location]); 
        
    useEffect(() => {
            console.log ('Use Effect Ran');
            Axios.get(`https://luxsit.herokuapp.com/api/get/enemydetails/`, {
            params: {
                idenemy: location.state.idenemy
            },
            }
            )
            .then((response) => {
                console.log(response.data);
                setenemyDetailsData(response.data);})
            .catch (errorenemydetails => {setErrorenemyDetails(errorenemydetails)});
      }, []);

    return (
        <div className="App">
            <NavBar/>
            <div className = 'details'>   
            {
            enemydetails.map((val)=> {
            return (
            <EnemyDetailsComponent 
            enemyID = {val.idenemy}
            enemyName = {val.enemyName} 
            enemyDescription = {val.enemyDescription} 
            enemyHP = {val.enemyHP}
            enemyDEF = {val.enemyDEF}
            enemyAgility = {val.enemyAgility}
            enemyAttack = {val.enemyAttack}
            enemyMagic = {val.enemyMagic}
            enemyType = {val.enemyType}
            />
            );
          })}  
             </div> 
        </div>    
        )
    }
