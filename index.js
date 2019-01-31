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

    await page.goto('https://github.com');
    await page.waitForSelector(
      'body > div.application-main > div.py-6.py-sm-8.jumbotron-codelines > div > div > div.col-md-7.text-center.text-md-left > h1'
    );

    await page.screenshot({ path: './Puppeteer-github.png' });

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
    .goto('https://github.com')
    .wait(
      'body > div.application-main > div.py-6.py-sm-8.jumbotron-codelines > div > div > div.col-md-7.text-center.text-md-left > h1'
    )
    .screenshot('./Nightmare-github.png')
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
