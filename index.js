const express = require('express');
const axios = require('axios');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware para permitir solicitudes de cualquier origen (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Ruta de proxy
app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    res.status(500).send('Error al realizar la solicitud al servidor remoto.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy en funcionamiento en http://localhost:${PORT}`);
});
