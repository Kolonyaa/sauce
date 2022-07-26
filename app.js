//IMPORTS
import { resolveExport, updateInteractionExport, datastoreGuildExport, newGuildEmbedRow, newGuildEmbed, newSauceEmbedRow, displayFunctionExport, runCollectorExport, iterateDatastoreExport, collectorExport } from './functions.js';
import { client } from './functions.js';
import 'dotenv/config'

//COLLECTOR [0] [1] [3] [4]
export let currentCollector

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INTERACTION EVENT [0] [1] [2]
client.on('interactionCreate', async interaction => {
    //BE ABLE TO UPDATE
    await interaction.deferUpdate()

    if (interaction.customId === 'newGuild' && interaction.isSelectMenu()) {
        //VARIABLES
        let authorName
        let guildDatastoreChannel
        //SWITCH CASE
        switch (interaction.values[0]) {
            case "0":
                authorName = '• • •  Please select a channel ID to copy the embed to ! !'
                break;
            case "1":
                authorName = '• • •  Please select a channel ID to set the sauce to ! !'
                guildDatastoreChannel = '998341793231941632'
                break;
            case "2":
                guildDatastoreChannel = '998341859246084106'
                break;
            case "3":
                authorName = '• • •  Please provide an attachment below ! !'
                break;
            case "4":
                authorName = '• • •  Please provide an username below ! !'
                break;
            default:
                break;
        }
        //GET DATASTORE CHANNEL FROM CACHE
        const channel = datastoreGuildExport(guildDatastoreChannel)

        //AVOID COLLECTOR DUPLICATES, STOP THEM
        if (currentCollector) await currentCollector.stop()

        //CHOICES [0] [1] [3] [4]
        if (interaction.values[0] === "0" || interaction.values[0] === "1" || interaction.values[0] === "3" || interaction.values[0] === "4") {
            //ASSIGN NEW COLLECTOR
            currentCollector = await collectorExport(interaction)
            //RUN THE COLLECTOR
            runCollectorExport(currentCollector, interaction, channel, authorName)
        }

        //CHOICES [2]
        if (interaction.values[0] === "2") iterateDatastoreExport(interaction, channel)

        //CHOICES [-1]
        if (interaction.values[0] === "-1") {
            //ITERATE
            const displayFunction = async (inputID) => {
                const channel = datastoreGuildExport(inputID)
                const dataStoreMessages = await channel.messages.fetch({
                    limit: 100
                })

                let channelID
                for await (const message of dataStoreMessages) {
                    message.forEach(value => {
                        if (!value.content) return
                        const array = value.content.split(',')
                        if (array[0] === interaction.guild.id) {
                            if (inputID === '998341793231941632') {
                                channelID = array[1]
                            } else {
                                channelID = array[0]
                            }
                        }
                    })
                }
                return channelID
            }

            //GET STATE
            const displayEmote = interaction.guild.emojis.cache.find(emoji => emoji.name.includes('sauce'));
            const displayChannelID = await displayFunctionExport(interaction, '998341793231941632')
            const displaySauceDMState = await displayFunctionExport(interaction, '998341859246084106')

            //TEXT
            const description = `• • • **current emote** ${displayEmote ? displayEmote : "none"}\n• • • **current set channel** ${displayChannelID ? '<#' + displayChannelID + '>' : "none"}\n• • • **sauce via DMs?** ${displaySauceDMState ? '``true``' : '``false``'}\n\n•  **Create** emote '\`\`sauce\`\`'\n•  **Set** sauce channel (\`\`NSFW\`\`!)\n•  **Toggle** sauce via DMs\n• **React** with sauce emote, get sauce`

            updateInteractionExport(interaction, `• • sauce Transparency`, 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-11.gif', description)
        }
    }


    if (interaction.customId === 'newSauce') {
        console.log(interaction)


        //interaction.editReply({ components: [] })






    }
})

//READY EVENT
client.once('ready', async () => { 
    console.log("ok we pull up")
    client.user.setActivity('be gentle ~ (ノ▽〃)', { type: 'STREAMING' })
    
    const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(Guilds);
})

//GUILD JOIN EVENT
client.on("guildCreate", guild => {
    console.log(guild.name)
    let found = 0;
    guild.channels.cache.map((channel) => {
        if (found === 0 && channel.type === "GUILD_TEXT") {
            if (channel.permissionsFor(client.user).has("VIEW_CHANNEL") === true && channel.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                found = 1;
                channel.send({ embeds: [newGuildEmbed], components: [newGuildEmbedRow] }).catch(() => {});
            }
        }
    });
})

//GUILD LEAVE EVENT
client.on("guildDelete", guild => {
    //ALL DATASTORES IN GUILD
    const dataStores = ['998341793231941632', '998341859246084106']

    //ITERATE AND DELETE IF FOUND
    dataStores.forEach(async datastoreId => {
        const channel = datastoreGuildExport(datastoreId)
        await channel.messages
        .fetch({ limit: 100 })
        .then(mAll => mAll.forEach(m => {
            const array = m.content.split(',')
            if(array[0] === guild.id) {
                m.delete().then(() => console.log(`Successfully found & deleted '${guild.name}' from ${datastoreId}`))
            }
        }))
    })
})

//REACTION EVENT

client.on('messageReactionAdd', (messageReaction, user) => {
    if(messageReaction.emoji.name.includes("sauce")) {
        let interval = 1500
        let increment = 1
        messageReaction.message.attachments.forEach(async att => {
            setTimeout(async () => { 

                //GET CHANNEL ID DATASTORE
                const logChannel = datastoreGuildExport("998341793231941632")

                //GET REACTION COUNT OF SAUCE EMOTE
                const sauceEmoteCount = messageReaction.message.reactions.cache.find(reaction => reaction.emoji.name == messageReaction.emoji.name).count
            
                //CHECK FOR DATASTORE
                let found
                await logChannel.messages
                .fetch({ limit: 100 })
                .then(mAll => mAll.forEach(async m => {
                    //TURN EACH MESSAGE TO ARRAY
                    const array = m.content.split(',')
                    //IF FOUND, RETURN
                    if(array[0] === messageReaction.message.guildId) {
                        found = true
                        return resolveExport(array[1], messageReaction, sauceEmoteCount, att, user)
                    }
                }))
                
                //IF NO RESULTS
                if(!found) return resolveExport(messageReaction.message.channelId, messageReaction, sauceEmoteCount, att, user)

            }, interval * increment)
            increment = increment + 1;
        })
    }
})

//MESSAGE EVENT
client.on('messageCreate', (message) => {
    if(message.author.bot || message.channel.type === 'DM') return
    if(message.content === '<@997252470097051741>' && (message.member.permissions.has("ADMINISTRATOR") || message.author.id === '991382822814220309')) return message.channel.send({ embeds: [newGuildEmbed], components: [newGuildEmbedRow] }).catch(() => {});
});

//LOGIN
client.login(process.env.CLIENT_TOKEN)