const discord = require('discord.js');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')


const config = {
    description: 'Sends your avatar or the mentioned member\'s avatar.',
    aliases: [],
    usage: '[member]',
    rolesRequired: [],
    category: 'Utility',
    slashOptions: [
        {
            type: 'USER',
            name: 'username',
            description: 'Gets a user avatar.',
            required: false
        }
    ]
}
  
module.exports = {
    config,
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || message.author;
        console.log(target)

        const response = new MessageEmbed()
        .setColor('BLACK')
        .setTitle('Avatar')
        .setAuthor(target.tag)
        .setImage(target.displayAvatarURL({dynamic: true, size: 256}))

        message.reply({ embeds: [response] });
    },

    runInteraction: async (client, interaction, args) => {

      let embed = new Discord.MessageEmbed();

      const target = interaction.options.getMember('username');
      console.log(target)

      if(!target) {
        embed.setColor('#23272A');
        embed.setTitle('Avatar');
        embed.setAuthor(interaction.user.tag);
        embed.setImage(interaction.user.displayAvatarURL({dynamic: true, size: 256}));

        return interaction.reply({ embeds: [embed] });
      }
        
        embed.setColor('#23272A');
        embed.setTitle('Avatar');
        embed.setAuthor(target.user.tag);
        embed.setImage(target.displayAvatarURL({dynamic: true, size: 256}));
        interaction.reply({ embeds: [embed] });
    }
}