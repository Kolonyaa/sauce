//IMPORTS
import axios from 'axios';
import jsdom from 'jsdom';
import { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { currentCollector } from './app.js';

//import hastebin from 'hastebin'
/* const hastebinUrl = await hastebin.createPaste('aGkgRVBJQyMwNzI3', { raw: true, contentType: 'text/plain', server: 'https://hastebin.com' })
console.log(hastebinUrl) */
/* const websiteData = await axios.get(hastebinUrl)
console.log(websiteData.data)  */


/* import { encryptString, decryptString } from '@gykh/caesar-cipher'
const encrypted = encryptString('https://hastebin.com/raw/ufaqajewik', 3);
const decrypted = decryptString(encrypted, 3);
console.log(encrypted)
console.log(decrypted)
 */



//GET DATASTORE GUILD [0] [1] [2]
export const datastoreGuildExport = (guildDatastoreChannel) => client.guilds.cache.get("998035141106602055").channels.cache.find(c => c.id === guildDatastoreChannel)

//FILTER [0] [1] [3] [4]
const filter = (i) => i.author.id && i.member.permissions.has("ADMINISTRATOR") 

//SET CURRENT COLLECTOR [0] [1] [3] [4]
export const collectorExport = (interaction) => interaction.message.channel.createMessageCollector({ filter, max: 1, time: 45000 })

//FIND CHANNEL FOR SELECTION COPY [0]
const getSelectionChannel = (interaction, inputID) => interaction.guild.channels.cache.find(channel => channel.id === inputID.content)

//VARIABLES
export const intents = new Intents([
    "GUILDS",
    "GUILD_MEMBERS",
    "DIRECT_MESSAGES",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGE_REACTIONS"
]);
export const client = new Client({
    disableEveryone: false,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
    intents
});
const { JSDOM } = jsdom;

//EMBED TEMPLATE
export const newGuildEmbed = new MessageEmbed()
.setColor('#2f3136')
.setAuthor({ 
    name: '• • sauce', 
    iconURL: 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-09-1.gif', 
    url: 'https://discord.gg/gz3qWV3Cjc' 
})
.setThumbnail('https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-10.gif')
.setDescription('• • •  **By**\n• • •  **Kolonya**\n• • •  **#6419**')
.addFields({ 
    name: 'Details', 
    value: '• • •  Staff only\n• • •  Alpha Version\n• • •  Gelbooru IQDB' 
})

//DEFINE EMBED ROW [0] [1] [2]
export const newGuildEmbedRow = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId('newGuild')
	.setPlaceholder('Staff Only')
	.addOptions([
        {
            label: 'Tutorial',
			description: 'Transparency on the usage',
			value: '-1',
        },
        {
            label: 'Selection Embed',
			description: 'Create a copy of the selection embed',
			value: '0',
        },
        {
			label: 'Sauce Channel',
			description: 'All sauce will appear in here',
			value: '1',
        },
        {
			label: 'Sauce DMs',
			description: 'Allow guild members to receive sauce via DMs',
			value: '2',
        },
        {
			label: 'Bot Icon [ WHITELIST REQUIRED ]',
			description: 'Set the bot icon via attachment provided',
			value: '3',
        },
        {
			label: 'Bot Name [ WHITELIST REQUIRED ]',
			description: 'Set the bot name via content provided',
			value: '4',
        }
    ]),
);

//DEFINE SAUCE ROW
export const newSauceEmbedRow = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId('newSauce')
	.setPlaceholder('More details')
	.addOptions([
        {
            label: 'Gelbooru',
			description: 'View more sauce details',
			value: '0',
        },
        {
            label: 'Yande.re',
			description: 'View more sauce details',
			value: '1',
        }
    ]),
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const displayFunctionExport = async (interaction, inputID) => {
    const channel = datastoreGuildExport(inputID)
    const dataStoreMessages = await channel.messages.fetch({ limit: 100 })

    let channelID
    for await (const message of dataStoreMessages) {
        message.forEach(value => {
            if(!value.content) return
            const array = value.content.split(',')
            if(array[0] === interaction.guild.id) {
                inputID === '998341793231941632' ? channelID = array[1] : channelID = array[0]
            }
        })
    }
    return channelID
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//RESOLVE
export const resolveExport = async (channelID, messageReaction, sauceEmoteCount, att, user) => {
    //GET CHANNEL
    const channel = client.guilds.cache.get(messageReaction.message.guildId).channels.cache.find(channel => channel.id === channelID)

    //CHECK IF CHANNEL IS FOUND
    if(!channel) return updateInteractionExport(channel, '• • • Channel seems to no longer exist ! ! ! ', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-01.gif', null, true, null, null);

    //CHECK IF DUPLICATE
    if(sauceEmoteCount > 1) return

    //CHECK IF NOT NSFW
    if(!channel.nsfw) return updateInteractionExport(channel, '• • • Channel is required to be NSFW ! ! ', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-05.gif', null, true, null, null);

    //CHECK IF MESSAGE CONTAINS .webp
    if(att.url.includes('webp')) return updateInteractionExport(channel, '• • •  .webp is currently not supported ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-01.gif', null, true, null, null)

    //START SAUCE PRROCESS
    return searchSauce(att.url, channel)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//RUN COLLECTOR FOR [0] [1] [3] [4]
export const runCollectorExport = async (collector, interaction, channel, authorName) => {
    //CHECK FOR PERMISSION
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return updateInteractionExport(interaction, '• • •  No administrator ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-14.gif');

    //CHECK FOR GUILD WHITELIST FOR [3] & [4] (Oppai, Marisa, Sauce Support, test place)
    const guildWhitelist = ['937589134082601031', '942045111901114408', '998035141106602055','996248474175668275']
    const checkGuildId = (guildId) => guildWhitelist.includes(guildId)
    const condition = checkGuildId(interaction.guild.id)
    if((interaction.values[0] === "3" || interaction.values[0] === "4") && !condition) return updateInteractionExport(interaction, '• • • This guild is not whitelisted ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-14.gif')

    //OTHERWISE, UPDATE EMBED, THEN WAIT FOR COLLECTOR
    await updateInteractionExport(interaction, authorName)
    collector.on('collect', async input => {    
        //SET BOT ICON [3]
        if(interaction.values[0] === "3") {
            if(!interaction.attachments) return updateInteractionExport(interaction, '• • • Invalid attachment provided ! !', 'https://gifimage.net/wp-content/uploads/2018/10/anime-emote-gif-1.gif')
            return await input.attachments.forEach(inputAttachment => {
                client.user
                .setAvatar(inputAttachment.url)
                .then(() => {
                    updateInteractionExport(interaction, '• • • Successfully set bot icon ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-09.gif');
                })
                .catch(err => console.log(err.message))
            })
        }

        //SET BOT NAME [4]
        if(interaction.values[0] === "4") {
            return await client.user
            .setUsername(input.content)
            .then(() => {
                updateInteractionExport(interaction, '• • • Successfully set bot name ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-09.gif');
            })
            .catch((err) => {
                if(err.message.includes('too fast')) return updateInteractionExport(interaction, '• • • Please try again later, limit reached ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-01.gif'); 

                updateInteractionExport(interaction, '• • • Too many bots have this username, try another ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-01.gif');
            })
        }

        //CHECK IF GUILD ID FROM COLLECTOR VALID
        if(!interaction.guild.channels.cache.find(channel => channel.id === input.content)) 
        return updateInteractionExport(interaction, '• • • Invalid channel ID ! !', 'https://gifimage.net/wp-content/uploads/2018/10/anime-emote-gif-1.gif');

        //PROCEED 
        iterateDatastoreExport(interaction, channel, input)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ITERATE DATASTORE [0] [1]
export const iterateDatastoreExport = async (interaction, channel, inputID) => {
    //CHECK FOR PERMISSION
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return updateInteractionExport(interaction, '• • •  No administrator ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-14.gif');

    //VARIABLES
    let guildFound;
    //IF [0]
    if(interaction.values[0] === "0") {
        const selectionChannel = getSelectionChannel(interaction, inputID)
        return selectionChannel
        .send({ 
            embeds: [newGuildEmbed], components: [newGuildEmbedRow] 
        })
        .then(() => {
            updateInteractionExport(interaction, '• • •  Successfully copied embed ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-15.gif');
        })
        .catch(() => {
            updateInteractionExport(interaction, `• • •  I can't access that channel . .`, 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-01.gif');
        })
    }

    //IF [1] [2]
    await channel.messages
    .fetch({ limit: 100 })
    .then(mAll => mAll.forEach(m => {
        //TURN EACH MESSAGE TO ARRAY
        const array = m.content.split(',')
        //IF FOUND, RETURN
        if(array[0] === interaction.guild.id) {
            guildFound = true
            m.delete().then(() => {
                if(interaction.values[0] === "2") {
                    updateInteractionExport(interaction, '• • •  Successfully disabled sauce DMs ! !', 'https://i.pinimg.com/originals/a3/2f/2e/a32f2e3cfd330aa194140b97dd16bbd5.gif');
                    return guildFound
                } else {
                    channel.send(`${interaction.guild.id},${inputID}`)
                    updateInteractionExport(interaction, '• • •  Successfully updated sauce channel ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-06.gif');
                    return guildFound
                }
            })
        }
    })) 
    //IF GUILD ID NOT FOUND IN DATASTORE
    if(!guildFound) { 
        channel.send(interaction.values[0] === "2" ? `${interaction.guild.id}` : `${interaction.guild.id},${inputID.content}`)
        updateInteractionExport(interaction, interaction.values[0] === "2" ? '• • •  Successfully enabled sauce DMs ! !' : '• • •  Successfully set sauce channel ! !', 'https://gifimage.net/wp-content/uploads/2018/10/anime-emote-gif-8.gif') 
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SEARCH SAUCE FUNCTION
const searchSauce = async (attUrl, channel) => {
    //DEFINE GLOBAL METHODS METHOD
    const gelbooruWebUrlSettings = 'https://gelbooru.iqdb.org/'
    const yandereWebUrlSettings = 'https://yandere.iqdb.org/'
    const globalUrlSettings = attUrl
    const globalNumberSettings = 6969696969
    const globalDataSettings = `-----------------------------${globalNumberSettings}\nContent-Disposition: form-data; name="MAX_FILE_SIZE"\n\n8388608\n-----------------------------${globalNumberSettings}\nContent-Disposition: form-data; name="file"; filename=""\nContent-Type: application/octet-stream\n\n\n-----------------------------${globalNumberSettings}\nContent-Disposition: form-data; name="url"\n\n${globalUrlSettings}\n-----------------------------${globalNumberSettings}--`
    const globalConfigSettings = { headers: { 'Content-Type': `multipart/form-data; boundary=---------------------------${globalNumberSettings}` }, }

    //GET THE DATA
    async function getWebData(WebUrlSettings, globalDataSettings, globalConfigSettings) {
        //GELBOORU POST METHOD
        const res = await axios
        .post(WebUrlSettings, globalDataSettings, globalConfigSettings)
        .then( async (res) => {
            const dom = new JSDOM(res.data);
            try {
                //FUNDAMENTAL FOR FIRST RESULT
                const t = dom.window.document.getElementsByTagName("table")[1]
                const d = t.getElementsByTagName("tr")[3]
                const d2 = t.getElementsByTagName("tr")[1]
                const imgTitle = d2.getElementsByTagName('img')[0].alt

                //FUNDAMENTAL FOR IMAGE URL
                const globalGetWebUrl = d2.getElementsByTagName("a")[0].getAttribute("href")
                let urlList = [];
                const websiteData = await axios.get(globalGetWebUrl)
                const websiteDom = new JSDOM(websiteData.data);
                const allLinks = websiteDom.window.document.getElementsByTagName("a")
                for (let i=0; i<allLinks.length; i++) urlList.push(allLinks[i].getAttribute("href"))
            
                //GET ARGUMENTS
                const globalSimilarity = d.getElementsByTagName("td")[0].innerHTML
                const globalRating = imgTitle.split(' ')[1] === 'g' ? 'general' : imgTitle.split(' ')[1] === 's' ? 'safe' : imgTitle.split(' ')[1] === 'q' ? 'questionable' : imgTitle.split(' ')[1] === 'e' ? 'explicit' : null
                const globalLoliCondition = d2.innerHTML.includes('loli')
                const globalAllTags = `\`\`${imgTitle.split(' ').slice(5).join(" ")}\`\``

                //GET GELBOORU, YANDERE IMAGE
                let globalGetImageUrl
                if(WebUrlSettings.includes('gelbooru')) globalGetImageUrl = urlList.find(url => url.includes('img3.gelbooru.com') || url.includes('img1.gelbooru.com')).replace('//iqdb.org/?url=','')
                if(WebUrlSettings.includes('yandere')) globalGetImageUrl = urlList.find(url => url.includes('files.yande.re'))

                //RETURN
                return {
                    globalSimilarity: globalSimilarity,
                    globalRating: globalRating,
                    globalLoliCondition: globalLoliCondition,
                    globalAllTags: globalAllTags,
                    globalGetImageUrl: globalGetImageUrl,
                    globalGetWebUrl: globalGetWebUrl
                }
            } catch (err) {
                console.log(err.message)
                return false
            } 
        })
        .catch((err) => {
            console.log(err.message)
            return 'ECONNRESET'
        })

        //RETURN THE WHOLE METHOD DATA ABOVE
        return res  
    }

    //DO THE ALL TASKS
    async function sauceTasks() {
        //GELBOORU PROCESS
        const processEmbed = await updateInteractionExport(channel, '• • • Gelbooru processing . . .', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-13-1.gif', null, true);

        //GET, ENCODE, UPLOAD GELBOORU OBJECT
        const gelObject = await getWebData(gelbooruWebUrlSettings, globalDataSettings, globalConfigSettings)
        /* const gelencoded = Buffer.from(JSON.stringify(gelObject)).toString("base64");
        const gelHastebinUrl = await hastebin.createPaste(gelencoded, { raw: true, contentType: 'text/plain', server: 'https://hastebin.com' }) */

        //YANDERE PROCESS
        await updateInteractionExport(processEmbed, '• • • Yande.re processing . . .', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-13-1.gif', null, true);

        //GET, ENCODE, UPLOAD YANDERE OBJECT
        const yanObject = await getWebData(yandereWebUrlSettings, globalDataSettings, globalConfigSettings)
        /* const yanencoded = Buffer.from(JSON.stringify(yanObject)).toString("base64");
        const yanHastebinUrl = await hastebin.createPaste(yanencoded, { raw: true, contentType: 'text/plain', server: 'https://hastebin.com' }) */

        console.log(gelObject)
        console.log(yanObject)


        //SEND ALL BOORU OBJECTS OVER TO EVALUATION
        await evaluateEmbed(gelObject, yanObject, processEmbed)
    }

    //EVALUATE THE OBJECT
    async function evaluateEmbed(gelObject, yanObject, processEmbed) {
        //IF ECONNRRESET
        if(gelObject === 'ECONNRESET' || yanObject === 'ECONNRESET') return updateInteractionExport(processEmbed, '• • •  Please retry ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-12.gif', null, true, null, null)

        //IF NO RESULTS AT ALL FROM ANY IQDB
        if(!gelObject.globalGetWebUrl && !yanObject.globalGetWebUrl) return updateInteractionExport(processEmbed, '• • •  No results in gelbooru datastore ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-12.gif', null, true, null, null)

        //IF FLAGGED BY FILTER AS LOLI
        if((gelObject.globalRating === 'questionable' || gelObject.globalRating === 'explicit') && gelObject.globalLoliCondition) return updateInteractionExport(processEmbed, '• • •  Questionable/Explicit loli is filtered ! !', 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-07.gif', null, true, null, null)

        //SUCCESSFUL
        //updateInteractionExport(processEmbed, `• • • Enjoy your sauce!`, 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-07.gif', `• • • **Gelbooru:** ${gelObject.globalGetWebUrl ? `__**[sauce](${gelObject.globalGetWebUrl})**__` : gelObject === 'ECONNRESET' ? 'please retry' : 'none'}\n• • • **Yande.re:** ${yanObject.globalGetWebUrl ? `__**[sauce](${yanObject.globalGetWebUrl})**__` : yanObject === 'ECONNRESET' ? 'please retry' : 'none'}${gelHastebinUrl ? `\n\`\`${gelHastebinUrl}\`\`` : ''}${yanHastebinUrl ? `\n\`\`${yanHastebinUrl}\`\`` : ''}`, null, null, gelObject, yanObject)
    }

    //RUN THE MAIN FUNCTION
    sauceTasks()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//UPDATE INTERACTION [0] [1] [2] [3]
export const updateInteractionExport = (interaction, authorName, thumbnailUrl, description, sendMessageCondition, imageUrl, gelbooruObject, yandereObject) => 
(interaction.editReply ?? (interaction.send && sendMessageCondition ? interaction.send : interaction.edit) ).bind(interaction)({ 
    embeds: [{
        color: '#2f3136',
        author:  { 
            name: authorName, 
            iconURL: 'https://pic.chinesefontdesign.com/uploads/2016/12/chinesefontdesign.com_2016-12-31_10-17-09-1.gif', 
            url: 'https://discord.gg/yCe8C8Nk6s' 
        },
        //title: title ? title : null,
        //url: urlTitle ? urlTitle : null,
        description: description ? description : null,
        thumbnail: {
            url: thumbnailUrl ? thumbnailUrl : null
        },
        image: {
            url: imageUrl ? imageUrl : null
        }
    }],
    components: gelbooruObject || yandereObject ? [
        new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId('newSauce')
            .setPlaceholder('More details')
            .addOptions( 
                gelbooruObject.globalGetWebUrl ? [{ label: 'Gelbooru', description: 'View more sauce details', value: '0' }] : [],
                yandereObject.globalGetWebUrl ? [{ label: 'Yande.re', description: 'View more sauce details', value: '1' }] : []
            )
        )
    ] : []
})
.catch(() => {})
.then(async (res) => {
    //SETTIMEOUT; HANDLE EMBED
    setTimeout(async () => { 
        //GET DESCRIPTION TO FILTER
        if(!res) return
        const sauceResult = await res.embeds[0].description

        //FIXME: BAD CODE MIGHT BREAK
        if(!sauceResult) {
            if(!res.embeds[0].author.name.includes('Yande.re')) {
                return sendMessageCondition ? 
                res.delete().catch(() => { }) : res.edit({ embeds: [newGuildEmbed], components: [newGuildEmbedRow] }).catch(() => {})
            } 
        } else {
            if(sauceResult.includes('sauce')) return console.log("not gonna delete")
        }

        //STOP THE COLLECTOR
        if(currentCollector) currentCollector.stop()
    }, sendMessageCondition ? 60000 : 15000)
    //RETURN RESPONSE FOR EVALUATION
    return res
})
