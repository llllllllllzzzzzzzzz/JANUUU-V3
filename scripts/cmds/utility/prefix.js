const fs = require("fs-extra");

module.exports = {
  config: {
    name: "prefix",
    version: "3.1",
    author: "NoobCore Team | NC-Saim",
    team: "NoobCore",
    countDown: 5,
    role: 0,
    description: "Change the bot prefix in this chat or globally",
    guide: {
      en:
        "👋 Need help with prefixes? Here's what I can do:\n" +
        "╰‣ Type: {pn} <newPrefix>\n" +
        "   ↪ Set a new prefix for this chat only\n" +
        "   ↪ Example: {pn} $\n" +
        "╰‣ Type: {pn} <newPrefix> -g\n" +
        "   ↪ Set a new global prefix (admin only)\n" +
        "   ↪ Example: {pn} ! -g\n" +
        "╰‣ Type: {pn} reset\n" +
        "   ↪ Reset to default prefix from config\n" +
        "╰‣ Type: {pn} refresh\n" +
        "   ↪ Refresh prefix cache for this chat\n" +
        "╰‣ Just type: prefix\n" +
        "   ↪ Shows current prefix info\n" +
        "🤖 𝙸 𝚊𝚖 ready to help!"
    }
  },


  ncStart: async function ({ message, role, args, commandName, event, threadsData, usersData }) {
    const globalPrefix = global.noobCore.ncsetting.prefix;
    
    
    const userName = await usersData.getName(event.senderID) || "there";

  
    if (!args[0]) {
      const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;
      
      return message.reply(
        `👋 𝙷𝚎𝚢 ${userName}, 𝙳𝚒𝚍 𝚢𝚘𝚞 𝚊𝚜𝚔 𝚏𝚘𝚛 𝚖𝚢 𝚙𝚛𝚎𝚏𝚒𝚡?\n` +
        `╭‣ 🌐 𝙶𝚕𝚘𝚋𝚊𝚕: ${globalPrefix}\n` +
        `╰‣ 💬 𝚃𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙: ${threadPrefix}\n` +
        `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 𝚝𝚛𝚢"${threadPrefix}𝚑𝚎𝚕𝚙" 𝚝𝚘 𝚜𝚎𝚎 𝚊𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.`
      );
    }

    
    if (args[0] === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(
        `✅ 𝙷𝚎𝚢 ${userName}, 𝚌𝚑𝚊𝚝 𝚙𝚛𝚎𝚏𝚒𝚡 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚜𝚎𝚝!\n` +
        `╭‣ 🌐 𝙶𝚕𝚘𝚋𝚊𝚕: ${globalPrefix}\n` +
        `╰‣ 💬 𝚃𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙: ${globalPrefix}\n` +
        `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 𝚝𝚛𝚢 "${globalPrefix}𝚑𝚎𝚕𝚙" 𝚝𝚘 𝚜𝚎𝚎 𝚊𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.`
      );
    }

    
    if (args[0] === "refresh") {
      try {
        const threadID = event.threadID;
        
        
        if (threadsData.cache && threadsData.cache[threadID]) {
          delete threadsData.cache[threadID].data?.prefix;
        }
        
        const refreshedPrefix = await threadsData.get(threadID, "data.prefix") || globalPrefix;
        
        return message.reply(
          `🔄 𝙷𝚎𝚢 ${userName}, 𝚙𝚛𝚎𝚏𝚒𝚣 𝚌𝚊𝚌𝚑𝚎 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚏𝚛𝚎𝚜𝚑𝚎𝚍!\n` +
          `╭‣ 🌐 𝙶𝚕𝚘𝚋𝚊𝚕: ${globalPrefix}\n` +
          `╰‣ 💬 𝚃𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙: ${refreshedPrefix}\n` +
          `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 𝚝𝚛𝚢 "${refreshedPrefix}𝚑𝚎𝚕𝚙" 𝚝𝚘 𝚜𝚎𝚎 𝚊𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.`
        );
      } catch (error) {
        console.error("Refresh error:", error);
        return message.reply(
          `❌ Hey ${userName}, I couldn't refresh the prefix!\n` +
          `╭‣ Error: Cache refresh failed\n` +
          `╰‣ Solution: Try again in a moment\n` +
          `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖  𝚋𝚋𝚣\n📂 try "${globalPrefix}𝚑𝚎𝚕𝚙" 𝚝𝚘 𝚜𝚎𝚎 𝚊𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.`
        );
      }
    }

    
    const newPrefix = args[0];
    const setGlobal = args[1] === "-g";

    
    if (setGlobal && role < 2) {
      return message.reply(
        `⛔ 𝙷𝚎𝚢 ${userName}, 𝙸 𝚌𝚊𝚗'𝚝 𝚍𝚘 𝚝𝚑𝚊𝚝 𝚏𝚘𝚛 𝚢𝚘𝚞!\n` +
        `╭‣ 𝙰𝚌𝚝𝚒𝚘𝚗: 𝙲𝚑𝚊𝚗𝚐𝚎 𝚐𝚕𝚘𝚋𝚊𝚕 𝚙𝚛𝚎𝚏𝚒𝚡\n` +
        `╰‣ 𝚁𝚎𝚊𝚜𝚘𝚗: 𝙰𝚍𝚖𝚒𝚗 𝚎𝚛 𝚖𝚘𝚗 𝚌𝚊𝚒𝚌𝚑𝚎 𝚎𝚓𝚘𝚘𝚗𝚗𝚘\n` +
        `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 𝚝𝚛𝚢 "${globalPrefix}𝚑𝚎𝚕𝚙" 𝚝𝚘 𝚜𝚎𝚎 𝚊𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.`
      );
    }

    
    const currentPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;
    
    
    const confirmMessage = setGlobal 
      ? `⚙️ 𝙷𝚎𝚢 ${userName}, 𝚌𝚘𝚗𝚏𝚒𝚛𝚖 𝚐𝚕𝚘𝚋𝚊𝚕 𝚙𝚛𝚠𝚏𝚒𝚡 𝚌𝚑𝚊𝚗𝚐𝚎?\n` +
        `╭‣ 𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝙶𝚕𝚘𝚋𝚊𝚕: ${globalPrefix}\n` +
        `╰‣ 𝙽𝚎𝚠 𝙶𝚕𝚘𝚋𝚊𝚕: ${newPrefix}\n` +
        `🤖 𝚁𝚎𝚊𝚌𝚝 𝚝𝚘 𝚌𝚒𝚗𝚏𝚒𝚛𝚖 𝚝𝚑𝚒𝚜 𝚌𝚑𝚊𝚗𝚐𝚎𝚕!`
      : `⚙️ 𝙷𝚎𝚢 ${userName}, 𝚌𝚘𝚗𝚏𝚒𝚛𝚖 𝚌𝚑𝚊𝚝 𝚙𝚛𝚎𝚏𝚒𝚡 𝚌𝚑𝚊𝚗𝚐𝚎?\n` +
        `╭‣ 𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝚌𝚑𝚊𝚝: ${currentPrefix}\n` +
        `╰‣ 𝙽𝚎𝚠 𝚌𝚑𝚊𝚝: ${newPrefix}\n` +
        `🤖 𝚁𝚎𝚊𝚌𝚝 𝚝𝚘 𝚌𝚒𝚗𝚏𝚒𝚛𝚖 𝚝𝚑𝚒𝚜 𝚌𝚑𝚊𝚗𝚐𝚎𝚕𝚕!`;
    
    
    return message.reply(confirmMessage, (err, info) => {
      if (err) {
        console.error("Error sending confirmation message:", err);
        return;
      }
      
      global.noobCore.onReaction.set(info.messageID, {
        author: event.senderID,
        newPrefix,
        setGlobal,
        commandName
      });
    });
  },


  onReaction: async function ({ message, event, Reaction, threadsData, usersData }) {
    const { author, newPrefix, setGlobal } = Reaction;
    
    
    if (event.userID !== author) return;

    
    const userName = await usersData.getName(event.userID) || "there";

    
    if (setGlobal) {
      try {
        global.noobCore.ncsetting.prefix = newPrefix;
        fs.writeFileSync(
          global.client.dirConfig,
          JSON.stringify(global.noobCore.ncsetting, null, 2)
        );
        
        return message.reply(
          `✅ Hey ${userName}, global prefix has been updated!\n` +
          `╭‣ New Global Prefix: ${newPrefix}\n` +
          `╰‣ Scope: All chats will use this prefix\n` +
          `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 try "${newPrefix}help" to see all commands.`
        );
      } catch (error) {
        console.error("Global prefix save error:", error);
        return message.reply(
          `❌ Hey ${userName}, failed to save global prefix!\n` +
          `╭‣ Error: Configuration file error\n` +
          `╰‣ Solution: Check file permissions\n` +
          `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 try "${global.noobCore.ncsetting.prefix}help" to see all commands.`
        );
      }
    }

    
    try {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      
      return message.reply(
        `✅ Hey ${userName}, chat prefix has been updated!\n` +
        `╭‣ New Chat Prefix: ${newPrefix}\n` +
        `╰‣ Scope: This chat only\n` +
        `🤖 I'm NoobCore V3\n📂 try "${newPrefix}help" to see all commands.`
      );
    } catch (error) {
      console.error("Chat prefix save error:", error);
      return message.reply(
        `❌ Hey ${userName}, failed to save chat prefix!\n` +
        `╭‣ Error: Database error\n` +
        `╰‣ Solution: Try again later\n` +
        `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 try "${global.noobCore.ncsetting.prefix}help" to see all commands.`
      );
    }
  },

  

  ncPrefix: async function ({ event, message, threadsData, usersData }) {
    const triggerText = event.body?.toLowerCase().trim();
    
    
    if (!triggerText) return;
    
    const isTrigger = 
      triggerText === "prefix" || 
      triggerText === "ňč" || 
      triggerText === "nøøbcore" ||
      (triggerText.includes("ňč") && triggerText.includes("nøøbcore"));
    
    if (!isTrigger) return;
    
    
    const userName = await usersData.getName(event.senderID) || "there";
    const globalPrefix = global.noobCore.ncsetting.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;
    
    return message.reply(
      `👋 Hey ${userName}, did you ask for my prefix?\n` +
      `╭‣ 🌐 Global: ${globalPrefix}\n` +
      `╰‣ 💬 This Chat: ${threadPrefix}\n` +
      `🤖 𝚆𝚘𝚗𝚎𝚛: 𝚃𝚊𝚖𝚒𝚖 𝙱𝚋𝚣\n📂 try "${threadPrefix}help" to see all commands.`
    );
  }
};
