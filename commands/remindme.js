const Discord   = require('discord.js'),
      parseArgs = require('minimist'),
      parse_ms  = require('parse-ms');
      
// parseTime function
function parseMS(milliseconds) {
    
    // Declare Variables
    let string = '',
        obj = parse_ms(milliseconds);
    
    // Check Days
    if (obj.days === 1) string += ` ${obj.days} day `
    else if (obj.days > 1) string += ` ${obj.days} days `
    
    // Check Hours
    if (obj.hours === 1) string += `${obj.hours} hour `
    else if (obj.hours > 1) string += `${obj.hours} hours `
    
    // Check Minutes
    if (obj.minutes === 1) string += `${obj.minutes} minute `
    else if (obj.minutes > 1) string += `${obj.minutes} minutes `
    
    // Check Seconds
    if (obj.seconds === 1) string += `${obj.seconds} second `
    else if (obj.seconds > 1) string += `${obj.seconds} seconds `
    
    // Check Milliseconds
    if (obj.milliseconds === 1) string += `${obj.milliseconds} millisecond `
    else if (obj.milliseconds > 1) string += `${obj.milliseconds} milliseconds `
    
    // Append Text
    if (string === '') string = 'Just now'
    else string += 'from now'
    
    return string;
    
}
      
function parseTime(string) {
      
      // Remove Special Characters & Split
      string = string.replace(/[^a-zA-Z0-9 ]/g, '').split('');

      for (var i in string) {
            if (i !== 0 && string[i].search(/[a-zA-Z]/g) !== -1 && string[i-1] !== ' ' && !isNaN(string[i-1])) string.splice(i, 0, ' ');
            //else if (i !== 0 && string[i-1] !== ' '&& string[i-1].search(/[a-zA-Z]/g) !== -1 && string[i] !== ' ' && !isNaN(string[i])) string.splice(i, 0, ' ');
      }
      
      string = string.join('');
      
      // Split String
      let args = string.split(' '),
          output = [],
          unused = [],
          total = 0;

      // Go Through Each Item
      args.forEach(function(item) {
            
            let obj = {},
                found = false;
            item = item.toLowerCase();
            
            this.item = item;
            this.add = function(types, time) {
                  if (types.includes(this.item)) {
                        found = true;
                        obj = {
                              data: time,
                              type: 'Item'
                        }
                  } else if (!isNaN(this.item)) {
                        found = true;
                        obj = {
                              data: this.item,
                              type: 'Multiplier'
                        }
                  }
            }
            
            // Times
            this.millisecond = 1;
            this.second  = this.millisecond * 1000;
            this.minute  = this.second      * 60;
            this.hour    = this.minute      * 60;
            this.day     = this.hour        * 24;
            this.week    = this.day         * 7;
            this.month   = this.day         * 30;
            this.year    = this.day         * 365;
            this.decade  = this.year        * 10;
            this.century = this.year        * 100;
            
            this.add(['ms', 'millisecond', 'milliseconds'], this.millisecond);
            this.add(['s', 'second', 'seconds', 'secs', 'sec'], this.second);
            this.add(['m', 'minute', 'minutes', 'mins', 'min'], this.minute);
            this.add(['h', 'hour', 'hours', 'hrs', 'hr'], this.hour);
            this.add(['d', 'day', 'days'], this.day);
            this.add(['w', 'week', 'weeks', 'wks'], this.week);
            this.add(['mo', 'month', 'months', 'mnth'], this.month);
            this.add(['y', 'year', 'years', 'yrs', 'yr'], this.year);
            this.add(['decade', 'decades'], this.decade);
            this.add(['century', 'centuries'], this.century);
            if (!found) obj = { type: 'Unknown', data: this.item };
            
            
            output.push(obj);
            
      })
      
      for (var i in output) {
            if (output[i].type === 'Item' && output[i-1] && !isNaN(output[i-1].data)) total += output[i].data * output[i-1].data;
            else if (output[i].type === 'Item') total += output[i].data;
            else if (output[i] && output[i].type === 'Unknown') unused.push(output[i].data);
            else if (output[i] && output[i].type === 'Multiplier' && output[i+1] && output[i+1].type !== 'Item') unused.push(output[i].data);
            console.log(total)
      }

      return { time: total, unused: unused };
      
}

module.exports.run = async (bot, message, args) => {

      // Create Embed
      const embed = new Discord.RichEmbed()
            .setColor(0xffffff);

      // Validate Message
      args = args.join(' ');
      if (args.indexOf('"') !== -1 && args.indexOf('"') === args.lastIndexOf('"')) {
            
            embed.setFooter('Please enclose your message using double quotes "message"')
            return message.channel.send(embed);
            
      }
      
      // Parse Options
      let msg = '';
      if (args.includes('"')) msg = args.slice(args.indexOf('"')+1, args.lastIndexOf('"'));
      
      let ms  = parseTime(args);
       
      if (ms.time <= 0) {
            
            embed.setTitle('Proper Usage:')
                 .setDescription(`\`&RemindMe <time> "message"\``)
                 .setFooter(`Example: &RemindMe in 1 hour and 10 minutes to "Grab Food"`);
                 
            return message.channel.send(embed);
            
      }
      
      embed.setTitle('Reminder Created')
           .setDescription(msg)
           .addField('When', `${parseMS(ms.time)}`)
       
      message.channel.send(embed);
      message.channel.send('Unused:' + ms.unused.join(', '));
      
      // NOTE: This is not persistent
      setTimeout(function() {
            embed.setTitle('Reminder Completed!');
            embed.fields[0].value = embed.fields[0].value.replace('from now', 'ago');
            message.author.send(embed);
      }, ms)

}

module.exports.help = {
    name:"remindme" 
 }