/**
 * Principle usage is related to discord.js
 * Want to create our bot so that it has access to the file system
 * @type {any}
 */
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

/**
 * A function to handle on ready
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let firstVoice = newMember.voiceChannel;
  let oldVoice = oldMember.voiceChannel;
  // In this case we have a user that has just joined the voice channel.
  if (firstVoice !== undefined && oldVoice === undefined) {
      if (firstVoice.members.size === 1) {
          // Want a timeout to happen now
          setTimeout(handleOp, 500, firstVoice);
      }
  }
});

/**
 * A function for representing a voice channel joined
 * @param voiceChan
 */
function handleOp(voiceChan) {
    // Check we don't have an undefined value
    if (voiceChan !== undefined) {
        // Next condition is that members must be present
        if (voiceChan.members.size > 0) {
            const generalChat = voiceChan.guild.channels.find(channel => channel.name === "general");
            if (generalChat) {
                generalChat.send('Posture check!');
                setTimeout(handleOp, 5000, voiceChan);
            }
        }
    }
}

// Need to get the super secret token for usage
let rawData = fs.readFileSync('token.json');
let info = JSON.parse(rawData.toString());
client.login(info["token"]);
