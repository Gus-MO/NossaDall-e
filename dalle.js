/*------------------------------ Imports -------------------------------*/
import 'dotenv/config'
import { Configuration, OpenAIApi } from "openai";
import * as https from 'https';
import {Transform} from 'stream';
import * as fs from 'fs';
import { standard_out_path } from './utils.js';

/*-------------------------- Some Definitions --------------------------*/

// OpenAi
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Personal
const image_path = 'images/'

// Functions
function download (url, image_final){
  /*
   * This function takes an image url and downloads to the given
   * path
   */
  https.request(url, (response) => {                                        
    var data = new Transform();

    response.on('data', (chunk) => {                                       
      data.push(chunk);                                                         
    });                                                                         

    response.on('end', () => {                                             
      fs.writeFileSync(image_final, data.read());                               
    });                                                                         
  }).end();
}

/*-------------------------- Generating image --------------------------*/

export function callDalle (prompt_text, n = 1, size = "1024x1024") {
  // Calling openai
  //const response = await openai.createImage({
  const response = openai.createImage({
    prompt: prompt_text,
    n: 1,
    size: "1024x1024",
  });
  var image_url = response.data.data[0].url;
  var image_final = image_path + standard_out_path(prompt_text) + '.png'
  
  // Logs
  console.log(`Generated image link:\t ${image_url} \n\n`)
  console.log(`Writing image on file: ${image_final}`)
  
  // Downloading picture
  download(image_url, image_final);

  return image_final;
}
