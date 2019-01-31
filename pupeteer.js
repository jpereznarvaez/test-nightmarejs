const Nightmare = require('nightmare');
/*
(async (license = '123') => {
  console.time(`Nightmare`);
  try {
    const nightmare = Nightmare({ show: false });

    await nightmare
      .viewport(1024, 1400)
      .goto(
        `https://www.asisvcs.com/services/registry/Detail_results.asp?license_number=${license}&general_prefix=NA&license_prefix=NA&CPCat=0725NURSE`
      )
      .wait('#mainContent')
      .then(() => {
        return nightmare.screenshot(`nightmare.jpg`);
      })
      .then(() => {
        console.timeEnd(`Nightmare`);
      })
      .catch(error => {})
      .then(() => nightmare.end());
  } catch (e) {}
})();*/

const puppeteer = require('puppeteer');

(async (license = '123') => {
  console.time(`Puppeter`);

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: false
    });

    const page = await browser.newPage();
    const page2 = await browser.newPage();

    await page2.goto('file://C:/projects/practice/scraper/test.html');
    await page.goto('https://www.google.com.co/');
    await page.waitForSelector(
      '#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input'
    );

    await page2.setViewport({
      width: 500,
      height: 500
    });

    await page.setViewport({
      width: 1024,
      height: 1400
    });

    await page2.screenshot({ path: `google.png` });
    await page.screenshot({ path: `test.jpg` });
    // await page2.close();
    console.timeEnd(`Puppeter`);
  } catch (e) {}
})();

/*
for (let i = 1; i <= 10; i++) {
  (async (license = '123') => {
    console.time(`${i}. Nightmare`);
    try {
      const nightmare = Nightmare({ show: false });

      await nightmare
        .viewport(1024, 1400)
        .goto(
          `https://www.asisvcs.com/services/registry/Detail_results.asp?license_number=${license}&general_prefix=NA&license_prefix=NA&CPCat=0725NURSE`
        )
        .wait('#mainContent')
        .then(() => {
          return nightmare.screenshot(`${i}.nightmare.jpg`);
        })
        .then(() => {
          console.timeEnd(`${i}. Nightmare`);
        })
        .catch(error => {});
      // .then(() => nightmare.end());
    } catch (e) {}
  })();
}
/*
  (async (license = '123') => {
    console.time(`${i}. Puppeter`);

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        `https://www.asisvcs.com/services/registry/Detail_results.asp?license_number=${license}&general_prefix=NA&license_prefix=NA&CPCat=0725NURSE`
      );
      await page.waitForSelector('#mainContent');

      await page.setViewport({
        width: 1024,
        height: 1400
      });
      await page.screenshot({ path: `${i}.puppeter.jpg` });

      // await browser.close();
      console.timeEnd(`${i}. Puppeter`);
    } catch (e) {}
  })();
} 

(async (license = '123') => {
  console.time(`${i}. Puppeter`);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.asisvcs.com/services/registry/Detail_results.asp?license_number=${license}&general_prefix=NA&license_prefix=NA&CPCat=0725NURSE`
    );
    await page.waitForSelector('#mainContent');

    await page.setViewport({
      width: 1024,
      height: 1400
    });
    await page.screenshot({ path: `puppeter.jpg` });

    // await browser.close();
    console.timeEnd(`Puppeter`);
  } catch (e) {}
})();*/
