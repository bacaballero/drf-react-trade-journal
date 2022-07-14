import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuthState } from "../Context";

function TradeTable() {
  const [trades, setTrades] = useState([]);
  const userDetails = useAuthState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/trades/")
      .then((response) => response.json())
      .then((data) => setTrades(data));
  }, []);

  console.log(trades);

  return (
    <Container>
      <p>{userDetails.userDetails.username}</p>
      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.url}>
              <td>{trade.date}</td>
              <td>{trade.quantity}</td>
              <td>{trade.symbol}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TradeTable;
