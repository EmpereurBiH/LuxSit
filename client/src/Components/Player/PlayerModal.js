import React, { Component,useState, useEffect} from "react";
import Modal from "../../Modal/Modal";
import Axios from "axios";

export default function PlayerModal({ playerName, playerPassword }) { 

    const [show, setShow] = useState(false);
    const [newPassword, setNewPassword] = useState ("");

    const updatePlayer = (player) =>{
        Axios.put("https://luxsit.herokuapp.com/api/update", {
          playerName: player,
          playerPassword: newPassword, 
        });
      setNewPassword("")   
      };

    const deletePlayer = (player) =>{
        Axios.delete(`https://luxsit.herokuapp.com/api/delete/${player}`);
      };
    
    return  (
        <div>
            <h1>Player Name: {playerName} </h1>
            <h1>Player Password: {playerPassword}</h1>
            <button onClick={() => {deletePlayer(playerName)}}>Delete</button> ,
            <button onClick={() =>setShow(true) }>Update Password</button>
            <Modal title="Update password" onClose={() => setShow (false)} show={show}>
                <p>
                <div>     
                Enter new password: 
                <input type="text" id="updateInput" onChange={(e)=> {
                 setNewPassword(e.target.value)
                }} />
                <button onClick={()=> {updatePlayer(playerName)}}> Update</button>
                </div>
                </p>
            </Modal>
            <hr/>
        </div>
            )
    }