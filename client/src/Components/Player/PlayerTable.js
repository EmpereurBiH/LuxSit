import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table"
import { playerColumns } from "./PlayerColumns"
import './../../Css/table.css'
import Axios from "axios"

 export const PlayerTable = () => {

    const columns = useMemo(() => playerColumns, [])
    const [playerData, setPlayerData] = useState ([])
    const data = useMemo(() => playerData, [])

    useEffect(() =>{
      Axios.get ("https://luxsit.herokuapp.com/api/get").then(json => setPlayerData(json.data))
    }, [])

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

    return (
      <table {...getTableProps()}>
          <thead>
              {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                     <th {...column.getHeaderGroupProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return <td {...cell.getHeaderGroupProps()}>{cell.render('Cell')}</td>
                  })}
              </tr>               
              )
            })}
          </tbody>
      </table>
    )
 }

 export default PlayerTable;
