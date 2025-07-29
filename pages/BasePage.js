require('dotenv').config();
const url = process.env.URL;

class BasePage {
  constructor(page) {
  this.page = page;
  }
  
  async waitForElement(element) {
    await element.waitFor({ state: 'visible' });
  }

  async waitForText(text) {
    await this.page.getByText(text, { exact: true }).waitFor({ state: 'visible' });
  }
  
  async waitForTextContains(partialText) {
    await this.page.getByText(partialText, { exact: false }).waitFor({ state: 'visible' });
  }

  async randomAssetTag() {
    var tag =  Math.floor(10000000 + Math.random() * 90000000).toString();
    return "AW" + tag;
  }
}

module.exports = BasePage;
