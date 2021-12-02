const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
const { MessageEmbed } = require('discord.js')

const config = {
    description: 'Sends the bot info.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Bot',
    slashoptions: []
}


module.exports = {
config,
run: async (client, message, args) => {
  let botembed = new MessageEmbed()
  .setTitle("Bot Info")
  .setColor(client.config.colors.success)
  .addField(`- Bot creator: \n`, `> Lord_Shadow#5696`)
  .addField(`- Bot info: \n`, `> ${client.user.tag}`)
  .addField(`- Created on: `, `> ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")} (${ms(Date.now()- client.user.createdAt, {long: true})})`)
  
  message.reply({ embeds: [botembed] });
  },

  runInteraction: async (client, interaction, args) => {
  let botembed = new MessageEmbed()
  .setTitle("Bot Info")
  .setColor(client.config.colors.success)
  .addField(`- Bot creator: \n`, `> Lord_Shadow#5696`)
  .addField(`- Bot info: \n`, `> ${client.user.tag}`)
  .addField(`- Created on: `, `> ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")} (${ms(Date.now()- client.user.createdAt, {long: true})})`)
  
  interaction.reply({ embeds: [botembed] });
  }
}