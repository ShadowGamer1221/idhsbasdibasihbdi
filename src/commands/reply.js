const { MessageEmbed } = require("discord.js")
const ms = require('ms');
const Discord = require('discord.js')
const path = require('path')
const discord = require('discord.js')
const axios = require('axios');
const db = require("quick.db");
require('dotenv').config();

const config = {
  description: 'Replys to a suggestion.',
  aliases: [],
  usage: '<MessageId>',
  rolesRequired: ['🛡️ Administrator', '[🏗️] Development Team'],
  category: 'Moderation'
}

module.exports = {
  config,
  run: async (client, message, args) => {
    
let channel = await db.fetch(`suggestion_${message.guild.id}`);
if (channel === null) return;
     
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`❌ | I don't think that was a Message ID!`)
      .setColor(client.config.colors.error)
      
    const id = new MessageEmbed()
      .setDescription(`❌ | You forgot to specify Message ID!`)
      .setColor(client.config.colors.error)
      
    const query = new MessageEmbed()
      .setDescription(`❌ | You forgot to specify the Reply!`)
      .setColor(client.config.colors.error)
      
    const reply = new MessageEmbed()
      .setDescription(`✅ | Successfully Replied the Suggestion.`)
      .setColor(client.config.colors.success)
      
    const noChannel = new MessageEmbed()
      .setDescription(`❌ | No Suggestion Channel found!`)
      .setColor(client.config.colors.error)
      
    const noMessage = new MessageEmbed()
      .setDescription(`❌ | Didn't find any Message with that ID!`)
      .setColor(client.config.colors.error)
    
      if(!messageID) return message.reply({ embeds: [id] });
      
      if (!rgx.test(messageID)) return message.reply({ embeds: [number] });
      
      if(!replyQuery) return message.reply({ embeds: [query] })
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.reply({ embeds: [noChannel] })
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`❌ | Didn't find any Message with that ID!`)
      .setColor(client.config.colors.error)
  return message.reply({ embeds: [noMessage] });
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("BLUE")
      .addField(`Reply from ${message.author.tag}`, replyQuery)
      .setFooter("Status: Replied")
      .setTimestamp();
      
     suggestedEmbed.edit({ embeds: [replyEmbed] })
     
     message.channel.send({ embeds: [reply] })
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`You have got a Reply over your Suggestion. **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("BLUE")
      user.send({ embeds: [embed] })
        
      } catch(err) {
        return;
    }
  }
  }
  