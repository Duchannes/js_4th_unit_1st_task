const MyWebdriver = require('./MyWebdriver');

module.exports = class FrameWork {
  constructor (url, data) {
    this.url = url;
    this.data = data;
    this.driver = new MyWebdriver();
    this.driver.createDriver();
  }

  async switchLang () {
    await this.driver.openPage(this.url);
    await this.driver.executeScript('window.scrollTo(0,document.body.scrollHeight);'); // need to scroll to the page bottom for element become clickable
    const langButton = await this.driver.findElementByLocator('.d-lang-switcher__current-lang-text');
    await this.driver.clickOnElement(langButton);
    const engLangButton = await this.driver.findElementByLocator('.d-flag_gb');
    await this.driver.clickOnElement(engLangButton);
    console.log(`Language was succesfully switched`);
  }

  async findArtist () {
    const searchField = await this.driver.findElementByLocator('[placeholder="Track, album, artist"]');
    await this.driver.sendKeys(searchField, this.data.artist);
    await this.driver.pressEnterAtElement(searchField);
    const artistName = await this.driver.findElementByLocator(`.artist__name[title = "${this.data.artist}"]`);
    await this.driver.clickOnElement(artistName);
    console.log(`Artist ${this.data.artist} was found`);
  }

  async findAlbum () {
    const albumsTab = await this.driver.findElementByXpath(`//a[text()='Albums']`);
    await this.driver.clickOnElement(albumsTab);
    const albumIcon = await this.driver.findElementByXpath(`//a[text() = "${this.data.album}"]/../..`);
    await this.driver.clickOnElement(albumIcon);
    console.log(`Album ${this.data.album} was found`);
  }

  async findSongCount () {
    const songsLinks = await this.driver.findAllElementsByLocator(`.d-track.typo-track.d-track_inline-meta`);
    console.log(`${songsLinks.length} songs was found`);
    return songsLinks.length;
  }

  async close () {
    await this.driver.closeDriver();
    console.log(`Driver was closed.`);
  }
};
