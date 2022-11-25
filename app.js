/*-------------------------------Imports-------------------------------*/
// Some node utilities
const fs = require('node:fs');
const path = require('node:path');

// Defaults imports
const dotenv = require('dotenv/config');
//const express = require('express');

// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { Events, Collection } = require('discord.js');

/*----------------------------Declarations-----------------------------*/
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, /*GatewayIntentBits.GuildWebhooks*/] });
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const imagesPath = path.join(__dirname, 'images');

// Importing the commands
client.commands = new Collection();

console.log('Checking for commands!');
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

/*--------------------------------Events-------------------------------*/
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
//const filePath = path.join(__dirname, 'events', 'interactionCreate.js');
//const event = require(filePath);
//client.on(event.name, (...args) => event.execute(...args));
