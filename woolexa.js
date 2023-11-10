// Discord
const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, StringSelectMenuBuilder, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
// İNTENTS
const client = new Client({ intents: Object.values(GatewayIntentBits), shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const config = require("./config.json");
//Database\\
const db = require("croxydb")

//Slash Commands Register\\

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    if(props.type == 2 || props.type == 3) {
        client.commands.push({
                name: props.name.toLowerCase(),
                type: props.type
        })
        
        } else {
        client.commands.push({
                name: props.name.toLowerCase(),
                description: props.description,
                options: props.options,
                dm_permission: false,
                type: props.type || 1
            });
        }

    console.log(`[Command] ${props.name} komutu yüklendi.`)

});

readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

process.on("unhandledRejection", (reason, p) => {
    console.log(" [Error] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [Error] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [Error] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});

//Oyun içi destek\\

client.on("interactionCreate", async interaction => {      
    if (interaction.values == 'ic') {

        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const günler = now.toLocaleDateString();

        const channel = await interaction.guild.channels.create({
            name: `│Oyun-İci-Destek│${interaction.user.username}`,
            type: Discord.ChannelType.GuildText,
            parent: config.TİCKETKATEGORİ,
            topic: `Hey ${interaction.user.username} Başarılı şekilde Oyun İçi Destek konusu ile destek talebi oluşturdun`,
            permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                },
                 {
                  id: interaction.user.id,
                  allow: [Discord.PermissionsBitField.Flags.ViewChannel,],
                },
                {
                 id: config.TİCKETYETKİLİ,
                 allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                },
              ],
          });

        db.set(`ticketChannelUser_${interaction.guild.id}${channel.id}`, { user: interaction.user.id })
        db.set(`ticketUser_${interaction.user.id}${interaction.guild.id}`, { whOpen: interaction.user.id, date: Date.now() })

        const ticketolusturdun = new EmbedBuilder()
                  .setAuthor({name: `ᴡᴏᴏʟᴇxᴀ ʀᴏʟᴇᴘʟᴀʏ - ᴅᴇsᴛᴇᴋ sɪsᴛᴇᴍɪ`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  .setDescription(`💚 » **ᴅᴇsᴛᴇᴋ ᴀᴄᴀɴ:** <@${interaction.user.id}>\n🧡 » **ᴅᴇsᴛᴇᴋ ᴋᴀɴᴀʟı:** ${channel}\n⏰ » **ᴛᴀʀɪʜ: ${günler} ${timeString}**`)
                  await interaction.reply({embeds: [ticketolusturdun], ephemeral: true})

    const destekynto = new ActionRowBuilder()

      .addComponents(
          new StringSelectMenuBuilder()
              .setCustomId(`destekyönet`)
              .setPlaceholder('ᴅᴇsᴛᴇᴋ ᴛᴀʟᴇʙɪ̇ɴᴇ ᴜʏɢᴜʟᴀᴍᴀᴋ ɪ̇sᴛᴇᴅɪ̇ɢ̆ɪ̇ɴɪ̇ᴢ ɪ̇şʟᴇᴍɪ̇ sᴇᴄ̧ɪ̇ɴ̧')
              .setMinValues(1)
              .setMaxValues(1)
              .addOptions([
                {
                    label: "Desteği kapat",
                    description: "Destek talebini mesajları kaydedip kapatır",
                    emoji: "❌",
                    value: "ickapa"
                },
              {
                label: "Destek Yedeği",
                description: "Destek yedeği al!",
                emoji: "💾",
                value: "destekydk"
            },
            {
                label: "Seçimi İptal Et",
                description: "Yapmış olduğun seçimi iptal et",
                emoji: "💥",
                value: "secimiptal"
            }
              ]));


        icticket = new EmbedBuilder()
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setTitle("**Oyun İçi destek talebi oluşturuldu**")
    .setDescription("```ansi\n[2;31mOyun İçi Destek destek talebini başarıyla oluşturdun[0m```\n```ansi\n[2;33mLütfen yetkili arkadaşlarımızı etiketleme zaten en kısa sürede geri dönüş sağlayacaklardır![0m```")
    .setFooter({text: "Developed By Woolexa"})
    .setTimestamp()

      await channel.send({embeds: [icticket], components: [destekynto]})
      await channel.send({content: `<@${interaction.user.id}>`}).then(x => setTimeout(() => x.delete(), 500));
}})

//Oyun dışı destek\\

client.on("interactionCreate", async interaction => {      
    if (interaction.values == 'occ') {

        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const günler = now.toLocaleDateString();

        const channel = await interaction.guild.channels.create({
            name: `│Oyun-Dısı-Destek│${interaction.user.username}`,
            type: Discord.ChannelType.GuildText,
            parent: config.TİCKETKATEGORİ,
            topic: `Hey ${interaction.user.username} Başarılı şekilde Oyun Dısı Destek konusu ile destek talebi oluşturdun`,
            permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                },
                 {
                  id: interaction.user.id,
                  allow: [Discord.PermissionsBitField.Flags.ViewChannel,],
                },
                {
                 id: config.TİCKETYETKİLİ,
                 allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                },
              ],
          });

        db.set(`ticketChannelUser_${interaction.guild.id}${channel.id}`, { user: interaction.user.id })
        db.set(`ticketUser_${interaction.user.id}${interaction.guild.id}`, { whOpen: interaction.user.id, date: Date.now() })

        const ticketolusturdun = new EmbedBuilder()
                  .setAuthor({name: `ᴡᴏᴏʟᴇxᴀ ʀᴏʟᴇᴘʟᴀʏ - ᴅᴇsᴛᴇᴋ sɪsᴛᴇᴍɪ`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  .setDescription(`💚 » **ᴅᴇsᴛᴇᴋ ᴀᴄᴀɴ:** <@${interaction.user.id}>\n🧡 » **ᴅᴇsᴛᴇᴋ ᴋᴀɴᴀʟı:** ${channel}\n⏰ » **ᴛᴀʀɪʜ: ${günler} ${timeString}**`)
                  await interaction.reply({embeds: [ticketolusturdun], ephemeral: true})

    const destekynto = new ActionRowBuilder()

      .addComponents(
          new StringSelectMenuBuilder()
              .setCustomId(`destekyönet`)
              .setPlaceholder('ᴅᴇsᴛᴇᴋ ᴛᴀʟᴇʙɪ̇ɴᴇ ᴜʏɢᴜʟᴀᴍᴀᴋ ɪ̇sᴛᴇᴅɪ̇ɢ̆ɪ̇ɴɪ̇ᴢ ɪ̇şʟᴇᴍɪ̇ sᴇᴄ̧ɪ̇ɴ̧')
              .setMinValues(1)
              .setMaxValues(1)
              .addOptions([
                {
                    label: "Desteği kapat",
                    description: "Destek talebini mesajları kaydedip kapatır",
                    emoji: "❌",
                    value: "occkapa"
                },
              {
                label: "Destek Yedeği",
                description: "Destek yedeği al!",
                emoji: "💾",
                value: "destekydk"
            },
            {
                label: "Seçimi İptal Et",
                description: "Yapmış olduğun seçimi iptal et",
                emoji: "💥",
                value: "secimiptal"
            }
              ]));


        icticket = new EmbedBuilder()
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setTitle("**Oyun Dışı destek talebi oluşturuldu**")
    .setDescription("```ansi\n[2;31mOyun Dışı Destek destek talebini başarıyla oluşturdun[0m```\n```ansi\n[2;33mLütfen yetkili arkadaşlarımızı etiketleme zaten en kısa sürede geri dönüş sağlayacaklardır![0m```")
    .setFooter({text: "Developed By Woolexa"})
    .setTimestamp()

      await channel.send({embeds: [icticket], components: [destekynto]})
      await channel.send({content: `<@${interaction.user.id}>`}).then(x => setTimeout(() => x.delete(), 500));
}})

//Genel sorun bildirimi vb.\\

client.on("interactionCreate", async interaction => {      
    if (interaction.values == 'genel') {

        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const günler = now.toLocaleDateString();

        const channel = await interaction.guild.channels.create({
            name: `│Genel-Sorunlar-Destek│${interaction.user.username}`,
            type: Discord.ChannelType.GuildText,
            parent: config.TİCKETKATEGORİ,
            topic: `Hey ${interaction.user.username} Başarılı şekilde Genel Sorunlar konusu ile destek talebi oluşturdun`,
            permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                },
                 {
                  id: interaction.user.id,
                  allow: [Discord.PermissionsBitField.Flags.ViewChannel,],
                },
                {
                 id: config.TİCKETYETKİLİ,
                 allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                },
              ],
          });

        db.set(`ticketChannelUser_${interaction.guild.id}${channel.id}`, { user: interaction.user.id })
        db.set(`ticketUser_${interaction.user.id}${interaction.guild.id}`, { whOpen: interaction.user.id, date: Date.now() })

        const ticketolusturdun = new EmbedBuilder()
                  .setAuthor({name: `ᴡᴏᴏʟᴇxᴀ ʀᴏʟᴇᴘʟᴀʏ - ᴅᴇsᴛᴇᴋ sɪsᴛᴇᴍɪ`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  .setDescription(`💚 » **ᴅᴇsᴛᴇᴋ ᴀᴄᴀɴ:** <@${interaction.user.id}>\n🧡 » **ᴅᴇsᴛᴇᴋ ᴋᴀɴᴀʟı:** ${channel}\n⏰ » **ᴛᴀʀɪʜ: ${günler} ${timeString}**`)
                  await interaction.reply({embeds: [ticketolusturdun], ephemeral: true})

    const destekynto = new ActionRowBuilder()

      .addComponents(
          new StringSelectMenuBuilder()
              .setCustomId(`destekyönet`)
              .setPlaceholder('ᴅᴇsᴛᴇᴋ ᴛᴀʟᴇʙɪ̇ɴᴇ ᴜʏɢᴜʟᴀᴍᴀᴋ ɪ̇sᴛᴇᴅɪ̇ɢ̆ɪ̇ɴɪ̇ᴢ ɪ̇şʟᴇᴍɪ̇ sᴇᴄ̧ɪ̇ɴ̧')
              .setMinValues(1)
              .setMaxValues(1)
              .addOptions([
                {
                    label: "Desteği kapat",
                    description: "Destek talebini mesajları kaydedip kapatır",
                    emoji: "❌",
                    value: "genelkapa"
                },
              {
                label: "Destek Yedeği",
                description: "Destek yedeği al!",
                emoji: "💾",
                value: "destekydk"
            },
            {
                label: "Seçimi İptal Et",
                description: "Yapmış olduğun seçimi iptal et",
                emoji: "💥",
                value: "secimiptal"
            }
              ]));


        icticket = new EmbedBuilder()
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setTitle("**Genel Sorunlar İçin destek talebi oluşturuldu**")
    .setDescription("```ansi\n[2;31mGenel Sorunlar için destek talebini başarıyla oluşturdun[0m```\n```ansi\n[2;33mLütfen yetkili arkadaşlarımızı etiketleme zaten en kısa sürede geri dönüş sağlayacaklardır![0m```")
    .setFooter({text: "Developed By Woolexa"})
    .setTimestamp()

      await channel.send({embeds: [icticket], components: [destekynto]})
      await channel.send({content: `<@${interaction.user.id}>`}).then(x => setTimeout(() => x.delete(), 500));
}})

client.on("interactionCreate", async interaction => {

    if (interaction.values == 'secimiptal') {
        woolexasecim = new EmbedBuilder()
        .setAuthor({name: `Seçim iptal edildi`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Hey yapmış olduğun seçimi iptal ettin`)
        .setTimestamp()
        await interaction.reply({embeds: [woolexasecim], ephemeral: true})
    }
    
    if (interaction.values == 'destekydk') {

    const chnl = db.fetch(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
    const x = chnl.user;

    const adam = await interaction.guild.members.cache.find(user => user.id === x);
    const usr = db.fetch(`ticketUser_${x}${interaction.guild.id}`);

            let mesaj = interaction.channel.messages.cache.map(x => `${x.author.tag} : ${x.content}`).join("\n")
            await interaction.reply({files: [{attachment: Buffer.from(mesaj) , name: `${usr.whOpen}-destek-talebi.txt`}], ephemeral: true})
    }

})

client.on("interactionCreate", async interaction => {

if (interaction.values == 'ickapa') {

    const chnl = db.fetch(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
    const x = chnl.user;

    const adam = await interaction.guild.members.cache.find(user => user.id === x);
    const usr = db.fetch(`ticketUser_${x}${interaction.guild.id}`);

    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const günler = now.toLocaleDateString();

    const logmesaj = new EmbedBuilder()
    .setAuthor({ name: `${adam.user.username}`, iconURL: adam.user.displayAvatarURL({ dynamic: true }) })
    .setTitle("**Bir Destek Talebi Kapatıldı!**")
    .setDescription(`🎫 **»** **Desteği kapatan yetkili**: <@${interaction.user.id}>\n\n💎 **»** **Desteği oluşturan kişi**: <@${usr.whOpen}>\n\n💢 **»** **Desteğin oluşturulma sebebi ↓**\n> ᴏʏᴜɴ ɪ̇ᴄ̧ɪ ᴅᴇsᴛᴇᴋ\n\n**Desteğin Oluşturulma Tarihi:** <t:${parseInt(usr.date / 1000)}:R> `)
    .setFooter({text: `Desteğin kapatılma saati » ${günler} ${timeString} `})
    .setThumbnail(`${adam.displayAvatarURL()}`)

    const destekkapatıldı = new EmbedBuilder()
    .setColor("DarkRed")
    .setTitle("Destek talebi kapatılıyor")
    .setDescription(`Destek talebi 5 saniye içerisinde silinecektir\nSilen Yetkili: <@${interaction.user.id}>`)
    .setTimestamp()
                                                  
  await interaction.reply({embeds: [destekkapatıldı], })
  let mesaj = interaction.channel.messages.cache.map(x => `${x.author.tag} : ${x.content}`).join("\n")
  await client.channels.cache.get(config.TİCKETLOG).send({embeds: [logmesaj]})
  await client.channels.cache.get(config.TİCKETLOG).send({files: [{attachment: Buffer.from(mesaj) , name: `${usr.whOpen}-destek-talebi.txt`}]})
  
interaction.channel.setName(`ᴅᴇsᴛᴇᴋ-ᴋᴀᴘᴀᴛıʟıʏᴏʀ`)

  setTimeout(() => {
    interaction.channel.delete();

  }, 5000);

  db.delete(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
  db.delete(`ticketUser_${x}${interaction.guild.id}`);
}
})

client.on("interactionCreate", async interaction => {

    if (interaction.values == 'occkapa') {
    
        const chnl = db.fetch(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
        const x = chnl.user;
    
        const adam = await interaction.guild.members.cache.find(user => user.id === x);
        const usr = db.fetch(`ticketUser_${x}${interaction.guild.id}`);
    
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const günler = now.toLocaleDateString();
    
        const logmesaj = new EmbedBuilder()
        .setAuthor({ name: `${adam.user.username}`, iconURL: adam.user.displayAvatarURL({ dynamic: true }) })
        .setTitle("**Bir Destek Talebi Kapatıldı!**")
        .setDescription(`🎫 **»** **Desteği kapatan yetkili**: <@${interaction.user.id}>\n\n💎 **»** **Desteği oluşturan kişi**: <@${usr.whOpen}>\n\n💢 **»** **Desteğin oluşturulma sebebi ↓**\n> ᴏʏᴜɴ ᴅışı ᴅᴇsᴛᴇᴋ\n\n**Desteğin Oluşturulma Tarihi:** <t:${parseInt(usr.date / 1000)}:R> `)
        .setFooter({text: `Desteğin kapatılma saati » ${günler} ${timeString} `})
        .setThumbnail(`${adam.displayAvatarURL()}`)
    
        const destekkapatıldı = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle("Destek talebi kapatılıyor")
        .setDescription(`Destek talebi 5 saniye içerisinde silinecektir\nSilen Yetkili: <@${interaction.user.id}>`)
        .setTimestamp()
                                                      
      await interaction.reply({embeds: [destekkapatıldı], })
      let mesaj = interaction.channel.messages.cache.map(x => `${x.author.tag} : ${x.content}`).join("\n")
      await client.channels.cache.get(config.TİCKETLOG).send({embeds: [logmesaj]})
      await client.channels.cache.get(config.TİCKETLOG).send({files: [{attachment: Buffer.from(mesaj) , name: `${usr.whOpen}-destek-talebi.txt`}]})
      
    interaction.channel.setName(`ᴅᴇsᴛᴇᴋ-ᴋᴀᴘᴀᴛıʟıʏᴏʀ`)
    
      setTimeout(() => {
        interaction.channel.delete();
    
      }, 5000);
    
      db.delete(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
      db.delete(`ticketUser_${x}${interaction.guild.id}`);
    }
})

client.on("interactionCreate", async interaction => {

    if (interaction.values == 'genelkapa') {
    
        const chnl = db.fetch(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
        const x = chnl.user;
    
        const adam = await interaction.guild.members.cache.find(user => user.id === x);
        const usr = db.fetch(`ticketUser_${x}${interaction.guild.id}`);
    
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const günler = now.toLocaleDateString();
    
        const logmesaj = new EmbedBuilder()
        .setAuthor({ name: `${adam.user.username}`, iconURL: adam.user.displayAvatarURL({ dynamic: true }) })
        .setTitle("**Bir Destek Talebi Kapatıldı!**")
        .setDescription(`🎫 **»** **Desteği kapatan yetkili**: <@${interaction.user.id}>\n\n💎 **»** **Desteği oluşturan kişi**: <@${usr.whOpen}>\n\n💢 **»** **Desteğin oluşturulma sebebi ↓**\n> ɢᴇɴᴇʟ sᴏʀᴜɴ ʙɪʟᴅɪʀɪᴍɪ\n\n**Desteğin Oluşturulma Tarihi:** <t:${parseInt(usr.date / 1000)}:R> `)
        .setFooter({text: `Desteğin kapatılma saati » ${günler} ${timeString} `})
        .setThumbnail(`${adam.displayAvatarURL()}`)
    
        const destekkapatıldı = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle("Destek talebi kapatılıyor")
        .setDescription(`Destek talebi 5 saniye içerisinde silinecektir\nSilen Yetkili: <@${interaction.user.id}>`)
        .setTimestamp()
                                                      
      await interaction.reply({embeds: [destekkapatıldı], })
      let mesaj = interaction.channel.messages.cache.map(x => `${x.author.tag} : ${x.content}`).join("\n")
      await client.channels.cache.get(config.TİCKETLOG).send({embeds: [logmesaj]})
      await client.channels.cache.get(config.TİCKETLOG).send({files: [{attachment: Buffer.from(mesaj) , name: `${usr.whOpen}-destek-talebi.txt`}]})
      
    interaction.channel.setName(`ᴅᴇsᴛᴇᴋ-ᴋᴀᴘᴀᴛıʟıʏᴏʀ`)
    
      setTimeout(() => {
        interaction.channel.delete();
    
      }, 5000);
    
      db.delete(`ticketChannelUser_${interaction.guild.id}${interaction.channel.id}`);
      db.delete(`ticketUser_${x}${interaction.guild.id}`);
    }
})

