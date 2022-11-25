/*------------------------------ Imports -------------------------------*/
// Some node utilities
const fs = require('node:fs');
const path = require('node:path');
const https = require('https');
const {Transform} = require('stream').Transform;

// Defaults imports
const dotenv = require('dotenv/config');


// OpenAI
const { Configuration, OpenAIApi } = require("openai");

// Local
const { standard_out_path, get_current_out_date} = require('./utils.js');

/*-------------------------- Some Definitions --------------------------*/

// OpenAi
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Personal
const image_path = path.join(__dirname, 'images/');

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

exports.callDalle = async function callDalle (prompt_text, num = 1, size1 = "1024x1024") {
  // Calling openai
  const response = await openai.createImage({
  //const response = openai.createImage({
    prompt: prompt_text,
    n: num,
    size: size1,
  });
  var image_url = response.data.data[0].url;
  var image_final = image_path + get_current_out_date() + '_' + standard_out_path(prompt_text) + '.png'
  
  // Logs
  console.log(`Generated image link:\t ${image_url} \n\n`)
  console.log(`Writing image on file: ${image_final}`)
  
  // Downloading picture
  download(image_url, image_final);

  return {
    'image': image_final,
    'url': image_url,
  };
}
