/*-------------------------------Imports-------------------------------*/
import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import {
  VerifyDiscordRequest,
  DiscordRequest,
  standard_out_path,
} from './utils.js';
import {callDalle} from './dalle.js'
import {
  TEST_COMMAND,
  PROMPT_COMMAND,
  TEST_UPDATE_COMMAND,
  HasGuildCommands,
  DeleteGuildCommand,
} from './commands.js';
import {
  AttachmentBuilder,
  EmbedBuilder
} from 'discord.js';

/*----------------------------Creating app-----------------------------*/
// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async (req, res) => {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const {name} = data;

    // "test" guild command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ',
        },
      });
    }
    
    // "test_update"
    if (name === 'test-update') {
      const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/@original`;
      try {
        await res.send({
          type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
	  content: 'Just a test',
          flags: InteractionResponseFlags.EPHEMERAL,
        })

	const file = {
          "id": 0,
          "description": "Image of a cute little cat",
          "filename": '../images/boat_on_a_fantasy_river.png'
	};
        //const file = new AttachmentBuilder()
	//  .setFile('images/boat_on_a_fantasy_river.png');
        const embedFile = new EmbedBuilder()
	  .setTitle('Boat on a fantasy river')
	  .setImage('attachment://boat_on_a_fantasy_river.png');
        
	console.log(file);
        // Update ephemeral message
        await DiscordRequest(endpoint, {
          method: 'PATCH',
          body: {
            content: 'Nice choice ',
	    embeds: [embedFile],
            attachment: [file],
          },
        })
        //await DiscordRequest(endpoint, { method: 'DELETE' });
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }

    // "prompt" guild command
    if (name === 'prompt') {
      // Endpoint for updating message
      const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/@original`;
      // prompt for dalle
      const prompt_text = req.body.data.options[0].value;
      // Dall-e interface

      console.log(`Waiting for Dall-e response of ${prompt_text}`);
      try {
        await res.send({
          type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
	  //content: 'Sending Message',
          flags: InteractionResponseFlags.EPHEMERAL,
        })

	const dalleRes = await callDalle(prompt_text);
	

        //const file = new AttachmentBuilder(dalleRes.image);
        const embedFile = new EmbedBuilder()
	  .setTitle(prompt_text)
	  .setImage(dalleRes.url);
	  //.setImage(`attachment://${standard_out_path(prompt_text) + ".png"}`);
        
        // Update ephemeral message
        console.log('Got the response');
        await DiscordRequest(endpoint, {
          method: 'PATCH',
          body: {
            content: `Prompt: ${prompt_text}`,
	    embeds: [embedFile],
            //files: [file],
          },
        })
        //await DiscordRequest(endpoint, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed on Dall-e comunication', err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);

  // Check if guild commands from commands.js are installed (if not, install them)
  console.log(`Checking installed apps...`);
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
    TEST_COMMAND,
    TEST_UPDATE_COMMAND,
    PROMPT_COMMAND,
  ]);
  //DeleteGuildCommand(process.env.APP_ID, process.env.GUILD_ID, [
  //  //PROMPT_COMMAND,
  //  //CHALLENGE_COMMAND,
  //]);
});
