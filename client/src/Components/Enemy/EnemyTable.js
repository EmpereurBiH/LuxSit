import React, { useState, useMemo, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { useTable } from "react-table";
import EnemyColumns from "./EnemyColumns";
import './../../Css/table.css';
import Axios from "axios";
import EnemyDetailsModal from "./EnemyDetailsComponent";

 export const EnemyTable = () => {
    const columns = useMemo(() => EnemyColumns, []);
    const [data, setEnemyData] = useState ([]);
    const [error, setError] = React.useState(null);
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const [newEnemyName, setNewEnemyName] = useState ('');
    const [newEnemyDescription, setNewEnemyDescription] = useState('');
    const [idenemy, setidenemy] = useState (data);
    const history = useHistory();
    
    const handleClose = () => setShow(false);

    function handleClick (idenemy) {
      history.push({
        pathname:'/EnemyDetails',
        search: "?" + new URLSearchParams ({idenemy}).toString(),
        state: {
          idenemy: idenemy
        },
      });
    }

    const updateEnemy = (Enemy) =>{
        Axios.put("https://luxsit.herokuapp.com/api/update/Enemy", {
          EnemyName: newEnemyName,
          EnemyDescription: newEnemyDescription, 
        });
      setNewEnemyName("")
      setNewEnemyDescription("")      
      };

    const deleteEnemy = (Enemy) =>{
        Axios.delete(`https://luxsit.herokuapp.com/api/delete/Enemy${Enemy}`);
      };

    useEffect(() =>{
      Axios.get ("https://luxsit.herokuapp.com/api/get/enemies").then((response) => {
        setEnemyData(response.data);})
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
                  handleClick(row.original.idenemy)
                  console.log(row.original.idenemy)
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

 export default EnemyTable;
