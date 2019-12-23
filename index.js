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

// Need to get the super secret token for usage
let rawData = fs.readFileSync('token.json');
let info = JSON.parse(rawData.toString());
client.login(info["token"]);
