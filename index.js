require('dotenv/config');
var express = require('express');
var app = express();
var SpeechRecognition = require('./services/SpeechRecognition.js');
var ResponseAI = require('./services/ResponseCreate.js')


app.get('/audio', async function (req, res) {
  try {
    var texto = await SpeechRecognition.fromFile();
    res.send(texto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no processamento');
  }
});



app.get('/resposta', async function(req, res){
  try{
    var texto = await ResponseAI.obterRespostaDaAPIOpenAI(req.body[0]);
    res.send(texto.content)
  }catch(error){
    console.error(error);
    res.status(500).send('Erro no processamento');}
})

app.listen(3030);
