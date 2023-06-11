require('dotenv/config');
class ResponseAI{
 static async obterRespostaDaAPIOpenAI(pergunta) {


    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${pergunta}`}],
      max_tokens: 300,
    });
    console.log(completion.data.choices[0].message);
    return completion.data.choices[0].message;
    
  }
}

module.exports= ResponseAI;
