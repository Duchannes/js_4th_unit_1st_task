const data = require('../data.json');
const FrameWork = require('../FrameWork');

const frameWork = new FrameWork(data);

async function scenario () {
  await frameWork.switchLang();
  await frameWork.logIn();
  await frameWork.findArtist();
  // await frameWork.close();
}

scenario();
