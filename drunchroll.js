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
        .then((msg =>
            function(body) { // vitun closuret
              const items = findItems(body);
              const picked = pickItem(items);
              reply(msg, picked);
            }
          )(message)
        )
        .catch(err => {
            const error = `Virhe: ${err}`;
            console.error(error);
            reply(message, error);
        });
    },
};

export default drunchroll;
