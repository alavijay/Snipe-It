require('dotenv').config();
const url = process.env.URL;
const BasePage = require('./BasePage');

class HomePage extends BasePage{
  constructor(page) {
    super(page);
    this.createNew = page.getByText('Create New');
    this.assetNav = page.getByRole('navigation').getByText('Asset', { exact: true }); // new locator
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async gotoCreateAsset() {
    await this.waitForElement(this.createNew);
    await this.createNew.click(); 
    await this.waitForElement(this.assetNav); // wait for the asset navigation to be visible
    await this.assetNav.click(); // navigate to the asset section
    await this.page.waitForURL('https://demo.snipeitapp.com/hardware/create');
  }

  async selectDate(page, daysFromToday) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysFromToday);

    const ariaLabel = targetDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    await page.locator(`[aria-label="${ariaLabel}"]`).click();
  }



}

module.exports = HomePage;
