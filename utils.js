import 'dotenv/config';
import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      //'User-Agent': 'NossaDall-eBot',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}


export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function standard_out_path(str) {
  return str.toLowerCase().replaceAll(" ", "_")
}

export function create_embbed(file_name) {
  return {
    //color: 0x0099ff,
    title: 'file_name',
    //url: 'https://discord.js.org',
    //author: {
    //  name: 'Some name',
    //  icon_url: 'https://i.imgur.com/AfFp7pu.png',
    //  url: 'https://discord.js.org',
    //},
    //description: 'Some description here',
    //thumbnail: {
    //  url: 'https://i.imgur.com/AfFp7pu.png',
    //},
    //fields: [
    //  {
    //  	name: 'Regular field title',
    //  	value: 'Some value here',
    //  },
    //  {
    //  	name: '\u200b',
    //  	value: '\u200b',
    //  	inline: false,
    //  },
    //  {
    //  	name: 'Inline field title',
    //  	value: 'Some value here',
    //  	inline: true,
    //  },
    //  {
    //  	name: 'Inline field title',
    //  	value: 'Some value here',
    //  	inline: true,
    //  },
    //  {
    //  	name: 'Inline field title',
    //  	value: 'Some value here',
    //  	inline: true,
    //  },
    //  ],
    image: {
       url: `attachment://${file_name}`,
    },
    //timestamp: new Date().toISOString(),
    //footer: {
    //  text: 'Some footer text here',
    //  icon_url: 'https://i.imgur.com/AfFp7pu.png',
    //},
  };
}

export function create_attachment(final_path) {
  return {
    filename: final_path,
    //content_type: 'image/png',
    //height:,
    //width:,
    //id:,
    //description:,
    //size:,
    //url:,
    //proxy_url:,
    //ephemeral:,
  }
}
