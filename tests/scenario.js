const data = require('../data.json');
const FrameWork = require('../FrameWork');

const frameWork = new FrameWork(data);

async function scenario () {
  await frameWork.switchLang();
  await frameWork.findArtist();
  await frameWork.findAlbum();
  await frameWork.findSong();
  await frameWork.copyLink();
  // await frameWork.close();
}

scenario();
