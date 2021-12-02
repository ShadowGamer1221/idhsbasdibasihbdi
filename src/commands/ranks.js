const roblox = require("noblox.js");
const Discord = require("discord.js");
require('dotenv').config();

const config = {
    description: 'Returns a list of all ranks in the Roblox Group.',
    aliases: ['rank-list'],
    usage: '',
    rolesRequired: [],
    category: 'Ranking',
    slashOptions: []
}

module.exports = {
  config,

  run: async (client, message, args) => {
    const getRoles = await roblox.getRoles(Number(client.config.groupId))
    const formattedRoles = getRoles.map((r) => `\`${r.name}\` - **\(${r.rank})\**`).join('\n');

    const rankListEmbed = new Discord.MessageEmbed() 
      .setTitle('Eastside RankIDs:')
      .setColor(client.config.colors.success)
      .setDescription(formattedRoles.toString())
      .setFooter(``);
    message.reply({ embeds: [rankListEmbed] });
  },
  
  runInteraction: async (client, interaction, args) => {
    const getRoles = await roblox.getRoles(Number(client.config.groupId))
    const formattedRoles = getRoles.map((r) => `\`${r.name}\` - **\(${r.rank})\**`).join('\n');

    const rankListEmbed = new Discord.MessageEmbed() 
      .setTitle('Eastside RankIDs:')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
      .setColor(client.config.colors.success)
      .setDescription(formattedRoles.toString())
      .setFooter(``);
    interaction.reply({ embeds: [rankListEmbed] });
  }
}