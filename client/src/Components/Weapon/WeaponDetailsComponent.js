import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import './../../Css/detailscomponent.css';

export default function WeaponDetailsComponent({ weaponID, weaponName, weaponDescription, weaponDMG, weaponKB, weaponAS, weaponSB,  weaponWeight, weaponLCK }) { 

  const [editweaponID, setEditweaponID] = useState(null);
  const history = useHistory();
  const [finished, setFinished] = useState(false);
  const [editFormData, setEditFormData] = useState({
      weaponID: "",
      weaponName: "",
      weaponDescription: "",
      weaponDMG: "",
      weaponKB: "",
      weaponAS: "",
      weaponSB: "",
      weaponWeight: "",
      weaponLCK: "",
  });

useEffect(() => {
  setEditFormData ({ weaponID, weaponName, weaponDescription, weaponDMG, weaponKB, weaponAS, weaponSB, weaponWeight, weaponLCK })
}, []);

  const deleteweapon = (weaponID) =>{
    Axios.delete(`http://localhost:3001/api/deleteweapon/${weaponID}`);
  }; 

  const updateweapon = (weaponID) =>{
    Axios.put(`http://localhost:3001/api/update/weapon/${weaponID}`, {
      weaponName: editFormData.weaponName,
      weaponDescription: editFormData.weaponDescription,
      weaponDMG: editFormData.weaponDMG,
      weaponKB: editFormData.weaponKB,
      weaponAS: editFormData.weaponAS,
      weaponSB: editFormData.weaponSB,
      weaponWeight: editFormData.weaponWeight,
      weaponLCK: editFormData.weaponLCK,
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
        id: editweaponID,
        weaponName: editFormData.weaponName,
        weaponDescription: editFormData.weaponDescription,
        weaponDMG: editFormData.weaponDMG,
        weaponKB: editFormData.weaponKB,
        weaponAS: editFormData.weaponAS,
        weaponSB: editFormData.weaponSB,
        weaponWeight: editFormData.weaponWeight,
        weaponLCK: editFormData.weaponLCK,
      };
    };
  
    return  (
        <div>
          <h1>weapon ID: {weaponID} </h1>
         <div>
           <form onSubmit={handleEditFormSubmit}>
             <div class="form-group">
              <label>
              Name:
              </label>
              <input 
              type="text" 
              name="weaponName"
              value={editFormData.weaponName}
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
              name="weaponDescription"
              value={editFormData.weaponDescription}
              placeholder = "Enter a description..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              DMG:
              </label>
              <input 
              type="text" 
              name="weaponDMG"
              value={editFormData.weaponDMG}
              placeholder = "Enter DMG..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              KB:
              </label>
              <input 
              type="text" 
              name="weaponKB"
              value={editFormData.weaponKB}
              placeholder = "Enter KB..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              AS:
              </label>
              <input 
              type="text" 
              name="weaponAS"
              value={editFormData.weaponAS}
              placeholder = "Enter AS..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              SB:
              </label>
              <input 
              type="text" 
              name="weaponSB"
              value={editFormData.weaponSB}
              placeholder = "Enter SB..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              Weight:
              </label>
              <input 
              type="text" 
              name="weaponWeight"
              value={editFormData.weaponWeight}
              placeholder = "Enter Weight..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              LCK:
              </label>
              <input 
              type="text" 
              name="weaponLCK"
              value={editFormData.weaponLCK}
              placeholder = "Enter LCK..."
              onChange={handleEditFormChange}
              />
              </div>
              </form>   
            <hr/>
          </div>
        <button onClick={()=> {updateweapon (weaponID)}}> Save</button>
        <button onClick={() => {deleteweapon(weaponID)}} >Delete</button>
        </div>
            )
    }