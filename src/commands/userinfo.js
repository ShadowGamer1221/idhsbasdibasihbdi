const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const discord = require('discord.js');
require('dotenv').config();

const config = {
    description: 'Sends the info about the user.',
    aliases: [],
    usage: '<member>',
    rolesRequired: ['🛡️ Administrator', '🛡️ Administrator'],
    category: 'Moderation',
    slashOptions: [
        {
            type: 'USER',
            name: 'user',
            description: 'The username that you want to get the info from.',
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
.setColor(client.config.colors.info)
.setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true, size: 512}))
.setThumbnail(user.displayAvatarURL({dynamic: true, size: 2048}))
.addField("#️⃣ Discriminator:", `${user.user.discriminator}`)
.addField("🆔 ID:", `${user.user.id}`)
.addField("Nickname:", `${user.nickname !== null ? `${user.nickname}` : 'None'}`)
.addField("Joined The Server On:", `<t:${parseInt(user.joinedTimestamp / 1000)}:R>`, true)
.addField("Avatar link:", `[Click Here](${user.user.displayAvatarURL()})`)
.addField("Account Created On:", `<t:${parseInt(user.user.createdTimestamp / 1000)}:R>`, true)
.addField("Roles:", `${user.roles.cache.map((role) => role.toString()).join(" ").replace("@everyone", " ") || "None"}`)
.addField("User boosted:", user.user.premiumSubscriptionCount || "0")

message.reply({ embeds: [respose] , ephemeral: true})
	},

  runInteraction: async (client, interaction, args) => {
    const user = interaction.options.getMember('user');
    console.log(user)

const guild = interaction.guild;

		const respose = new MessageEmbed()
.setColor(client.config.colors.info)
.setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true, size: 512}))
.setThumbnail(user.displayAvatarURL({dynamic: true, size: 2048}))
.addField("#️⃣ Discriminator:", `${user.user.discriminator}`)
.addField("🆔 ID:", `${user.user.id}`)
.addField("Nickname:", `${user.nickname !== null ? `${user.nickname}` : 'None'}`)
.addField("Joined The Server On:", `<t:${parseInt(user.joinedTimestamp / 1000)}:R>`, true)
.addField("Avatar link:", `[Click Here](${user.user.displayAvatarURL()})`)
.addField("Account Created On:", `<t:${parseInt(user.user.createdTimestamp / 1000)}:R>`, true)
.addField("Roles:", `${user.roles.cache.map((role) => role.toString()).join(" ").replace("@everyone", " ") || "None"}`)
.addField("User boosted:", user.user.premiumSubscriptionCount || "0")

interaction.reply({ embeds: [respose] , ephemeral: true})
  }
};