import React, { useState } from "react";
import "./../App.css";
import "../Components/Navbar"
import NavBar from "../Components/Navbar";
import { ArmorTable } from "../Components/Armor/ArmorTable";
import Axios from "axios";
import Modal from './../Modal/Modal';


export default function Armors(){

    const [armorName, setArmorName] = useState('');
    const [armorDescription, setArmorDescription] = useState('');
    const [armorDEF, setArmorDEF] = useState('');
    const [armorKBR, setArmorKBR] = useState('');
    const [armorSB, setArmorSB] = useState('');
    const [armorWeight, setArmorWeight] = useState('');
    const [armorLCK, setArmorLCK] = useState('');
    const [show, setShow] = useState(false);

    const submitArmor = () => {
        Axios.post("http://localhost:3001/api/insert/armor", {
          armorName: armorName,
          armorDescription: armorDescription,
          armorDEF: armorDEF,
          armorKBR: armorKBR,
          armorSB: armorSB,
          armorWeight: armorWeight,
          armorLCK: armorLCK,
        });   
    }

    return (
    <div className="App">
        <NavBar/>
        <h1>Armors</h1>
        <div>
        <button onClick={() =>setShow(true) } className="newbutton" >Create a new armor</button>
        <div>

        </div>
        <Modal title="New Armor" onClose={() => setShow (false)} show={show}>
          <p> 
          <div className = "form">         
          <label>Armor Name</label>
          <input 
            type="text" 
            name="armorName" 
            onChange={(e)=> 
              {setArmorName (e.target.value);
          }}
          />
          <label> Description:</label>
          <input 
            type="text" 
            name="Description"
            onChange={(e)=> 
              {setArmorDescription (e.target.value)
            }}
          /> 
          <label> Defence:</label>
          <input 
            type="text" 
            name="Defence"
            onChange={(e)=> 
              {setArmorDEF (e.target.value)
            }}
          /> 
          <label> Knock Back Resistance:</label>
          <input 
            type="text" 
            name="KBR"
            onChange={(e)=> 
              {setArmorKBR (e.target.value)
            }}
          /> 
          <label> Special Boost:</label>
          <input 
            type="text" 
            name="Special Boost"
            onChange={(e)=> 
              {setArmorSB (e.target.value)
            }}
          /> 
          <label> Weight:</label>
          <input 
            type="text" 
            name="Weight"
            onChange={(e)=> 
              {setArmorWeight (e.target.value)
            }}
          /> 
          <label> Loot rarety:</label>
          <input 
            type="text" 
            name="Loot rarety"
            onChange={(e)=> 
              {setArmorLCK (e.target.value)
            }}
          /> 
          <button onClick={submitArmor}>Submit</button>
          </div>

          </p>
         </Modal>

         </div>
        <ArmorTable></ArmorTable>    
    </div>    
    )
}