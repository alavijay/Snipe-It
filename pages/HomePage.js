require('dotenv').config();
const urlNo = process.env.urlID;

class HomePage {
  constructor(page) {
    this.page = page;
    this.checkIn = 'text="Check In"';
    this.search = '[data-testid="search"]'
  }

  async goToRMS() {
    await this.page.goto('https://demo.snipeitapp.com/login');
  }

  async openCalender() {
    await this.page.click(this.checkIn);
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

  async searchBooking() {
    const doneButton = this.page.getByRole('button', { name: 'Done' });
    if (await doneButton.isVisible() && await doneButton.isEnabled()) {
    await doneButton.click();
    console.log('Clicked "Done" button!');
    } else {
      console.log(' "Done"button is not clickable.');
    }
    await this.page.click(this.search);
  }

}

module.exports = HomePage;
