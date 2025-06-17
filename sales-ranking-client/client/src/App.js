import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Ranking from './components/Ranking';

const socket = io();

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    socket.on('saleConfirmed', () => setTrigger(t => t + 1));
    return () => socket.off('saleConfirmed');
  }, []);

  return (
    <div className="container">
      <h1 className="main-title">Ranking de Vendas</h1>
      <div className="controls">
        <div className="select-wrapper">
          <select value={year} onChange={e => setYear(Number(e.target.value))}>
            {[2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="select-wrapper">
          <select value={month} onChange={e => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
      <Ranking year={year} month={month} trigger={trigger} />
    </div>
  );
}