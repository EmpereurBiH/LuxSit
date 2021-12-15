import React, { useMemo, useState, useEffect} from "react";
import "./../App.css";
import Axios from "axios";
import Modal from './../Modal/Modal';
import PlayerModal from '../Components/Player/PlayerModal.js';
import NavBar from "../Components/Navbar";
import PlayerTable from "../Components/Player/PlayerTable"

//"npm start" in terminal to start it

function App(){
  const [playerName, setPlayerName] = useState('');
  const [playerPassword, setPassword] = useState('');
  const [playerList, setPlayerList] = useState ([]);
  const [newPassword, setNewPassword] = useState ("");
  const [show, setShow] = useState(false);

  useEffect(() =>{
    Axios.get ("https://luxsit.herokuapp.com/api/get/players").then((response) => {
      setPlayerList(response.data)
    });
  },[]);

  const submitPlayer = () => {
    Axios.post("hhttps://luxsit.herokuapp.com/api/insert", {
      playerName: playerName,
      playerPassword: playerPassword,
    });
      
    setPlayerList([
      ...playerList,
      {
      playerName: playerName,
      playerPassword: playerPassword
      },
      ]);
  };

  const deletePlayer = (player) =>{
    Axios.delete(`https://luxsit.herokuapp.com/api/delete/${player}`);
  };

  const updatePlayer = (player) =>{
    Axios.put("https://luxsit.herokuapp.com/api/update", {
      playerName: player,
      playerPassword: newPassword, 
    });
  setNewPassword("")   
  };
  
  return (
    <div className="App">
      <NavBar/>        
      <h1>Players</h1>
      <div>
        <button onClick={() =>setShow(true) }>Create a new player</button>
        <Modal title="New Player" onClose={() => setShow (false)} show={show}>
          <p> 
          <div className = "form">         
          <label>Player Name</label>
          <input 
            type="text" 
            name="playerName" 
            onChange={(e)=> 
              {setPlayerName (e.target.value);
          }}
          />
          <label> Password:</label>
          <input 
            type="text" 
            name="password" 
            onChange={(e)=> 
              {setPassword (e.target.value)
            }}
          /> 
          <button onClick={submitPlayer}>Submit</button>
          </div>
          </p>
         </Modal> 
      </div>
          {playerList.map((val)=> {
            return (
            <PlayerModal 
            playerName = {val.playerName} 
            playerPassword = {val.playerPassword} 
            />
            );
          })}    
    </div>
  );
}

export default App;
