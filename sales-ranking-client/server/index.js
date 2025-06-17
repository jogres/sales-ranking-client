import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import db from './db.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.get('/api/ranking', async (req, res) => {
  const { year, month } = req.query;
  const [rows] = await db.query(
    `SELECT f.idFun, f.nome,  SUM(v.valor) AS total_vendas
       FROM venda v
       JOIN venda_fun vf ON v.id = vf.idVenda
       JOIN cad_fun f ON vf.idFun = f.idFun
      WHERE v.confirmada = 1
        AND YEAR(v.dataV) = ?
        AND MONTH(v.dataV) = ?
      GROUP BY f.idFun
      ORDER BY total_vendas DESC
      LIMIT 10;`,
    [year, month]
  );
  res.json(rows);
});

app.post('/api/confirm-sale', async (req, res) => {
  const { saleId } = req.body;
  await db.query('UPDATE venda SET confirmada = 1 WHERE id = ?', [saleId]);
  io.emit('saleConfirmed', { saleId });
  res.sendStatus(200);
});

io.on('connection', () => console.log('Client connected'));
server.listen(4000, () => console.log('Server running on port 4000'));