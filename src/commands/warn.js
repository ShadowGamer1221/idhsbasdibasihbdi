const Discord = require('discord.js');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

const config = {
    description: 'Warns a member with a reason.',
    aliases: [],
    usage: '',
    rolesRequired: ['🛡️ Moderation Team', '🛡️ Administrator'],
    category: 'Moderation',
    slashOptions: [
        {
            type: 'USER',
            name: 'user',
            description: 'The member that oyu want to warn',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'What is the reason for warning this member?',
            required: true
        }
    ]
}

module.exports = {
 config,
 run: async (client, message, args) => {

   const nothing = message.member;


const nothingEmbed = new MessageEmbed()

.setDescription('You did not provide anyone to warn!')
.setColor(client.config.colors.error);

const embed = new MessageEmbed()

.setDescription('You cannot warn this person as they are not in the server!')
.setColor(client.config.colors.error);

  let member = message.mentions.members.first()
        if(!member && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!member && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {
          return message.reply({ embeds: [] })
        }
        if(!member) return message.reply({ embeds: [nothingEmbed] })
        if(!member) return message.reply({ embeds: [embed] })

const errorEmbed = new MessageEmbed()

.setDescription('Please enter a reason!')
.setColor(client.config.colors.error);

  const reason = args.slice(1).join(" ");
  if(!reason) return message.reply({ embeds: [errorEmbed] })

  const successEmbed = new MessageEmbed()

.setTitle('Success!')
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setColor(client.config.colors.success)
.setDescription(`Successfully warned ${member}!`)
.setTimestamp();

nothing.send({ embeds: [successEmbed] })
  
  let warnembed = new MessageEmbed()
  .setDescription(`**Server:** ${message.guild.name}\n**Actioned by:** <@${message.author.id}>\n**Action:** Warn\nReason: ${reason}`)
  .setColor(client.config.colors.error)
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
  
  member.send({ embeds: [warnembed] });

  if(client.config.logChannelId !== 'false') {
            let logEmbed = new Discord.MessageEmbed();
            let logChannel = await client.channels.fetch(client.config.logChannelId);
            logEmbed.setDescription(`**Moderator:** <@${message.author.id}> (\`${message.author.id}\`)\n**Action:** Warning\n**Warned:** ${member}\n**Reason:** ${reason}`);
            logEmbed.setColor(client.config.colors.info);
            logEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            logEmbed.setTimestamp();
            return logChannel.send({ embeds: [logEmbed] });
        } else {
            return;
        }
},

runInteraction: async (client, interaction, args) => {

const nothing = interaction.member;

  const nothingEmbed = new MessageEmbed()

.setDescription('You did not provide anyone to warn!')
.setColor(client.config.colors.error);

const embed = new MessageEmbed()

.setDescription('You cannot warn this person as they are not in the server!')
.setColor(client.config.colors.error);

  const member = interaction.options.getUser('user');
  console.log(member)
        if(!member && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!member && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {
          return interaction.reply({ embeds: [] })
        }
        if(!member) return interaction.reply({ embeds: [nothingEmbed] })
        if(!member) return interaction.reply({ embeds: [embed] })

const errorEmbed = new MessageEmbed()

.setDescription('Please enter a reason!')
.setColor(client.config.colors.error);

  const reason = args.slice(1).join(" ");
  if(!reason) return interaction.reply({ embeds: [errorEmbed] })

  const successEmbed = new MessageEmbed()

.setTitle('Success!')
.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
.setColor(client.config.colors.success)
.setDescription(`Successfully warned ${member}!`)
.setTimestamp();

nothing.send({ embeds: [successEmbed] })
  
  let warnembed = new MessageEmbed()
  .setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** <@${interaction.user.id}>\n**Action:** Warn\n**Reason:** ${reason}`)
  .setColor(client.config.colors.error)
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
  
  member.send({ embeds: [warnembed] });

  if(client.config.logChannelId !== 'false') {
            let logEmbed = new Discord.MessageEmbed();
            let logChannel = await client.channels.fetch(client.config.logChannelId);
            logEmbed.setDescription(`**Moderator:** <@${interaction.user.id}> (\`${interaction.user.id}\`)\n**Action:** Warning\n**Warned:** ${member}\n**Reason:** ${reason}`);
            logEmbed.setColor(client.config.colors.info);
            logEmbed.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL());
            logEmbed.setTimestamp();
            return logChannel.send({ embeds: [logEmbed] });
        } else {
            return;
        }
}
}