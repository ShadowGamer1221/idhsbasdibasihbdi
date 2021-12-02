const discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

const config = {
    description: 'Sends the uptime of the bot.',
    aliases: [],
    usage: '',
    rolesRequired: [],
    category: 'Utility',
    slashOptions: []
}

module.exports = {
    config,
    run: async (client, message, args) => {
        const days = Math.floor(client.uptime / 86400000 );
        const hours = Math.floor(client.uptime / 3600000 ) % 24;
        const minutes = Math.floor(client.uptime / 60000 ) % 60;
        const seconds = Math.floor(client.uptime / 1000 ) % 60;
        const embed = new MessageEmbed()
    .setTitle('Uptime')
    .setDescription(`${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`)
    .setColor(client.config.colors.success)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTimestamp();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: true }  });
    },

    runInteraction: async (client, interaction, args) => {
        const days = Math.floor(client.uptime / 86400000 );
        const hours = Math.floor(client.uptime / 3600000 ) % 24;
        const minutes = Math.floor(client.uptime / 60000 ) % 60;
        const seconds = Math.floor(client.uptime / 1000 ) % 60;
        const embed = new MessageEmbed()
    .setTitle('Uptime')
    .setDescription(`${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`)
    .setColor(client.config.colors.success)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setTimestamp();
        interaction.reply({ embeds: [embed]});
    }
  }