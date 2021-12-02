const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Shows how many times the user boosted.',
    aliases: [],
    usage: '<member>',
    rolesRequired: ['Verified'],
    category: 'Moderation',
    slashOptions: [
        {
            type: 'USER',
            name: 'user',
            description: 'The username that you want to get the boosting info from.',
            required: true
        }
    ]
}

module.exports = {
	config,
	run: async (client, message, args) => {
		const user =			message.mentions.members.first()
			|| message.guild.members.cache.get(args[0])
			|| message.member;

      const guild = message.guild;


		const respose = new MessageEmbed()
.setColor("YELLOW")
.setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true, size: 512}))
.setDescription(`User boosted ${user.user.premiumSubscriptionCount || "0"} times.`)
.setTimestamp();

message.reply({ embeds: [respose] })
	},

  runInteraction: async (client, interaction, args) => {
    const user = interaction.options.getMember('user');
    console.log(user)

const guild = interaction.guild;

				const respose = new MessageEmbed()
.setColor("YELLOW")
.setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true, size: 512}))
.setDescription(`User boosted ${user.user.premiumSubscriptionCount || "0"} times.`)
.setTimestamp();

interaction.reply({ embeds: [respose] })
  }
};