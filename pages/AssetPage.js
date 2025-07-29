require('dotenv').config();
const url = process.env.URL;
const BasePage = require('./BasePage');
let assetTagValue;

class AssetPage extends BasePage{
  constructor(page) {
    super(page);
    this.createNew = page.getByText('Create New');
    this.assetNav = page.getByRole('navigation').getByText('Asset', { exact: true });
    this.submitButton = page.locator('#submit_button');
    this.companySelect = page.getByRole('combobox', { name: 'Select Company' });
    this.companyOption = page.getByText('Labadie PLC');
    this.assetTagInput = page.getByRole('textbox', { name: 'Asset Tag', exact: true });
    this.serialInput = page.getByRole('textbox', { name: 'Serial' });
    this.selectModel = page.getByText('Select a Model');
    this.selectStatus = page.getByLabel('Select Status');
    this.searchBox = page.getByRole('searchbox');
    this.selectMacbook = page.getByText('Laptops - Macbook Pro 13"');
    this.readyToDeploy = page.getByRole('option', { name: 'Ready to Deploy' });
    this.selectUserSpan = page.getByRole('combobox', { name: 'Select a User' }).locator('span').nth(2);
    this.selectUser = page.getByText('Aufderhar, Francesco (vesta.com)');
    //  await page.getByText('Aufderhar, Francesco (vesta.').click();

  }

  async enterAssetDetails() {
    await this.waitForElement(this.submitButton);
    await this.companySelect.click();
    await this.companyOption.click();
    await this.assetTagInput.fill(await this.randomAssetTag());
    assetTagValue = await this.assetTagInput.inputValue();
    console.log(assetTagValue);
    await this.serialInput.fill('Test1234');
    await this.selectModel.click();
    await this.searchBox.fill('macbook');
    await this.selectMacbook.click();
    await this.selectStatus.click();
    await this.readyToDeploy.click();
    await this.selectUserSpan.click();
    await this.selectUser.click();
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

module.exports = AssetPage;
