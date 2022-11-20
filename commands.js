import { capitalize, DiscordRequest } from './utils.js';
//import { getRPSChoices } from './game.js';

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') return;

  commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();
    
    if (data) {
      const installedNames = data.map((c) => c['name']);
      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command['name'])) {                                                      
        console.log(`Installing "${command['name']}"`);
        InstallGuildCommand(appId, guildId, command);
      } else {
        console.log(`"${command['name']}" command already installed`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
                                                                                                          
// Installs a command
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command                                                                                         
  try {                                                                                                   
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.error(err);
  }
}

// Delets a command
export async function DeleteGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();
    
    if (data) {
      const installedNames = data.map((c) => c['name']);
      // This is just matching on the name, so it's not good for updates
      if (installedNames.includes(command['name'])) {                                                      
        console.log(`Deleting "${command['name']}"`);
        // API endpoint to get and delet guild commands
        const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
        // delete command                                                                                         
        try {                                                                                                   
          await DiscordRequest(endpoint, { method: 'DELETE', body: command });
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log(`"${command['name']}" command not installed`);
      }
    }
  } catch (err) {
    console.error(err);
  }
	
}

// Simple test command
export const TEST_COMMAND = {
  name: 'test',
  description: 'Basic guild command',
  type: 1,
};

// Prompt to Dalle
export const PROMPT_COMMAND = {
  name: 'prompt',
  description: 'Send a prompt to Dalle',
/*
  options: [
    {
      type: 3,
      name: 'prompt_text',
      description: 'Send your text',
      required: true,
    },
  ],
*/
  type: 1,
};

// Command containing options
export const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  type: 1,
};

