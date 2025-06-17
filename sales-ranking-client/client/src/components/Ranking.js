import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';
import { motion as Motion } from 'framer-motion';

export default function Ranking({ year, month, trigger }) {
  const [data, setData] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerName, setBannerName] = useState('');

  useEffect(() => {
    fetch(`/api/ranking?year=${year}&month=${month}`)
      .then(res => res.json())
      .then(rows => {
        if (rows[0] && rows[0].nome !== bannerName) {
          setBannerName(rows[0].nome);
          setShowBanner(true);
          setTimeout(() => setShowBanner(false), 5000);
        }
        setData(rows);
      });
  }, [year, month, trigger, bannerName]);

  const [first, second, third] = data;

  return (
    <>
      {showBanner && (
        <Motion.div
          className="banner"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          <img src={first?.foto} alt={bannerName} className="banner-img" />
          <div className="banner-text">👑 {bannerName} chegou ao Top 1! 👑</div>
        </Motion.div>
      )}
      <aside className="sidebar">
        <h2>Top 10</h2>
        <ol className="leaderboard">
          {data.map((u, idx) => (
            <li key={u.idFun} className={`rank-item rank-${idx+1}`}>
              <span className="rank">{idx + 1}</span>
              <img src={u.foto} alt={u.nome} />
              <span className="name-text">{u.nome}</span>
            </li>
          ))}
        </ol>
      </aside>
      <main className="podium-area">
        <h1 className="podium-title">Campeões do Mês</h1>
        <div className="podium">
          <div className="podium-item second">
            <div className="number-bottom">2</div>
            <img src={second?.foto} alt={second?.nome} />
            <div className="name">{second?.nome}</div>
          </div>
          <div className="podium-item first">
            {first?.nome && <Confetti key={first.idFun} />}
            <div className="crown">👑</div>
            <img src={first?.foto} alt={first?.nome} />
            <div className="name">{first?.nome}</div>
            <div className="number-bottom">1</div>
          </div>
          <div className="podium-item third">
            <div className="number-bottom">3</div>
            <img src={third?.foto} alt={third?.nome} />
            <div className="name">{third?.nome}</div>
          </div>
        </div>
      </main>
    </>
  );
}