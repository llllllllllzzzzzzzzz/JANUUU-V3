module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "𝗧𝗮𝗺𝗶𝗺 𝗕𝗯𝘇",
    countDown: 5,
    role: 0, // 0 use for everyone, 1 use for box admin, 2 use for bot admin, 3 use for bot Creator
    premium: false, // ture use only premium user
    usePrefix: true, // false use without prefix
    shortDescription: {
      en: "Show bot information"
    },
    description: {
      en: "Display detailed information about NoobCore Bot"
    },
    category: "utility",
    guide: {
      en: "{prefix}info"
    }
  },

  langs: {
    en: {
      infoMessage:
`╔════════════════════╗
     𝗕𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡
╚════════════════════╝

📌 𝙱𝚘𝚝 𝚗𝚊𝚖𝚎: NoobCore-v3
⚡ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗: 3.0
👨‍💻 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛: Noob Programmer
🌐 𝙿𝚕𝚊𝚝𝚏𝚛𝚘𝚖: Facebook Messenger
🧠 𝚂𝚢𝚜𝚝𝚎𝚖: Modular Command + Event Driven
🔄 𝙼𝚞𝚕𝚝𝚢 𝚊𝚙𝚙𝚜𝚝𝚊𝚝𝚎: Enabled

𝚁𝚎𝚙𝚕𝚊𝚢 𝚠𝚒𝚝𝚑:
1️⃣ - 𝚂𝚑𝚘𝚠 Prefix
2️⃣ - 𝚂𝚑𝚘𝚠 𝙰𝚍𝚖𝚒𝚗 𝚕𝚒𝚜𝚝 
3️⃣ - 𝚂𝚑𝚘𝚠 𝙲𝚊𝚛𝚎𝚊𝚝 𝙸𝙳

React ❤️ to get uptime status.
`
    }
  },

  ncStart: async function ({ api, event }) {
    const message = this.langs.en.infoMessage;

    await api.sendMessage(message, event.threadID, (error, info) => {
      if (error) return console.log(error);

      // Reply handler
      global.noobCore.ncReply.set(info.messageID, {
        commandName: this.config.name,
        messageID: info.messageID,
        author: event.senderID
      });

      // Reaction handler
      global.noobCore.ncReaction.set(info.messageID, {
        commandName: this.config.name,
        messageID: info.messageID,
        author: event.senderID
      });

    }, event.messageID);
  },

  // Handle Reply
  ncReply: async function ({ api, event }) {
    const { body, threadID, messageID } = event;
    const ncsetting = global.noobCore.ncsetting;

    if (body === "1") {
      return api.sendMessage(
        `🔹 Current Prefix: ${ncsetting.prefix}`,
        threadID,
        messageID
      );
    }

    if (body === "2") {
      return api.sendMessage(
        `👮 Admin List:\n${ncsetting.adminBot.join("\n")}`,
        threadID,
        messageID
      );
    }

    if (body === "3") {
      return api.sendMessage(
        `👑 Creator ID:\n${ncsetting.creator.join("\n")}`,
        threadID,
        messageID
      );
    }
  },

  // Handle Reaction
  ncReaction: async function ({ api, event }) {
    if (event.reaction !== "❤") return;

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return api.sendMessage(
      `⏳ Bot Uptime:\n${hours}h ${minutes}m ${seconds}s`,
      event.threadID,
      event.messageID
    );
  }
};
