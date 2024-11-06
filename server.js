

import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

const RegistroSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
});

const Registro = mongoose.model('Registro', RegistroSchema);

// Consultar todos los registros
app.get('/registros', async (req, res) => {
    const registros = await Registro.find();
    res.json(registros);
});

// Consultar registro individual
app.get('/registros/:id', async (req, res) => {
    const registro = await Registro.findById(req.params.id);
    res.json(registro);
});

// Agregar registro
app.post('/registros', async (req, res) => {
    const nuevoRegistro = new Registro(req.body);
    await nuevoRegistro.save();
    res.status(201).json(nuevoRegistro);
});

// Editar registro
app.put('/registros/:id', async (req, res) => {
    const registroActualizado = await Registro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(registroActualizado);
});

// Eliminar registro
app.delete('/registros/:id', async (req, res) => {
    await Registro.findByIdAndDelete(req.params.id);
    res.status(204).send();
});