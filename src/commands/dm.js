const Discord = require('discord.js');
const discord = require('discord.js');
const path = require('path');
const { MessageEmbed } = require('discord.js');

const config = {
  description: 'DMs others using the bot.',
  aliases: [],
  usage: '<member> <message>',
  rolesRequired: ["E | DM Permissions"],
  category: 'Utility',
  slashOptions: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user that you want to dm.',
            required: true
        },
        {
          type: 'STRING',
          name: 'message',
          description: 'The message that you want to send to the user.',
          required: true
        }
    ]
}

module.exports = {
    config,
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor(client.config.colors.error).setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        let mention = message.mentions.members.first()
        if(!mention && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!mention && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {}
        if(!mention) {embed.setDescription("You did not provide anyone to DM!"); return message.reply({ embeds: [embed] })}
        if(!mention) {embed.setDescription("I cannot DM this person as they are not in the server!"); return message.reply({ embeds: [embed] })}
        const toSend = new MessageEmbed()
        .setTitle('You got a new Message:')
        .setColor(client.config.colors.success)
        .setDescription(args.slice(1).join(" "))
        .setTimestamp();
        if(!toSend) {embed.setDescription("You did not provide what to send!"); return message.reply({ embeds: [embed] })}
        let success = true
        try {
            await mention.send({ embeds: [toSend] })
        } catch (error) {
            success = false
        }


        if(success) {embed.setDescription("<a:ranked:847906614501441593> Successfully sent the DM!").setColor("GREEN")} else {embed.setDescription("That person does not have their DMs on!")}
        message.reply({ embeds: [embed] })
        if(!success) return
        if(client.config.logChannelId !== 'false') {
            let logEmbed = new Discord.MessageEmbed();
            let logChannel = await client.channels.fetch(client.config.logChannelId);
            logEmbed.setDescription(`**Moderator:** <@${message.author.id}> (\`${message.author.id}\`)\n**Action:** DM\n**User:** <@${mention.id}> (\`${mention.id}\`)\n**Message:** ${args.slice(1).join(" ")}`);
            logEmbed.setColor(client.config.colors.info);
            logEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            logEmbed.setTimestamp();
            logEmbed.setThumbnail(mention.user.displayAvatarURL({dynamic: true}));
            return logChannel.send({ embeds: [logEmbed] });
        } else {
            return;
        }
    },

    runInteraction: async (client, interaction, args) => {
      const embed = new MessageEmbed().setColor(client.config.colors.error)
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
        const mention = interaction.options.getUser('user');
        console.log(mention)
        if(!mention && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!mention && args[0] && isNaN(args[0])) try {mention = await interaction.guild.users.fetch({query: args[0], limit: 1})} catch (err) {}
        if(!mention) {embed.setDescription("You did not provide anyone to DM!"); return interaction.reply({ embeds: [embed] })}
        if(!mention) {embed.setDescription("I cannot DM this person as they are not in the server!"); return interaction.reply({ embeds: [embed] })}
        const toSend = new MessageEmbed() 
      .setTitle('You got a new Message:')
      .setColor(client.config.colors.success)
      .setDescription(args.slice(1).join(" "))
      .setTimestamp();
        
        if(!toSend) {embed.setDescription("You did not provide what to send!"); return interaction.reply({ embeds: [embed] })}
        let success = true
        try {
            await mention.send({ embeds: [toSend] })
        } catch (error) {
            success = false
        }


        if(success) {embed.setDescription("<a:ranked:847906614501441593> Successfully sent the DM!").setColor("GREEN")} else {embed.setDescription("That person does not have their DMs on!")}
        interaction.reply({ embeds: [embed] })
        if(!success) return
        if(client.config.logChannelId !== 'false') {
            let logEmbed = new Discord.MessageEmbed();
            let logChannel = await client.channels.fetch(client.config.logChannelId);
            logEmbed.setDescription(`**Moderator:** <@${interaction.user.id}> (\`${interaction.user.id}\`)\n**Action:** DM\n**User:** <@${mention.id}> (\`${mention.id}\`)\n**Message:** ${args.slice(1).join(" ")}`);
            logEmbed.setColor(client.config.colors.info);
            logEmbed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL());
            logEmbed.setTimestamp();
            logEmbed.setThumbnail(mention.displayAvatarURL({dynamic: true}));
            return logChannel.send({ embeds: [logEmbed] });
        } else {
            return;
        }
    }
}