import React, { useState, useEffect } from "react";
import "./../App.css";
import "../Components/Navbar"
import NavBar from "../Components/Navbar";
import { ArmorTable } from "../Components/Armor/ArmorTable";
import Axios from "axios";
import Modal from './../Modal/Modal';
import { useLocation } from "react-router";
import axios from "axios";
import ArmorDetailsComponent from "../Components/Armor/ArmorDetailsComponent";

const baseUrl = "https://luxsit.herokuapp.com/api/get/armordetails/"

export default function Armors(){

    const [armorName, setArmorName] = useState('');
    const [armorDescription, setArmorDescription] = useState('');
    const [show, setShow] = useState(false);
    const [armordetails, setArmorDetailsData] = useState ([]);
    const [errorarmordetails, setErrorArmorDetails] = React.useState(null);
    const location = useLocation();
    const [armorID, setArmorID] = useState('');
    
    useEffect(() => {
           console.log(location.pathname);
           console.log(location.search);
           console.log(location.state.idarmor);
           setArmorID(location.state.idarmor);
        }, [location]); 
        
    useEffect(() => {
            console.log ('Use Effect Ran');
            Axios.get(`https://luxsit.herokuapp.com/api/get/armordetails/`, {
            params: {
                idarmor: location.state.idarmor
            },
            }
            )
            .then((response) => {
                console.log(response.data);
                setArmorDetailsData(response.data);})
            .catch (errorarmordetails => {setErrorArmorDetails(errorarmordetails)});
      }, []);

    return (
        <div className="App">
            <NavBar/>
            <div className = 'details'>   
            {
            armordetails.map((val)=> {
            return (
            <ArmorDetailsComponent 
            armorID = {val.idarmor}
            armorName = {val.armorName} 
            armorDescription = {val.armorDescription} 
            armorDEF = {val.armorDEF}
            armorKBR = {val.armorKBR}
            armorSB = {val.armorSB}
            armorWeight = {val.armorWeight}
            armorLCK = {val.armorLCK}
            />
            );
          })}  
             </div> 
        </div>    
        )
    }
