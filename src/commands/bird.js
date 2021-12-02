const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends a random bird pic with a fact.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Animals',
    slashOptions: []
}

module.exports = {
	config,
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/birb';
		const facts = 'https://some-random-api.ml/facts/birb';

    const errorEmbed = new MessageEmbed()

    .setTitle('Error!')
    .setDescription('An error occured, please try again!')
    .setColor(client.config.colors.error)

		let image; let
			response;
		let fact; let
			responses;
		try {
			response = await axios.get(url);
			image = response.data;

			responses = await axios.get(facts);
			fact = responses.data;
		} catch (e) {
			return message.reply({ embeds: [errorEmbed] });
		}

		const embed = new MessageEmbed()
			.setTitle('Random Bird Image and Fact')
			.setColor(client.config.colors.success)
			.setDescription(fact.fact)
			.setImage(image.link);

		return message.reply({ embeds: [embed] });
	},

  runInteraction: async (client, interaction, args) => {
    const url = 'https://some-random-api.ml/img/birb';
		const facts = 'https://some-random-api.ml/facts/birb';

    const errorEmbed = new MessageEmbed()

    .setTitle('Error!')
    .setDescription('An error occured, please try again!')
    .setColor(client.config.colors.error)

		let image; let
			response;
		let fact; let
			responses;
		try {
			response = await axios.get(url);
			image = response.data;

			responses = await axios.get(facts);
			fact = responses.data;
		} catch (e) {
			return interaction.reply({ embeds: [errorEmbed] });
		}

		const embed = new MessageEmbed()
			.setTitle('Random Bird Image and Fact')
			.setColor(client.config.colors.success)
			.setDescription(fact.fact)
			.setImage(image.link);

		return interaction.reply({ embeds: [embed] });
  }
};