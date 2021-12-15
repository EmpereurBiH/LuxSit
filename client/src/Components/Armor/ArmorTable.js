import React, { useState, useMemo, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { useTable } from "react-table";
import armorColumns from "./ArmorColumns";
import './../../Css/table.css';
import Axios from "axios";
import ArmorDetailsModal from "./ArmorDetailsComponent";

 export const ArmorTable = () => {
    const columns = useMemo(() => armorColumns, []);
    const [data, setArmorData] = useState ([]);
    const [error, setError] = React.useState(null);
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const [newArmorName, setNewArmorName] = useState ('');
    const [newArmorDescription, setNewArmorDescription] = useState('');
    const [idarmor, setIdarmor] = useState (data);
    const history = useHistory();
    
    const handleClose = () => setShow(false);

    function handleClick (idarmor) {
      history.push({
        pathname:'/ArmorDetails',
        search: "?" + new URLSearchParams ({idarmor}).toString(),
        state: {
          idarmor: idarmor
        },
      });
    }

    const updateArmor = (armor) =>{
        Axios.put("https://luxsit.herokuapp.com/api/update/armor", {
          armorName: newArmorName,
          armorDescription: newArmorDescription, 
        });
      setNewArmorName("")
      setNewArmorDescription("")      
      };

    const deleteArmor = (armor) =>{
        Axios.delete(`https://luxsit.herokuapp.com/api/delete/armor${armor}`);
      };

    useEffect(() =>{
      Axios.get ("https://luxsit.herokuapp.com/api/get/armors").then((response) => {
        setArmorData(response.data);})
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
                  handleClick(row.original.idarmor)
                  console.log(row.original.idarmor)
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

 export default ArmorTable;
