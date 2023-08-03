const { Schema, model } = require("mongoose");

const formularioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  programa: {
    type: String,
    required: true
  },
 nombredelaespecie: {
    type: String,
    required: true
  },
  características: {
    type: String,
    required: true
  },
  estadodesalud: {
    type: String,
    required: true
  },
  coordenadas: {
    type: String,
    required: true
  },
  denisdaddelaire: {
    type: Number,
    required: true
  },
  tasadefotosintesis: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  tipoArbol: {
    type: String,
    required: true
  },
  archivocompleto: {
    type: String,
    required: true
  }
});


module.exports = model("formulario", formularioSchema);
