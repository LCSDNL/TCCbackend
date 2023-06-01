require('dotenv/config');
var express = require('express');
var app = express();
var SpeechRecognition = require('./services/SpeechRecognition.js');
var ResponseAI = require('./services/ResponseCreate.js')
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/audio', async function (req, res) {
  try {
    var texto = await SpeechRecognition.fromFile();
    res.send(texto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no processamento');
  }
});



app.post('/resposta', async function(req, res){
  const pergunta = req.body.pergunta;
try{
    var texto = await ResponseAI.obterRespostaDaAPIOpenAI(pergunta);
    res.send(texto.content)
  }catch(error){
    console.error(error);
    res.status(500).send('Erro no processamento');}
    
})

app.listen(3030);
