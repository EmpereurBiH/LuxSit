import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import './../../Css/detailscomponent.css';

export default function ArmorDetailsComponent({ armorID, armorName, armorDescription, armorDEF, armorKBR, armorSB, armorWeight, armorLCK }) { 

  const [editArmorID, setEditArmorID] = useState(null);
  const history = useHistory();
  const [finished, setFinished] = useState(false);
  const [editFormData, setEditFormData] = useState({
      armorID: "",
      armorName: "",
      armorDescription: "",
      armorDEF: "",
      armorKBR: "",
      armorSB: "",
      armorWeight: "",
      armorLCK: "",
  });

useEffect(() => {
  setEditFormData ({ armorID, armorName, armorDescription, armorDEF, armorKBR, armorSB, armorWeight, armorLCK })
}, []);

  const deleteArmor = (armorID) =>{
    Axios.delete(`https://luxsit.herokuapp.com/api/deleteArmor/${armorID}`);
  }; 

  const updateArmor = (armorID) =>{
    Axios.put(`https://luxsit.herokuapp.com//api/update/Armor/${armorID}`, {
      armorName: editFormData.armorName,
      armorDescription: editFormData.armorDescription,
      armorDEF: editFormData.armorDEF,
      armorKBR: editFormData.armorKBR,
      armorSB: editFormData.armorSB,
      armorWeight: editFormData.armorWeight,
      armorLCK: editFormData.armorLCK, 
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
        id: editArmorID,
        armorName: editFormData.armorName,
        armorDescription: editFormData.armorDescription,
        armorDEF: editFormData.armorDEF,
        armorKBR: editFormData.armorKBR,
        armorSB: editFormData.armorSB,
        armorWeight: editFormData.armorWeight,
        armorLCK: editFormData.armorLCK, 
      };
    };
  
    return  (
        <div>
          <h1>Armor ID: {armorID} </h1>
         <div>
           <form onSubmit={handleEditFormSubmit}>
              <div class="form-group">
              <label>
              Armor Name:
              </label>
              <input 
              type="text" 
              name="armorName"
              value={editFormData.armorName}
              placeholder = "Enter a name..."
              onChange={handleEditFormChange} 
              />
              </div>
              <div class="form-group">
              <label>
              Armor Description:
              </label>
              <input 
              type="text" 
              name="armorDescription"
              value={editFormData.armorDescription}
              placeholder = "Enter a description..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              DEF:
              </label>
              <input 
              type="text" 
              name="armorDEF"
              value={editFormData.armorDEF}
              placeholder = "Enter DEF..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              KBR:
              </label>
              <input 
              type="text" 
              name="armorKBR"
              value={editFormData.armorKBR}
              placeholder = "Enter KBR..."
              onChange={handleEditFormChange}
              />
              </div>
              <div class="form-group">
              <label>
              SB:
              </label>
              <input 
              type="text" 
              name="armorSB"
              value={editFormData.armorSB}
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
              name="armorWeight"
              value={editFormData.armorWeight}
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
              name="armorLCK"
              value={editFormData.armorLCK}
              placeholder = "Enter LCK..."
              onChange={handleEditFormChange}
              />
              </div>
              </form>   
            <hr/>
          </div>
        <button onClick={()=> {updateArmor (armorID)}}> Save</button>
        <button onClick={() => {deleteArmor(armorID)}} >Delete</button>
        </div>
            )
    }