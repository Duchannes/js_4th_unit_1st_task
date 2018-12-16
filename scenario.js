
const FrameWork = require('./FrameWork');

async function getSongsCount (url, data) {
  const frameWork = new FrameWork(url, data);
  await frameWork.switchLang();
  await frameWork.findArtist();
  await frameWork.findAlbum();
  const songsCount = await frameWork.findSongCount();
  await frameWork.close();
  return songsCount;
}

exports.getSongsCount = getSongsCount;
