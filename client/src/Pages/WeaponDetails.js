import React, { useState, useEffect } from "react";
import "./../App.css";
import "../Components/Navbar"
import NavBar from "../Components/Navbar";
import { weaponTable } from "../Components/Weapon/WeaponTable";
import Axios from "axios";
import Modal from './../Modal/Modal';
import { useLocation } from "react-router";
import axios from "axios";
import WeaponDetailsComponent from "../Components/Weapon/WeaponDetailsComponent";

const baseUrl = "https://luxsit.herokuapp.com/api/get/weapondetails/"

export default function Weapons(){

    const [weaponName, setweaponName] = useState('');
    const [weaponDescription, setweaponDescription] = useState('');
    const [show, setShow] = useState(false);
    const [weapondetails, setweaponDetailsData] = useState ([]);
    const [errorweapondetails, setErrorweaponDetails] = React.useState(null);
    const location = useLocation();
    const [weaponID, setweaponID] = useState('');
    
    useEffect(() => {
           console.log(location.pathname);
           console.log(location.search);
           console.log(location.state.idweapon);
           setweaponID(location.state.idweapon);
        }, [location]); 
        
    useEffect(() => {
            console.log ('Use Effect Ran');
            Axios.get(`https://luxsit.herokuapp.com/api/get/weapondetails/`, {
            params: {
                idweapon: location.state.idweapon
            },
            }
            )
            .then((response) => {
                console.log(response.data);
                setweaponDetailsData(response.data);})
            .catch (errorweapondetails => {setErrorweaponDetails(errorweapondetails)});
      }, []);

    return (
        <div className="App">
            <NavBar/>
            <div className = 'details'>   
            {
            weapondetails.map((val)=> {
            return (
            <WeaponDetailsComponent 
            weaponID = {val.idweapon}
            weaponName = {val.weaponName} 
            weaponDescription = {val.weaponDescription} 
            weaponDMG = {val.weaponDMG}
            weaponKB = {val.weaponKB}
            weaponAS = {val.weaponAS}
            weaponSB = {val.weaponSB}
            weaponWeight = {val.weaponWeight}
            weaponLCK = {val.weaponLCK}
            />
            );
          })}  
             </div> 
        </div>    
        )
    }
