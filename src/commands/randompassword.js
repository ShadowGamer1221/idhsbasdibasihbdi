const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends a random password.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Fun',
    slashOption: []
}

module.exports = {
	config,
	run: async (client, message, args) => {
		const facts = 'https://no-api-key.com/api/v2/password?length=16';

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
			.setTitle('Random Password')
			.setColor(client.config.colors.success)
			.setDescription(fact.password)

		return message.channel.send({ embeds: [embed] });
	},

  runInteraction: async (client, interaction, args) => {
    const facts = 'https://no-api-key.com/api/v2/password?length=16';

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
			.setTitle('Random Password')
			.setColor(client.config.colors.success)
			.setDescription(fact.password)

		return interaction.reply({ embeds: [embed] });
  }
};