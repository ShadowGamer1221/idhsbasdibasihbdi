const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends a random fact.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Fun',
    slashOptions: []
}

module.exports = {
	config,
	run: async (client, message, args) => {
		const facts = 'https://no-api-key.com/api/v2/facts';

    const errorEmbed = new MessageEmbed()
    .setTitle('Error!')
    .setColor(client.config.colors.error)
    .setDescription('An error occured, please try again!')
    .setTimestamp();

		let fact; let
			responses;
		try {

			responses = await axios.get(facts);
			fact = responses.data;
		} catch (e) {
			return message.reply({ embeds: [errorEmbed] });
		}

		const embed = new MessageEmbed()
			.setTitle('Random Fact')
			.setColor(client.config.colors.success)
			.setDescription(fact.fact)

		return message.reply({ embeds: [embed] });
	},

  runInteraction: async (client, interaction, args) => {

    const facts = 'https://no-api-key.com/api/v2/facts';

    const errorEmbed = new MessageEmbed()
    .setTitle('Error!')
    .setColor(client.config.colors.error)
    .setDescription('An error occured, please try again!')
    .setTimestamp();

		let fact; let
			responses;
		try {

			responses = await axios.get(facts);
			fact = responses.data;
		} catch (e) {
			return interaction.reply({ embeds: [errorEmbed] });
		}

		const embed = new MessageEmbed()
			.setTitle('Random Fact')
			.setColor(client.config.colors.success)
			.setDescription(fact.fact)

		return interaction.reply({ embeds: [embed] });
  }
};