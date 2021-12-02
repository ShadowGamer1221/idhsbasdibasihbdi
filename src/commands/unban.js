const { MessageEmbed } = require("discord.js")
const discord = require('discord.js');
const path = require('path');

const config = {
    description: 'Unban\'s the mentioned member with the reason if provided.',
    aliases: ['b'],
    usage: '<member> [reason]',
    rolesRequired: ['E | Kick Permissions'],
    category: 'Moderation',
    slashOptions: [
        {
            type: 'STRING',
            name: 'username',
            description: 'The username or user id that you want to unban.',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'Reason for unbanning the user.',
            required: true
        }
    ]
}

module.exports = {
    config,
    run: async (client, message, args) => {

    const nothing = new MessageEmbed()
    .setTitle('Please enter the user ID')
    .setDescription('You need to state a user ID to unban.')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

    const nomentionEmbed = new MessageEmbed()
    .setTitle('Error')
    .setDescription('I did not found that user ID.')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

     let embed = new MessageEmbed();
    

        const mentionMember = args[0];

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
        .setDescription(`**Server:** ${message.guild.name}\n**Actioned by:** <@${message.author.id}>\n**Action:** Unban`)
        .setColor(client.config.colors.error)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

        let good = true


    const guild = message.guild;

    try {
      await guild.members.unban(mentionMember)
      } catch (err) {
        console.log(err); good = false
      }

          try {
          await mentionMember.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.log(`I was unable to message the member.`);
        }

    if(good) {embed.setDescription(`**Success!** Unbanned the user!`).setColor(client.config.colors.success).setAuthor(message.author.tag, message.author.displayAvatarURL()).setTimestamp()} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
    message.reply({ embeds: [embed] })
    if(!good) return
    },

    runInteraction: async (client, interaction, args) => {
      const nothing = new MessageEmbed()
    .setTitle('Please enter the user ID')
    .setDescription('You need to state a user to unban.')
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

    const nomentionEmbed = new MessageEmbed()
    .setTitle('Error')
    .setDescription('I did not found the user ID.')
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setColor(client.config.colors.error)
    .setTimestamp();

     let embed = new MessageEmbed();
    

        const mentionMember = interaction.options.get('username')?.value;
        console.log(mentionMember)

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
        .setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** <@${interaction.user.id}>\n**Action:** Unban`)
        .setColor(client.config.colors.error)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

        let good = true

       const guild = interaction.guild;

    try {
      await guild.members.unban(mentionMember)
      } catch (err) {
        console.log(err); good = false
      }

          try {
          await mentionMember.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.log(`I was unable to message the member.`);
        }

    if(good) {embed.setDescription(`**Success!** Banned ${mentionMember.tag? mentionMember.tag : mentionMember.user.tag}!`).setColor(client.config.colors.success).setAuthor(interaction.user.tag, interaction.user.displayAvatarURL()).setTimestamp()} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
    interaction.reply({ embeds: [embed] })
    if(!good) return
    }
}