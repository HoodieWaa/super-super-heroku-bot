const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');

const token = 'NjYzMjQwMTYxNTA0NjU3NDI4.Xil_Uw.krAbykrm9nu0_kDWKRohZs1lK_0';

const PREFIX = 'dv!';

var version = '1.0.0';

bot.on('ready', () =>{
    console.log('Bot ini sedang online!');
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

        case 'mute':
            if(!message.member.roles.find(r => r.name === "🍁ADMINISTRATOR🍁")) return message.channel.send('Mohon Maaf, Perintah tersebut hanya untuk **orang yang berwenang**')
        let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if(!person) return message.reply("Member tersebut tidak diketahui!");

        let mainrole = message.guild.roles.find(role => role.name === "Member");
        let muterole = message.guild.roles.find(role => role.name === "MUTED");

        if(!muterole) return message.reply("Tidak bisa menemukan mute role");

        let time = args[2];

        if(!time){
            return message.reply("Kamu tidak menyetting durasinya!");
        }

        person.removeRole(mainrole.id);
        person.addRole(muterole.id);

        message.channel.send(`@${person.user.tag} sudah dibungkam selama ${ms(ms(time))}`);

        setTimeout(function(){
            person.addRole(mainrole.id);
            person.removeRole(muterole.id);
            message.channel.send(`@${person.user.tag} pembungkaman telah selesai!`)
        }, ms(time));

        break;

        
        case 'kick':
            if(!message.member.roles.find(r => r.name === "🍁ADMINISTRATOR🍁")) return message.channel.send('Mohon Maaf, Perintah tersebut hanya untuk **orang yang berwenang**')

            var user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('Kamu telah dikick karena melanggar peraturan').then(() =>{
                        message.reply(`Telah berhasil mengeluarkan ${user.tag}`);
                    }).catch(err =>{
                        message.reply(`Saya tidak bisa mengkick orang tersebut`);
                        console.log(err);
                    }); 
                    
                } else{
                    message.reply("Member tersebut tidak\' ada di server ini!")
                }

            } else {
                message.reply(`Kamu harus menandai orang tersebut!`);
            }

        break;

        case 'ban':
            if(!message.member.roles.find(r => r.name === "🍁ADMINISTRATOR🍁")) return message.channel.send('Mohon Maaf, Perintah tersebut hanya untuk **orang yang berwenang**')

            var user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.ban({reason: 'Kamu telah diban karena melanggar'}).then(() =>{
                        message.reply(`Tuan, Saya sudah Mengeban ${user.tag}. siapa selanjutnya? :D`)

                    })
                } else{
                    message.reply("Member tersebut tidak\' ada di server ini!")
                }

            } else {
                message.reply(`Kamu harus menandai orang tersebut!`);
            }

        break;

        case 'ping':
            message.channel.sendMessage('Ping!');
            break;
        case 'website':
            message.channel.sendMessage('tidak ada website :(');
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.sendMessage('version ' + version);
            }else{
                message.channel.sendMessage('Perintah tidak diketahui');
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error, Silahkan memasukkan jumlah yang ingin dilakukan');
            message.channel.bulkDelete(args[1]);
        break;

        case 'embed':
            const embed = new Discord.RichEmbed()
            .setTitle('Informasi Pengguna')
            .addField('Nama Pengguna', message.author.username)
            .addField('Versi', version)
            .addField('Server saat ini', message.guild.name)
            .setColor(0xF72508)
            .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
        break;

    }
})

bot.login(token);
