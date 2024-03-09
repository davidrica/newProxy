const express = require('express');
const axios = require('axios');
const { dbConnection } = require('./database/config');
const cors =require("cors");
const Sesiones = require('./models/Sesiones');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3001;



dbConnection()
app.use(cors())
//parse read
app.use(express.json())

// Middleware para permitir solicitudes de cualquier origen (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Ruta de proxy
app.get('/proxy', async (req, res) => {
    const url  =process.env.VITE_API_VPN ;
   console.log(url)
    try {
        const response = await axios.get(url);
        console.log(response.data)
        let sesion = new Sesiones(response.data)

        await sesion.save()

        res.status(201).json({
            ok:true,
            sesion:sesion
        })    
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).send('Error al realizar la solicitud al servidor remoto.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy en funcionamiento en http://localhost:${PORT}`);
});
