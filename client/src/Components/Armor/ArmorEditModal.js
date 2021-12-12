import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import Axios from "axios";

export default function ArmorEditModal({idArmor, armorName, armorDescription }) { 

    const [show, setShow] = useState(false);
    const [newArmorName, setNewArmorName] = useState ("");
    const [newArmorDescription, setNewArmorDescription] = useState ("");

    const updateArmor = (armor) =>{
        Axios.put("http://localhost:3001/api/update/armor", {
          armorName: newArmorName,
          armorDescription: newArmorDescription, 
        });
      setNewArmorName("")
      setNewArmorDescription("")      
      };

    const deleteArmor = (armor) =>{
        Axios.delete(`http://localhost:3001/api/delete/armor${armor}`);
      };
    
    return  (
        <div>
            <Modal title="Edit Armor" onClose={() => setShow (false)} show={show}>
                <p>
                <div> 
                <h1>ID: {idArmor} </h1>
                <h1>Description: {armorName}</h1>
                <h1>Description: {armorDescription}</h1>        
                <button onClick={()=> {updateArmor(armorName,armorDescription)}}> Update</button>
                </div>
                </p>
            </Modal>
            <hr/>
        </div>
            )
    }