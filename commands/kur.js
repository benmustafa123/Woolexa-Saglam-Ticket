const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
const discord = require("discord.js")

module.exports = {
    name: "ticket-kur",
    description: "Ticket Kurulumu yapar",
    type: 1,


    run: async (client, interaction) => {



        const woolexaticketembed = new EmbedBuilder()
        .setColor("DarkerGrey")
        .setAuthor({name: "Woolexa Ticket Sistemi",})
        .setDescription("Merhabalar buraya gelmiş olma sebebin ticket oluşturmaktan başka hiçbir şey olamaz\n\nAşağıda **Ticket Oluştur** butonuna basarak ticket oluşturabilirsin!")
        .setFooter({text: "Developed By Woolexa"})
        .setTimestamp()

        const ticketselect = new ActionRowBuilder()

          .addComponents(
              new StringSelectMenuBuilder()
                  .setCustomId(`kategorisec`)
                  .setPlaceholder('🇩​🇪​🇸​🇹​🇪​🇰​ 🇦​🇱​🇲​🇦​🇰​ 🇮​̇🇸​🇹​🇪​🇩​🇮​̇🇬​̆🇮​̇🇳​ 🇰​🇴​🇳​🇺​🇾​🇺​ 🇸​🇪​🇨​̧')
                  .setMinValues(1)
                  .setMaxValues(1)
                  .addOptions([
                      {
                          label: "Oyun İçi Destek",
                          description: "Oyun içi destek almak istiyorsan bu kategoriyi seç",
                          emoji: "🎮",
                          value: "ic"
                      },
                      {
                        label: "Oyun Dışı Destek",
                        description: "Oyun dışı destek almak istiyorsan bu kategoriyi seç",
                        emoji: "🔎",
                        value: "occ"
                    },
                    {
                        label: "Genel Sorun Bildirimi VB.",
                        description: "Gennel soru bildirimi ve benzeri konularda destek almak için bu kategoriyi seç",
                        emoji: "⚙",
                        value: "genel"
                    },
                    {
                        label: "Seçimi İptal Et",
                        description: "Yapmış olduğun seçimi iptal et",
                        emoji: "💥",
                        value: "secimiptal"
                    }
                  ]));

         interaction.reply({ embeds: [woolexaticketembed], components: [ticketselect] });

 }
}