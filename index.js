var express = require('express');
var app = express();
var SpeechRecognition = require('./services/SpeechRecognition.js');

app.get('/audio', async function (req, res) {
  try {
    var texto = await SpeechRecognition.fromFile();
    res.send(texto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no processamento');
  }
});

app.listen(3030);
