const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Shuts down the bot. Abusing this will result in a ban.',
    aliases: [],
    usage: '',
    rolesRequired: ['🛡️ Administrator'],
    category: 'Bot',
    slashOptions: []
}


module.exports = {
config,
	run: async (client, message, args) => {

    const member = message.member;
    console.log(member)

    const user = client.users.cache.get('832932513936441375');
    const embed = new MessageEmbed()
    .setTitle('Bot Shuted Down!')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setDescription(`${member} shuted down the bot!`)
    .setFooter('Bot shuted down.')
    .setTimestamp();
    await user.send({ embeds: [embed] })

    const shutEmbed = new MessageEmbed()
    .setTitle('Bot Shuted Down!')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colors.success)
    .setDescription(`You shuted the bot down successfully!\n\n Note: ${user} got a dm.`)
    .setFooter('Bot shuted down.')
    .setTimestamp();
    await member.send({ embeds: [shutEmbed] })

    const botshutEmbed = new Discord.MessageEmbed() 
      .setTitle('Shuting down bot:')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail('https://cdn.discordapp.com/app-icons/880517850291388427/6730aad569eaaa559d79d744424311d6.png?size=2048')
      .setColor(client.config.colors.success)
      .setDescription('Contact <@832932513936441375> to start the bot again.\n\nShuting down bot...')
      .setFooter('Shuting down. Contact Shadow to start the bot again.')
      .setTimestamp();
   await message.reply({ embeds: [botshutEmbed] })
		process.exit();
	},

  runInteraction: async (client, interaction, args) => {
    const member = interaction.member;
    console.log(member)

    const user = client.users.cache.get('832932513936441375');
    const embed = new MessageEmbed()
    .setTitle('Bot Shuted Down!')
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setDescription(`${member} shuted down the bot!`)
    .setFooter('Bot shuted down.')
    .setTimestamp();
    await user.send({ embeds: [embed] })

    const shutEmbed = new MessageEmbed()
    .setTitle('Bot Shuted Down!')
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setColor(client.config.colors.success)
    .setDescription(`You shuted the bot down successfully!\n\n Note: ${user} got a dm.`)
    .setFooter('Bot shuted down.')
    .setTimestamp();
    await member.send({ embeds: [shutEmbed] })

    const botshutEmbed = new Discord.MessageEmbed() 
      .setTitle('Shuting down bot:')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
      .setThumbnail('https://cdn.discordapp.com/app-icons/880517850291388427/6730aad569eaaa559d79d744424311d6.png?size=2048')
      .setColor(client.config.colors.success)
      .setDescription('Contact <@832932513936441375> to start the bot again.\n\nShuting down bot...')
      .setFooter('Shuting down. Contact Shadow to start the bot again.')
      .setTimestamp();
   await interaction.reply({ embeds: [botshutEmbed] })
		process.exit();
  }
};