const { MessageEmbed } = require("discord.js")
const discord = require('discord.js');
const path = require('path');

const config = {
    description: 'Kick\'s the mentioned member with the reason if provided.',
    aliases: ['k'],
    usage: '<member> [reason]',
    rolesRequired: ['E | Kick Permissions'],
    category: 'Moderation',
    slashOptions: [
        {
            type: 'USER',
            name: 'username',
            description: 'The username or user id that you want to kick.',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'Reason for kicking the user.',
            required: true
        }
    ]
}

module.exports = {
    config,
    run: async (client, message, args) => {

    const nothing = new MessageEmbed()
    .setTitle('Please mention the user')
    .setDescription('You need to state a user to kick.')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

    const nomentionEmbed = new MessageEmbed()
    .setTitle('Error')
    .setDescription('The member mentioned is not in the server.')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

     let embed = new MessageEmbed();
    

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";

      if (!args[0]) {
            embed.setDescription(`Missing arguments.\n\nUsage: \`${client.config.prefix}${path.basename(__filename).split('.')[0]}${' ' + config.usage || ''}\``);
            embed.setColor(client.config.colors.error);
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.reply({ embeds: [nothing] });
        }
        if(!mentionMember) {
            embed.setDescription(`Missing arguments.\n\nUsage: \`${client.config.prefix}${path.basename(__filename).split('.')[0]}${' ' + config.usage || ''}\``);
            embed.setColor(client.config.colors.error);
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            return message.reply({ embeds: [nomentionEmbed] });
        }
        
        const kickEmbed = new MessageEmbed()
        .setDescription(`**Server:** ${message.guild.name}\n**Actioned by:** <@${message.author.id}>\n**Action:** Kick\n**Reason:** ${reason}`)
        .setColor(client.config.colors.error)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

        let good = true

        try {
          await mentionMember.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.log(`I was unable to message the member.`);
        }
    try {
      await mentionMember.kick(`${args.slice(1).join(" ") ? `${message.author.tag} (${message.author.id}) Kicked this user with the following reason:\n${args.slice(1).join(" ")}` : `${message.author.tag} (${message.author.id}) Kicked this user with no reason.`}`)
      } catch (err) {
        console.log(err); good = false
      }

    if(good) {embed.setDescription(`**Success!** Kicked ${mentionMember.tag? mentionMember.tag : mentionMember.user.tag}!`).setColor(client.config.colors.success).setAuthor(message.author.tag, message.author.displayAvatarURL()).setTimestamp()} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
    message.reply({ embeds: [embed] })
    if(!good) return
    },

    runInteraction: async (client, interaction, args) => {
      const nothing = new MessageEmbed()
    .setTitle('Please mention the user')
    .setDescription('You need to state a user to kick.')
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

    const nomentionEmbed = new MessageEmbed()
    .setTitle('Error')
    .setDescription('The member mentioned is not in the server.')
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

     let embed = new MessageEmbed();
    

        const mentionMember = interaction.options.getMember('username');
        console.log(mentionMember)
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";

      if (!args[0]) {
            embed.setDescription(`Missing arguments.\n\nUsage: \`${client.config.prefix}${path.basename(__filename).split('.')[0]}${' ' + config.usage || ''}\``);
            embed.setColor(client.config.colors.error);
            embed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL());
            return interaction.reply({ embeds: [nothing] });
        }
        if(!mentionMember) {
            embed.setDescription(`Missing arguments.\n\nUsage: \`${client.config.prefix}${path.basename(__filename).split('.')[0]}${' ' + config.usage || ''}\``);
            embed.setColor(client.config.colors.error);
            embed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL());
            return interaction.reply({ embeds: [nomentionEmbed] });
        }
        
        const kickEmbed = new MessageEmbed()
        .setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** <@${interaction.user.id}>\n**Action:** Kick\n**Reason:** ${reason}`)
        .setColor(client.config.colors.error)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

        let good = true

        try {
          await mentionMember.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.log(`I was unable to message the member.`);
        }
    try {
      await mentionMember.kick(`${args.slice(1).join(" ") ? `${interaction.user.tag} (${interaction.user.id}) Kicked this user with the following reason:\n${args.slice(1).join(" ")}` : `${interaction.user.tag} (${interaction.user.id}) Kicked this user with no reason.`}`)
      } catch (err) {
        console.log(err); good = false
      }

    if(good) {embed.setDescription(`**Success!** Kicked ${mentionMember.tag? mentionMember.tag : mentionMember.user.tag}!`).setColor(client.config.colors.success).setAuthor(interaction.user.tag, interaction.user.displayAvatarURL()).setTimestamp()} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
    interaction.reply({ embeds: [embed] })
    if(!good) return
    }
}