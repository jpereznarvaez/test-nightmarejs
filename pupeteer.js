const puppeteer = require('puppeteer');

(async () => {
  console.time(`puppeteerTime`);

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1024,
      height: 600
    });

    await page.goto('https://evercheck.com/');
    await page.waitForSelector(
      'body > div.hero.will-load.wl-static.loaded > div > div > div.col-md-6.content-side.will-load.wl-from-bottom.loaded > h1'
    );

    await page.screenshot({ path: './screenshots/Puppeteer-evercheck.png' });
    await browser.close();

    console.timeEnd('puppeteerTime');
  } catch (err) {
    console.error('Puppeteer Error:', err);
  }
})();
