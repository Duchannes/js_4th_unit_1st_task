let data = {
  'url': 'https://music.yandex.ru/',
  'albums': [
    {
      'artist': 'Imagine Dragons',
      'album': 'Origins',
      'songs': 15
    }] };

const scenario = require('./scenario');

async function lol () {
  await scenario.getSongsCount(data.url, data.albums[0]);
};

lol();
