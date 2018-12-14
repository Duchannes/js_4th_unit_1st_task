const MyWebdriver = require('./MyWebdriver');

module.exports = class FrameWork {
  constructor (data) {
    this.data = data;
    this.driver = new MyWebdriver();
    this.driver.createDriver();
  }

  async switchLang () {
    await this.driver.openPage(this.data.url);
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
    const artistName = await this.driver.findElementByLocator(`.artist__name[title = ${this.data.artist}]`);
    await this.driver.clickOnElement(artistName);
    console.log(`Artist ${this.data.artist} was found`);
  }

  async findAlbum () {
    const albumsTab = await this.driver.findElementByXpath(`//a[text()='Albums']`);
    await this.driver.clickOnElement(albumsTab);
    const albumIcon = await this.driver.findElementByXpath(`//a[text() = "${this.data.album}"]/../..`);
    await this.driver.clickOnElement(albumIcon);
    const albumLink = await this.driver.findElementByLocator(`.sidebar__section > div > a`);
    await this.driver.clickOnElement(albumLink);
    console.log(`Album ${this.data.album} was found`);
  }

  async findSong () {
    const songLink = await this.driver.findElementByXpath(`//div[@class="d-track__name"][@title="${this.data.song}"]/..`);
    await this.driver.clickOnElement(songLink);
    console.log(`Song ${this.data.song} was found`);
  }

  async copyLink () {
    const contextButton = await this.driver.findElementByLocator(`.sidebar-track .d-context-menu button`);
    await this.driver.clickOnElement(contextButton);
    const shareButton = await this.driver.findElementByLocator(`.sidebar-track .d-context-menu__item_share`);
    await this.driver.clickOnElement(shareButton);
    const copyLinkButton = await this.driver.findElementByLocator(`.sidebar-track .d-link_freezed.deco-link_freezed`);
    await this.driver.clickOnElement(copyLinkButton);
    console.log(`Link was copied`);
  }

  async close () {
    await this.driver.closeDriver();
  }
};
