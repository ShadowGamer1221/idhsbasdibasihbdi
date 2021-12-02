const { MessageEmbed } = require("discord.js")
const ms = require('ms');
const Discord = require('discord.js')
const path = require('path')
const discord = require('discord.js')
const axios = require('axios');
const db = require("quick.db");
require('dotenv').config();

const config = {
  description: 'Sends your suggestion into the suggestion channel.',
  aliases: [],
  usage: '<message>',
  rolesRequired: ['Verified'],
  category: 'Bot',
  slashOptions: [
    {
            type: 'STRING',
            name: 'suggestion',
            description: 'The suggestion that you want to set for the suggestions.',
            required: true
    }
  ]
}
 
module.exports = {
  config,
  run: async (client, message, args) => {
   
  let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Please Suggest Something.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Status: Pending")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`✅ | Your suggestion is Submitted here, <#${channel}>\n\nNote: You agreed to get a DM on a reply over your Suggestion!`)
       .setColor("00FFFF")
       
    message.channel.send({ embeds: [done] })
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send({ embeds: [embed] })
    
    await msgEmbed.react('✅')
    await msgEmbed.react('❌')
  },

  runInteraction: async (client, interaction, args) => {
    let channel = await db.fetch(`suggestion_${interaction.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return interaction.reply("Please Suggest Something.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Status: Pending")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`✅ | Your suggestion is Submitted here, <#${channel}>\n\nNote: You agreed to get a DM on a reply over your Suggestion!`)
       .setColor("00FFFF")
       
    interaction.channel.send({ embeds: [done] })
    
    let msgEmbed = await interaction.guild.channels.cache.get(channel).send({ embeds: [embed] })
    
    await msgEmbed.react('✅')
    await msgEmbed.react('❌')
  }
}