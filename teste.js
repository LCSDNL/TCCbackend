async function obterRespostaDaAPIOpenAI(pergunta) {

    const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "davinci",
  prompt: pergunta,
  max_tokens: 7,
  temperature: 0,
  
});

    
console.log(
    `Pergunta: ${pergunta}\nResposta: ${response.data.choices[0].text}`)
    
    }

obterRespostaDaAPIOpenAI("me diga qual a capital do brasil?")
