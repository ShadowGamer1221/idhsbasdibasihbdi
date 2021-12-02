const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');
const ms = require('ms');
const path = require('path')
const discord = require('discord.js')
const axios = require('axios');
require('dotenv').config();

const config = {
  description: 'Shows the weather information.',
  aliases: [],
  usage: '<city name>',
  rolesRequired: ['Verified'],
  category: 'Miscellaneous',
  slashOptions: [
      {
            type: 'STRING',
            name: 'state',
            description: 'The state of the weather that you want to know.',
            required: true
      }
    ]
}

module.exports = {
        config,
    run: async (bot, message, args) => {
    
        if(args.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a location!")
            .setColor('#de554e')
            .setTimestamp();
                return message.reply({ embeds: [errorembed] });
        }
        
        weather.find({ search: args.join(" "), degreeType: 'C'}, function(err, result, lenght) {
          
        if(result.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a vaild location!")
            .setColor('#de554e')
            .setTimestamp();
                return message.reply({ embeds: [errorembed] });
        }
        
          var current = result[0].current;
          var location = result[0].location;
            if (err) {
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a vaild location!")
            .setColor('#de554e')
            .setTimestamp();
                return message.reply({ embeds: [errorembed] });
            }
        
            
            let embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor('#43d177')
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', location.degreetype, true)
            .addField('Temperature', `${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds', current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setTimestamp();
                message.reply({ embeds: [embed] });
        });
    },

    runInteraction: async (client, interaction, args) => {
      
        if(args.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a location!")
            .setColor('#de554e')
            .setTimestamp();
                return interaction.reply({ embeds: [errorembed] });
        }
        
        weather.find({ search: args.join(" "), degreeType: 'C'}, function(err, result, lenght) {
          
        if(result.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a vaild location!")
            .setColor('#de554e')
            .setTimestamp();
                return interaction.reply({ embeds: [errorembed] });
        }
        
          var current = result[0].current;
          var location = result[0].location;
            if (err) {
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a vaild location!")
            .setColor('#de554e')
            .setTimestamp();
                return interaction.reply({ embeds: [errorembed] });
            }
        
            
            let embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor('#43d177')
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', location.degreetype, true)
            .addField('Temperature', `${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds', current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setTimestamp();
                interaction.reply({ embeds: [embed] });
        });
    }
};