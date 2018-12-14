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

  async findElementByName (name) {
    const element = await this.driver.wait(webDriver.until.elementLocated(webDriver.By.name(name)));
    console.log(`element located by name '${name}' was found`);
    return element;
  }

  // async findElementByLinkText (linkText) {
  //   const element = await this.driver.wait(webDriver.until.elementLocated(webDriver.By.linkText(linkText)));
  //   console.log(`element located by link text '${linkText}' was found`);
  //   return element;
  // }

  async clickOnElement (element) {
    console.log(`clicking on element`);
    const elementWaiter = await this.driver.wait(webDriver.until.elementIsVisible(element));
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
};

// function logTitle () {
//   browser.getTitle().then(function (title) {
//     console.log('Current Page Title: ' + title);
//   });
// }

// function logQuestionTitle () {
//   browser.findElement(webdriver.By.css('#question-header h1')).then(function (el) {
//     el.getText().then(function (text) {
//       console.log('Current Question Title: ' + text);
//     });
//   });
// }

// function clickLink (link) {
//   link.click();
// }

// function handleFailure (err) {
//   console.error('Something went wrong\n', err.stack, '\n');
//   closeBrowser();
// }

// function findMostRelevant () {
//   return browser.findElements(webdriver.By.css('.result-link a')).then(function (result) {
//     return result[0];
//   });
// }

// browser.get('https://stackoverflow.com/');
// browser.findElement(webdriver.By.name('q')).sendKeys('webdriverjs');
// browser.findElement(webdriver.By.xpath("//button[@type='submit']")).click();

// browser.wait(findMostRelevant, 2000)
//   .then(clickLink)
//   .then(logTitle)
//   .then(logQuestionTitle)
//   .then(closeBrowser, handleFailure);
