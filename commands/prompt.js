const { SlashCommandBuilder } = require('discord.js');
const { callDalle } = require('../dalle.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

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

    const prompt_text = interaction.options.getString('prompt_text')
    
    // Calling Dall-e
    const dalleRes = await callDalle(prompt_text);

    // Embedding files
    //const file = new AttachmentBuilder(dalleRes.image);
    const embedFile = new EmbedBuilder()
      .setTitle(prompt_text)
      .setImage(dalleRes.url);
	
    // Update ephemeral message
    console.log('Got the response');

    console.log(`Waiting for Dall-e response of ${prompt_text}`);
    await interaction.editReply({
      content: 'Nice choice ',
      embeds: [embedFile],
      //attachment: [file],
    });
  },
};

