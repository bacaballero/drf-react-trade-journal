import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function TradeTable() {
  const [trades, setTrades] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/trades/')
    .then(response => response.json())
    .then(data => setTrades(data))
  }, [])

  console.log(trades)

  return (
    <>
    <Table bordered hover variant='dark'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Quantity</th>
          <th>Symbol</th>
        </tr>
      </thead>
      <tbody>
        {trades.map(trade =>
          <tr key={trade.url}>
            <td>{trade.date}</td>
            <td>{trade.quantity}</td>
            <td>{trade.symbol}</td>
          </tr>)}
      </tbody>
    </Table>
    </>
    );
}

export default TradeTable;

