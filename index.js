var express = require('express');
var app = express();
app.use(express.json());
var { fromFile } = require('./services/SpeechRecognition.js'); // Update the path accordingly

app.get('/audio', async function (req, res) {
  try {
    var texto = await fromFile(); // Call the correct function from your 'SpeechRecognition' module
    res.send(texto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no processamento');
  }
});

async function obterRespostaDaAPIOpenAI(pergunta) {

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_IA_API_KEY,
});

const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});

console.log(response.data.choices[0].text)

}

app.post('/pergunta', async (req, res) => {
  try {
    const pergunta = req.body.pergunta;
    const resposta = await obterRespostaDaAPIOpenAI(pergunta);
    res.json({ resposta });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a pergunta' });
  }
});

app.listen(3030, function () {
  console.log('Server is running on port 3030');
});

