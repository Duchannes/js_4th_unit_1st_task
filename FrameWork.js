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

  async logIn () {
    const loginButton = await this.driver.findElementByClass('button button_size_L button_action log-in not-handled');
    const link = await this.driver.getAttribute(loginButton, 'href');
    await this.driver.openPage(link);
    const loginField = await this.driver.findElementByName('login');
    await this.driver.sendKeys(loginField, this.data.login);
    const passwordField = await this.driver.findElementByName('passwd');
    await this.driver.sendKeys(passwordField, this.data.password);
    const submitButton = await this.driver.findElementByLocator('[type=submit]');
    await this.driver.clickOnElement(submitButton);
  }

  async findArtist () {
    const searchField = await this.driver.findElementByLocator('[placeholder]');
    await this.driver.sendKeys(searchField, this.data.artist);
    const searchButton = await this.driver.findElementByClass('d-button deco-button deco-button-flat d-button_type_flat d-button_w-icon d-button_w-icon-centered suggest-button');
    await this.driver.clickOnElement(searchButton);
  }

  async close () {
    await this.driver.closeDriver();
  }
};
