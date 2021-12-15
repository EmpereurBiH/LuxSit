import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import './../../Css/detailscomponent.css';

export default function EnemyDetailsComponent({ enemyID, enemyName, enemyDescription, enemyHP, enemyDEF, enemyAgility, enemyAttack,  enemyMagic, enemyType }) { 

  const [editEnemyID, setEditenemyID] = useState(null);
  const history = useHistory();
  const [finished, setFinished] = useState(false);
  const [editFormData, setEditFormData] = useState({
      enemyID: "",
      enemyName: "",
      enemyDescription: "",
      enemyHP: "",
      enemyDEF: "",
      enemyAgility: "",
      enemyType: "",
      enemyImage: "",
      enemyMagic: "",
      enemyAttack: "",
  });

useEffect(() => {
  setEditFormData ({ enemyID, enemyName, enemyDescription, enemyHP, enemyDEF, enemyAgility, enemyAttack, enemyMagic, enemyHP, enemyType })
}, []);

  const deleteEnemy = (enemyID) =>{
    Axios.delete(`https://luxsit.herokuapp.com/api/deleteenemy/${enemyID}`);
  }; 

  const updateEnemy = (enemyID) =>{
    Axios.put(`https://luxsit.herokuapp.com/api/update/enemy/${enemyID}`, {
      enemyName: editFormData.enemyName,
      enemyDescription: editFormData.enemyDescription,
      enemyHP: editFormData.enemyHP,
      enemyDEF: editFormData.enemyDEF,
      enemyAgility: editFormData.enemyAgility,
      enemyMagic: editFormData.enemyMagic,
      enemyAttack: editFormData.enemyAttack,
      enemyType: editFormData.enemyType,
    }); 
  }; 

  const handleEditFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;

      setEditFormData(newFormData);
    };

    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedContact = {
        id: editEnemyID,
        enemyName: editFormData.enemyName,
        enemyDescription: editFormData.enemyDescription,
        enemyHP: editFormData.enemyHP,
        enemyDEF: editFormData.enemyDEF,
        enemyAgility: editFormData.enemyAgility,
        enemyMagic: editFormData.enemyMagic,
        enemyAttack: editFormData.enemyAttack,
        enemyType: editFormData.enemyType,
      };
    };
  
    return  (
        <div>
          <h1>Enemy ID: {enemyID} </h1>
         <div>
           <form onSubmit={handleEditFormSubmit}>
             <div class="form-group">
              <label>
              Name:
              </label>
              <input 
              type="text" 
              name="enemyName"
              value={editFormData.enemyName}
              placeholder = "Enter a name..."
              onChange={handleEditFormChange} 
              />
              </div>
              <div class="form-group">
              <label>
              Description:
              </label>
              <input 
              type="text" 
              name="enemyDescription"
              value={editFormData.enemyDescription}
              placeholder = "Enter a description..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Health point:
              </label>
              <input 
              type="text" 
              name="enemyHP"
              value={editFormData.enemyHP}
              placeholder = "Enter HP..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Defence:
              </label>
              <input 
              type="text" 
              name="enemyDEF"
              value={editFormData.enemyDEF}
              placeholder = "Enter an Defence value..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Agility:
              </label>
              <input 
              type="text" 
              name="enemyAgility"
              value={editFormData.enemyAgility}
              placeholder = "Enter an Agility value..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Attack:
              </label>
              <input 
              type="text" 
              name="enemyAttack"
              value={editFormData.enemyAttack}
              placeholder = "Enter attack value..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Magic:
              </label>
              <input 
              type="text" 
              name="enemyMagic"
              value={editFormData.enemyMagic}
              placeholder = "Enter a Magic Value..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Type:
              </label>
              <input 
              type="text" 
              name="enemyType"
              value={editFormData.enemyType}
              placeholder = "Enter Type..."
              onChange={handleEditFormChange}
              />
              </div>
              </form>   
            <hr/>
          </div>
        <button onClick={()=> {updateEnemy (enemyID)}}> Save</button>
        <button onClick={() => {deleteEnemy(enemyID)}} >Delete</button>
        </div>
            )
    }