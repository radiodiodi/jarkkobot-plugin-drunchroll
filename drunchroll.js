import fetch from 'node-fetch';
import cheerio from 'cheerio';

const findItems = body => {
  const $ = cheerio.load(body);
  const items = $('.product_name_value');
  return items.map((index, item) => $(item).text()).get();
}

const pickItem = items => items[Math.floor(Math.random() * items.length)];

const drunchroll = {
    command: 'drunchroll',
    callback: function(reply, message) {
        fetch('https://pizza-online.fi/ravintolat/helsinki/drunch')
        .then(res => res.text())
        .then(function(body) { // no arrow func because of scoping issue
            const items = findItems(body);
            const picked = pickItem(items);
            const msg = message;
            console.log('message object:');
            console.dir(msg);
            reply(msg, picked);
        })
        .catch(err => {
            const error = `Virhe: ${err}`;
            console.error(error);
            reply(message, error);
        });
    },
};

export default drunchroll;
