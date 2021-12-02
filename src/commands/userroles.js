const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends the roles that you/the mentioned user have.',
    aliases: [],
    usage: '',
    rolesRequired: ['Verified'],
    category: 'Info',
    slashOptions: [
      {
            type: 'USER',
            name: 'target',
            description: 'The username of the user you want to see the roles.',
            required: false
        }
    ]
}

        module.exports = {
  config,
  run: async (client, message, args) => {
    const user =			message.mentions.members.first()
			|| message.guild.members.cache.get(args[0])
			|| message.member;

      const target = message.mentions.users.first() || message.author;

    const whoisEmbed = new Discord.MessageEmbed() 
      .setTitle(`${target.username}\'s Roles:`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail('https://cdn.discordapp.com/app-icons/880517850291388427/6730aad569eaaa559d79d744424311d6.png?size=2048')
      .setColor(client.config.colors.success)
      .setDescription(user.roles.cache.map((role) => role.toString()).join('\n'))
      .setFooter('')
      .setTimestamp();
    message.reply({ embeds: [whoisEmbed] })
  },
  
  runInteraction: async (client, interaction, args) => {
    
    const user = interaction.options.getMember('target');
    console.log(user)

    let embed = new Discord.MessageEmbed();
      embed.setTitle(`${interaction.options.getMember('target').user.username}\'s Roles:`);
      embed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL());
      embed.setThumbnail('https://cdn.discordapp.com/app-icons/880517850291388427/6730aad569eaaa559d79d744424311d6.png?size=2048');
      embed.setColor(client.config.colors.success);
      embed.setDescription(user.roles.cache.map((role) => role.toString()).join('\n'));
      embed.setFooter('');
      embed.setTimestamp();
   interaction.reply({ embeds: [embed] });
  }
}