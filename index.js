var Nightmare = require('nightmare');
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

    await page.screenshot({ path: './Puppeteer-evercheck.png' });

    console.timeEnd('puppeteerTime');

    console.error('Puppeteer Error:', err);
  } catch (e) {}
})();

(async () => {
  console.time('nightmareTime');

  var nightmare = Nightmare({
    maxWidth: 1204,
    maxHeight: 1800
  });

  await nightmare
    .viewport(1024, 600)
    .goto('https://evercheck.com/')
    .wait(
      'body > div.hero.will-load.wl-static.loaded > div > div > div.col-md-6.content-side.will-load.wl-from-bottom.loaded > h1'
    )
    .screenshot('./Nightmare-evercheck.png')
    .end()
    .then(function() {
      console.log('Nightmare Done!');
      console.timeEnd('nightmareTime');
    })
    .catch(err => {
      console.error('Nightmare Error:', err);
      console.timeEnd('nightmareTime');
    });
})();
