import { useState } from 'react'
import React from 'react'
import { useTable } from 'react-table'
import { AnomaliesData } from '../Data'
import './Anomalies.css'

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1)
}

function Anomalies() {
  const [data, setData] = useState(AnomaliesData)

  const renderRowData = () => {
    return data.map(({ symbol, exchange, newOrderRequest, newOrderAck, trade }) => {
      return <tr className='tableRow' key={symbol} >
      <td className='box'>{symbol}</td>
      <td className='box'>{exchange}</td>
      <td className='state' style={newOrderRequest == "oui" ? {} : {backgroundColor:"#E95F5F"}}></td>
      <td className='state' style={newOrderAck == "oui" ? {} : {backgroundColor:"#E95F5F"}}></td>
      <td className='state' style={trade == "oui" ? {} : {backgroundColor:"#E95F5F"}}></td>
      <td className='result'> {newOrderRequest == "non" || "newOrderAck" == "non" || "trade" == "non" ? (
                        <div className='faultyOp'> Faulty </div>
                    ) : (
                        <div className='successfulOp'> Successful </div>
                    )} </td>
    </tr>
    })
  }

  const renderTable = () => {
    return (
      <table className='table'>
        <tr> 
            <th></th>
            <th></th>
            <th className="tableheader"> New Order Request </th>
            <th className="tableheader"> New Order Ack </th> 
            <th className="tableheader"> Trade </th> 
        </tr>
        <tbody className='tableBody'>
          {renderRowData()}
        </tbody>
      </table>
    )
  }

  return (
    <div className='container' style={{ margin: '50px' }}>
      <h1>Transaction Table</h1>
      {renderTable()}
    </div>
  );
}

export default Anomalies