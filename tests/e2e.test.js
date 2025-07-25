const { chromium, devices } = require('playwright');
const HomePage = require('../pages/HomePage');
const ResultsPage = require('../pages/ResultsPage');
const CheckoutPage = require('../pages/CheckoutPage');

const configurations = [
  {
    name: 'Desktop',
    options: {}, // default desktop
    traceFile: 'trace-desktop.zip',
    videoDir: 'videos/desktop/',
  },
  {
    name: 'Mobile (iPhone 13)',
    options: devices['iPhone 13'],
    traceFile: 'trace-mobile.zip',
    videoDir: 'videos/mobile/',
  },
];

for (const config of configurations) {
  describe(`${config.name} Home Page Tests`, () => {
    let browser;
    let context;
    let page;
    let homePage;
    let resultsPage;
    let checkoutPage;

    beforeAll(async () => {
      browser = await chromium.launch({ headless: false });

      context = await browser.newContext({
        ...config.options,
        recordVideo: { dir: config.videoDir },
      });

      await context.tracing.start({ screenshots: true, snapshots: true });

      page = await context.newPage();
      homePage = new HomePage(page);
      resultsPage = new ResultsPage(page);
      checkoutPage = new CheckoutPage(page);
    });

    afterAll(async () => {
      await context.tracing.stop({ path: config.traceFile });
      await context.close();
      await browser.close();
    });

    test('Make a booking', async () => {

      // navigate to RMS
      await homePage.goToRMS();
      expect(await page.title()).toContain('Online Bookings');

      // search rooms
      await homePage.openCalender();
      await homePage.selectDate(page, 1); // select check in date which is tomorrow
      await homePage.selectDate(page, 2); // Select check out date which is the day after tomorrow
      await homePage.searchBooking();   

      // select room and go to checkout
      expect(await resultsPage.availableRooms()).toBeGreaterThan(0);
      await resultsPage.addRoomToCart();

      // complete checkout and pay and confirm booking no
      await checkoutPage.fillDetails();

    });
  });
}
