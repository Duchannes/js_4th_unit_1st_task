const webDriver = require('selenium-webdriver');

module.exports = class MyWebDriver {
  constructor () {
    this.driver = null;
  }

  createDriver () {
    this.driver = this.driver || new webDriver.Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(webDriver.Capabilities.chrome())
      .build();
    this.driver.manage().window().maximize();
    this.driver.manage().timeouts().setScriptTimeout(10000);
  }

  closeDriver () {
    if (this.driver) {
      this.driver.quit();
      this.driver = null;
    }
  }

  async openPage (url) {
    await this.driver.get(url);
    console.log(`page ${url} opened`);
  }

  async findElementByLocator (locator) {
    const element = await this.driver.wait(webDriver.until.elementLocated(webDriver.By.css(locator)));
    console.log(`element located by css '${locator}' was found`);
    return element;
  }

  async findElementByClass (className) {
    const element = await this.driver.wait(webDriver.until.elementLocated(webDriver.By.className(className)));
    console.log(`element located by class name '${className}' was found`);
    return element;
  }

  async findElementByXpath (xpath) {
    const element = await this.driver.wait(webDriver.until.elementLocated(webDriver.By.xpath(xpath)));
    console.log(`element located by link text '${xpath}' was found`);
    return element;
  }

  async clickOnElement (element) {
    const elementWaiter = await this.driver.wait(webDriver.until.elementIsVisible(element));
    console.log(`clicking on element`);
    elementWaiter.click();
  }

  async getAttribute (element, attrName) {
    const attribute = await element.getAttribute(attrName);
    return attribute;
  }

  async sendKeys (element, keys) {
    await element.sendKeys(keys);
    console.log(`typing ...`);
  }

  async executeScript (script) {
    await this.driver.executeScript(script);
    console.log(`executing script ${script}`);
  }

  async pressEnterAtElement (element) {
    await element.sendKeys(webDriver.Key.ENTER);
    console.log(`Enter key pressed.`);
  }
};
