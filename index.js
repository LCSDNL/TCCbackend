require('dotenv/config');
var express = require('express');
var app = express();
var SpeechRecognition = require('./services/SpeechRecognition.js');
var ResponseAI = require('./services/ResponseCreate.js')
const bodyParser = require('body-parser');
var cors = require('cors')
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const { PassThrough } = require('stream');


app.use(bodyParser.json());
app.use(cors())

/*
app.get('/audio', async function (req, res) {
  try {
    var texto = await SpeechRecognition.fromFile(); // Call the correct function from your 'SpeechRecognition' module
    res.send(texto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no processamento');
  }
});
*/


app.post('/resposta', async function(req, res){
  const pergunta = req.body.pergunta;
try{
    var texto = await ResponseAI.obterRespostaDaAPIOpenAI(pergunta);
    res.send(texto.content)
  }catch(error){
    console.error(error);
    res.status(500).send('Erro no processamento');}
    
})


app.post('/restotext', async function(req, res) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

  const ssml = `<speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="${req.body.vozAutor}">
    <prosody rate="${req.body.vozVelocidade}%" pitch="${req.body.vozTom}%">
      ${req.body.texto}
    </prosody>
  </voice>
</speak>`

  speechSynthesizer.speakSsmlAsync(
    ssml,
    result => {
      const { audioData } = result;

      speechSynthesizer.close();

      // Converte o arrayBuffer em um stream
      const bufferStream = new PassThrough();
      bufferStream.end(Buffer.from(audioData));

      // Envia a resposta com o áudio
      res.set('Content-Type', 'audio/wav');
      bufferStream.pipe(res);
    },
    error => {
      console.log(error);
      speechSynthesizer.close();
      res.status(500).send('Erro ao sintetizar o áudio');
    }
  );
});


app.listen(3030);
