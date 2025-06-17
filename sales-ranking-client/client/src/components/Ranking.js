import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import Confetti from './Confetti';

export default function Ranking({ year, month, trigger }) {
  const [data, setData] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetch(`/api/ranking?year=${year}&month=${month}`)
      .then(res => res.json())
      .then(rows => {
        if (rows[0] && rows[0].idFun !== (winner && winner.idFun)) {
          setWinner(rows[0]);
        }
        setData(rows);
      });
  }, [year, month, trigger, winner]);

  return (
    <div className="ranking">
      {winner && <Confetti key={winner.idFun} />}
      {data.map((u, idx) => (
        <Motion.div
          key={u.idFun}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`item rank-${idx + 1}`}
        >
          <span className="pos">{idx + 1}</span>
          <img src={u.foto} alt={u.nome} />
          <div className="info">
            <strong>{u.nome}</strong>
            <small>R$ {u.total_vendas.toFixed(2)}</small>
          </div>
        </Motion.div>
      ))}
    </div>
  );
}