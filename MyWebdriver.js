const webDriver = require('selenium-webdriver');
const By = webDriver.By;
const until = webDriver.until;

module.exports = class MyWebDriver {
  constructor () {
    this.driver = null;
  }

  async createDriver () {
    this.driver = this.driver || new webDriver.Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(webDriver.Capabilities.chrome())
      .build();
    this.driver.manage().window().maximize();
    await this.driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 10000,
      script: 10000 });
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
    const element = await this.driver.wait(until.elementLocated(By.css(locator)));
    console.log(`element located by css locator '${locator}' was found`);
    return element;
  }

  async findElementByClass (className) {
    const element = await this.driver.wait(until.elementLocated(By.className(className)));
    console.log(`element located by class name '${className}' was found`);
    return element;
  }

  async findElementByXpath (xpath) {
    const element = await this.driver.wait(until.elementLocated(By.xpath(xpath)));
    console.log(`element located by xpath '${xpath}' was found`);
    return element;
  }

  async findElementByPartialLinkText (text) {
    const element = await this.driver.wait(until.elementLocated(By.partialLinkText(text)));
    console.log(`element located by link text '${text}' was found`);
    return element;
  }

  async clickOnElement (element) {
    const elementWaiter = await this.driver.wait(until.elementIsEnabled(element));
    console.log(`clicking on element`);
    elementWaiter.click();
  }

  async moveCursorToElement (element) {
    this.driver.actions.move(element).click().perform();
  }

  async getAttribute (element, attrName) {
    const attribute = await element.getAttribute(attrName);
    return attribute;
  }

  async findAllElementsByLocator (locator) {
    const elements = await this.driver.findElements(By.css(locator));
    console.log(`elements located by link css '${locator}' was found`);
    return elements;
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
