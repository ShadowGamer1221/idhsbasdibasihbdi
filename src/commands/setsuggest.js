const { MessageEmbed } = require("discord.js")
const ms = require('ms');
const Discord = require('discord.js')
const path = require('path')
const discord = require('discord.js')
const axios = require('axios');
const db = require("quick.db");
require('dotenv').config();

const config = {
  description: 'Sets the suggestion channel for the suggestions.',
  aliases: [],
  usage: '<#channel>',
  rolesRequired: ['🛡️ Moderation Team'],
  category: 'Moderation',
  slashOptions: [
    {
            type: 'CHANNEL',
            name: 'channel',
            description: 'The channel that you want to set for the suggestions.',
            required: true
        }
  ]
}

module.exports = {
    config,
    run: async (client, message, args) => {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!channel) return message.reply(`Please Mention A Channel!`);

        if (channel.type === "voice") return message.reply(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${message.guild.id}`, channel.id);

        let embed = new MessageEmbed()
        .setColor(client.config.colors.success)
        .setDescription(`Suggestion Channel is setted as <#${channel.id}>`)

        return message.reply({ embeds: [embed] });

    },

    runInteraction: async (client, interaction, args) => {

      let channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);
      console.log(channel)

        if (!channel) return interaction.reply(`Please Mention A Channel!`);

        if (channel.type === "voice") return interaction.reply(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${interaction.guild.id}`, channel.id);

        let embed = new MessageEmbed()
        .setColor(client.config.colors.success)
        .setDescription(`Suggestion Channel is setted as <#${channel.id}>`)

        return interaction.reply({ embeds: [embed] });
    }
};