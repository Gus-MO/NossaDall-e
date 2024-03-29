const { SlashCommandBuilder } = require('discord.js');
const { callDalle } = require('../openai.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

// Database
const { create_request } = require('../database/database.js');

// Utils
const { check_string } = require('../utils.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Send a prompt to Dalle.')
    .addStringOption(option =>
      option.setName('prompt_text')
      .setDescription('Send your text')),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.deferReply();

    // Storing in DataBase
    const request = {
      user: {
        DISCORD_ID: interaction.user.id,
	      USER_NAME: interaction.user.username,
      },
      guild: {
	      DISCORD_ID: interaction.guild.id,
	      GUILD_NAME: interaction.guild.name,
      },
    };

    const request_response = await create_request(request);
    console.log(request_response.text);

    if (request_response.response) {
      // Checking if is a string with a given default
      const prompt_text = check_string(interaction.options.getString('prompt_text'));
      
      
      // Calling Dall-e
      const dalleRes = await callDalle(prompt_text);

      // On moderation Failed
      if (typeof dalleRes === 'string' || dalleRes instanceof String){
      console.log('Got the response');
        await interaction.editReply({
          content: dalleRes,
        });
        return ;
      }

      // Embedding files
      //const file = new AttachmentBuilder(dalleRes.image);
      const embedFile = new EmbedBuilder()
        .setTitle(prompt_text)
        .setImage(dalleRes.url);
          
      // Update ephemeral message
      console.log('Got the response');

      console.log(`Waiting for Dall-e response of ${prompt_text}`);
      await interaction.editReply({
        content: await request_response.text,
        embeds: [embedFile],
        //attachment: [file],
      });
    } else {
      await interaction.editReply({
        content: await request_response.text,
      });
    }
  },
};

