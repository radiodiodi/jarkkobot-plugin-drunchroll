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
    callback: (reply, message) => {
        fetch('https://pizza-online.fi/ravintolat/helsinki/drunch')
        .then(res => {
            return res.text();
        })
        .then(body => {
            const items = findItems(body);
            const picked = pickItem(items);
            reply(message, picked);
        })
        .catch(err => {
            const error = `Virhe: ${err}`;
            console.error(error);
            reply(message, error);
        });
    },
};

export default drunchroll;
