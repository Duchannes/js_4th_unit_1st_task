/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const expect = chai.expect;

const scenario = require('../scenario');

const data = require('./data/data.json');

describe('#check Songs Count', function () {
  data.albums.forEach(album => {
    this.timeout(100000);
    it('checks that all songs in the album are displayed on the english version of the site', async function () {
      expect(await scenario.getSongsCount(data.url, album)).to.be.equal(album.songs);
    });
  });
});
