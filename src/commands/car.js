const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends a random car.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Fun',
    slashOptions: []
}


module.exports = {
	config,

  run: async (client, message, args) => {
    const url = 'https://no-api-key.com/api/v2/car';

      let response;
		try {
			const { data } = await axios.get(url);
			response = data;
		} catch (e) {
			return message.reply('An error has occured, try again!');
		}
      
     
      const embed = new MessageEmbed()
			.setTitle('Random Car: ')
			.setColor(client.config.colors.success)
			.setImage(response.image);

		return message.reply({ embeds: [embed] });
  },
  
	runInteraction: async (client, interaction, args) => {
		const url = 'https://no-api-key.com/api/v2/car';

      let response;
		try {
			const { data } = await axios.get(url);
			response = data;
		} catch (e) {
			return interaction.followUp('An error has occured, try again!');
		}
      
     
      const embed = new MessageEmbed()
			.setTitle('Random Car: ')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
			.setColor(client.config.colors.success)
			.setImage(response.image);

		return interaction.reply({ embeds: [embed] });
    
    
	},
};