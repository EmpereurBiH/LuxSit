import React, { useState } from "react";
import "./../App.css";
import "../Components/Navbar"
import NavBar from "../Components/Navbar";
import { WeaponTable } from "../Components/Weapon/WeaponTable";
import Axios from "axios";
import Modal from './../Modal/Modal';


export default function Weapons(){

    const [weaponName, setweaponName] = useState('');
    const [weaponDescription, setweaponDescription] = useState('');
    const [weaponDMG, setweaponDMG] = useState('');
    const [weaponKB, setweaponKB] = useState('');
    const [weaponAS, setweaponAS] = useState('');
    const [weaponSB, setweaponSB] = useState('');
    const [weaponWeight, setweaponWeight] = useState('');
    const [weaponLCK, setweaponLCK] = useState('');
    const [show, setShow] = useState(false);

    const submitweapon = () => {
        Axios.post("https://luxsit.herokuapp.com/api/insert/weapon", {
          weaponName: weaponName,
          weaponDescription: weaponDescription,
          weaponDMG: weaponDMG,
          weaponKB: weaponKB,
          weaponAS: weaponAS,
          weaponSB: weaponSB,
          weaponWeight: weaponWeight,
          weaponLCK: weaponLCK,
        });   
    }

    return (
    <div className="App">
        <NavBar/>
        <h1>Weapons</h1>
        <div>
        <button onClick={() =>setShow(true) } className="newbutton" >Create a new weapon</button>
        <div>

        </div>
        <Modal title="New weapon" onClose={() => setShow (false)} show={show}>
          <p> 
          <div className = "form">         
          <label>Name</label>
          <input 
            type="text" 
            name="WeaponName" 
            onChange={(e)=> 
              {setweaponName (e.target.value);
          }}
          />
          <label> Description:</label>
          <input 
            type="text" 
            name="Description"
            onChange={(e)=> 
              {setweaponDescription (e.target.value)
            }}
          /> 
          <label> Damage:</label>
          <input 
            type="text" 
            name="weapon DMG"
            onChange={(e)=> 
              {setweaponDMG (e.target.value)
            }}
          /> 
          <label> KB:</label>
          <input 
            type="text" 
            name="weapon KB"
            onChange={(e)=> 
              {setweaponKB (e.target.value)
            }}
          /> 
          <label> Attack Speed(AS):</label>
          <input 
            type="text" 
            name="weapon AS"
            onChange={(e)=> 
              {setweaponAS (e.target.value)
            }}
          /> 

          <label> Speed Bonus (SB):</label>
          <input 
            type="text" 
            name="weapon SB"
            onChange={(e)=> 
              {setweaponSB (e.target.value)
            }}
          /> 

          <label> Weight:</label>
          <input 
            type="text" 
            name="weapon Weight"
            onChange={(e)=> 
              {setweaponWeight (e.target.value)
            }}
          /> 

          <label> Loot rarety (LCK):</label>
          <input 
            type="text" 
            name="weapon LCK"
            onChange={(e)=> 
              {setweaponLCK (e.target.value)
            }}
          /> 
          <button onClick={submitweapon}>Submit</button>
          </div>

          </p>
         </Modal>

         </div>
        <WeaponTable></WeaponTable>    
    </div>    
    )
}