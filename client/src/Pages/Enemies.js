import React, { useState } from "react";
import "./../App.css";
import "../Components/Navbar"
import NavBar from "../Components/Navbar";
import { EnemyTable } from "../Components/Enemy/EnemyTable";
import Axios from "axios";
import Modal from './../Modal/Modal';


export default function Enemies(){

    const [enemyName, setEnemyName] = useState('');
    const [enemyDescription, setEnemyDescription] = useState('');
    const [enemyHP, setEnemyHP] = useState('');
    const [enemyDEF, setEnemyDEF] = useState('');
    const [enemyAgility, setEnemyAgility] = useState('');
    const [enemyAttack, setEnemyAttack] = useState('');
    const [enemyMagic, setEnemyMagic] = useState('');
    const [enemyType, setEnemyType] = useState('');
    const [show, setShow] = useState(false);

    const submitEnemy = () => {
        Axios.post("http://localhost:3001/api/insert/Enemy", {
          enemyName: enemyName,
          enemyDescription: enemyDescription,
          enemyHP: enemyHP,
          enemyDEF: enemyDEF,
          enemyAgility: enemyAgility,
          enemyAttack: enemyAttack,
          enemyMagic: enemyMagic,
          enemyType: enemyType,
        });   
    }

    return (
    <div className="App">
        <NavBar/>
        <h1>Enemies</h1>
        <div>
        <button onClick={() =>setShow(true) } className="newbutton" >Create a new Enemy</button>
        <div>

        </div>
        <Modal title="New Enemy" onClose={() => setShow (false)} show={show}>
          <p> 
          <div className = "form">         
          <label>Enemy Name</label>
          <input 
            type="text" 
            name="EnemyName" 
            onChange={(e)=> 
              {setEnemyName (e.target.value);
          }}
          />
          <label> Description:</label>
          <input 
            type="text" 
            name="Description"
            onChange={(e)=> 
              {setEnemyDescription (e.target.value)
            }}
          /> 
          <label> Health Points:</label>
          <input 
            type="text" 
            name="Enemy HP"
            onChange={(e)=> 
              {setEnemyHP (e.target.value)
            }}
          /> 
          <label> Defence:</label>
          <input 
            type="text" 
            name="Enemy Defence"
            onChange={(e)=> 
              {setEnemyDEF (e.target.value)
            }}
          /> 
          <label> Agility:</label>
          <input 
            type="text" 
            name="Enemy Agility"
            onChange={(e)=> 
              {setEnemyAgility (e.target.value)
            }}
          /> 

          <label> Attack:</label>
          <input 
            type="text" 
            name="Enemy Attack"
            onChange={(e)=> 
              {setEnemyAttack (e.target.value)
            }}
          /> 

          <label> Magic:</label>
          <input 
            type="text" 
            name="Enemy Magic"
            onChange={(e)=> 
              {setEnemyMagic (e.target.value)
            }}
          /> 

          <label> Type:</label>
          <input 
            type="text" 
            name="Enemy Type"
            onChange={(e)=> 
              {setEnemyType (e.target.value)
            }}
          /> 
          <button onClick={submitEnemy}>Submit</button>
          </div>

          </p>
         </Modal>

         </div>
        <EnemyTable></EnemyTable>    
    </div>    
    )
}