import React, { useState, useMemo, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { useTable } from "react-table";
import WeaponColumns from "./WeaponColumns";
import './../../Css/table.css';
import Axios from "axios";
import weaponDetailsModal from "./WeaponDetailsComponent";

 export const WeaponTable = () => {
    const columns = useMemo(() => WeaponColumns, []);
    const [data, setweaponData] = useState ([]);
    const [error, setError] = React.useState(null);
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const [newweaponName, setNewweaponName] = useState ('');
    const [newweaponDescription, setNewweaponDescription] = useState('');
    const [idweapon, setidweapon] = useState (data);
    const history = useHistory();
    
    const handleClose = () => setShow(false);

    function handleClick (idweapon) {
      history.push({
        pathname:'/WeaponDetails',
        search: "?" + new URLSearchParams ({idweapon}).toString(),
        state: {
          idweapon: idweapon
        },
      });
    }

    const updateweapon = (Weapon) =>{
        Axios.put("https://luxsit.herokuapp.com/api/update/Weapon", {
          weaponName: newweaponName,
          weaponDescription: newweaponDescription, 
        });
      setNewweaponName("")
      setNewweaponDescription("")      
      };

    const deleteweapon = (Weapon) =>{
        Axios.delete(`https://luxsit.herokuapp.com/api/delete/Weapon${Weapon}`);
      };

    useEffect(() =>{
      Axios.get ("https://luxsit.herokuapp.com/api/get/weapons").then((response) => {
        setweaponData(response.data);})
    .catch (error => {setError(error)});
    }, []);

    useEffect (() => {
      console.log(setSelectedRow);
    },[JSON.stringify(setSelectedRow)]);

    const tableInstance = useTable({
      columns,
      data
    })

    const { 
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows, 
      prepareRow,
    } = tableInstance

    if (error) return `Error: ${error.message}`;

    return (
      <div>
      <table {...getTableProps()}>
          <thead>
              {
              headerGroups.map(headerGroup => ( 
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                    headerGroup.headers.map(column => (
                      <th 
                        {...column.getHeaderProps()}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} onClick={() => {
                  handleClick(row.original.idweapon)
                  console.log(row.original.idweapon)
                  }}>
                  {
                    row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
              </tr>               
              )
            })}
          </tbody>
      </table>
</div>     
)}

 export default WeaponTable;
