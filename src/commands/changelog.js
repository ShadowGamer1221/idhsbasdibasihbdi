const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends the changelog of the bot.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Info',
    slashOptions: []
}

        module.exports = {
  config,
  run: async (client, message, args) => {
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setAuthor('Bot Version v2.0.5')
    .setColor(client.config.colors.success)
    .addFields({
      name: 'New Commands',
      value: ' - !!ban\n - !!kick\n - !!unban\n - !!botinfo',
      inline: true,
    },
    {
      name: 'Fixes',
      value: 'Fixed the kick command',
      inline: true,
    })
    

    .setTimestamp();
    message.channel.send({ embeds: [embed] })
    },

    runInteraction: async (client, interaction, args) => {
      const embed = new Discord.MessageEmbed()
    .setAuthor('Bot Version v2.0.5')
    .setColor(client.config.colors.success)
    .addFields({
      name: 'New Commands',
      value: ' - !!ban\n - !!kick\n - !!unban\n - !!botinfo',
      inline: true,
    },
    {
      name: 'Fixes',
      value: 'Fixed the kick command',
      inline: true,
    })
    

    .setTimestamp();
    interaction.reply({ embeds: [embed] })
    }
  }