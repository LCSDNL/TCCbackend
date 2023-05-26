require('dotenv').config();
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
speechConfig.speechRecognitionLanguage = "pt-BR";

class SpeechRecognition {
  static fromFile() {
    return new Promise((resolve, reject) => {
      let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("C:/Users/Lucas/Documents/projetoTCC/backend/TCCback/services/testebr.wav"));
      let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
          case sdk.ResultReason.RecognizedSpeech:
            console.log(`RECOGNIZED: Text=${result.text}`);
            resolve(result.text);
            break;
          case sdk.ResultReason.NoMatch:
            console.log("NOMATCH: Speech could not be recognized.");
            reject(new Error("Speech could not be recognized."));
            break;
          case sdk.ResultReason.Canceled:
            const cancellation = sdk.CancellationDetails.fromResult(result);
            console.log(`CANCELED: Reason=${cancellation.reason}`);

            if (cancellation.reason === sdk.CancellationReason.Error) {
              console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
              console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
              console.log("CANCELED: Did you set the speech resource key and region values?");
            }
            reject(new Error("Recognition was canceled."));
            break;
        }
        speechRecognizer.close();
      });
    });
  }
}

module.exports = SpeechRecognition;
