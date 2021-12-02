const { MessageEmbed } = require("discord.js")
const discord = require('discord.js');
const path = require('path');

const config = {
    description: 'Ban\'s the mentioned member with the reason if provided.',
    aliases: ['b'],
    usage: '<member> [reason]',
    rolesRequired: ['E | Kick Permissions'],
    category: 'Moderation',
    slashOptions: [
        {
            type: 'USER',
            name: 'username',
            description: 'The username or user id that you want to ban.',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'Reason for banning the user.',
            required: true
        }
    ]
}

module.exports = {
    config,
    run: async (client, message, args) => {

    const nothing = new MessageEmbed()
    .setTitle('Please mention the user')
    .setDescription('You need to state a user to ban.')
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
        .setDescription(`**Server:** ${message.guild.name}\n**Actioned by:** <@${message.author.id}>\n**Action:** Ban\n**Reason:** ${reason}`)
        .setColor(client.config.colors.error)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

        let good = true

        try {
          await mentionMember.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.log(`I was unable to message the member.`);
        }

    const guild = message.guild;

    try {
      await guild.members.ban(mentionMember)
      } catch (err) {
        console.log(err); good = false
      }

    if(good) {embed.setDescription(`**Success!** Banned ${mentionMember.tag? mentionMember.tag : mentionMember.user.tag}!`).setColor(client.config.colors.success).setAuthor(message.author.tag, message.author.displayAvatarURL()).setTimestamp()} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
    message.reply({ embeds: [embed] })
    if(!good) return
    },

    runInteraction: async (client, interaction, args) => {
      const nothing = new MessageEmbed()
    .setTitle('Please mention the user')
    .setDescription('You need to state a user to ban.')
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
    

        const mentionMember = interaction.options.getUser('username');
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
        .setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** <@${interaction.user.id}>\n**Action:** Ban\n**Reason:** ${reason}`)
        .setColor(client.config.colors.error)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

        let good = true

       const guild = interaction.guild;

        try {
          await mentionMember.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.log(`I was unable to message the member.`);
        }
    try {
      await guild.members.ban(mentionMember)
      } catch (err) {
        console.log(err); good = false
      }

    if(good) {embed.setDescription(`**Success!** Banned ${mentionMember.tag? mentionMember.tag : mentionMember.user.tag}!`).setColor(client.config.colors.success).setAuthor(interaction.user.tag, interaction.user.displayAvatarURL()).setTimestamp()} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
    interaction.reply({ embeds: [embed] })
    if(!good) return
    }
}