const Jimp = require('jimp');
const Nightmare = require('nightmare');
const fs = require('fs');

var licenseNumber = process.argv[2];
var fecha = process.argv[3];
var profesion = process.argv[4];

if (!licenseNumber) process.exit();

var filename = `./OR_${profesion}_${licenseNumber}_${fecha.replace(
  /[/]/g,
  ''
)}.jpg`;

console.log(filename);

Nightmare({ show: true })
  .viewport(1024, 1000)
  .goto('https://osbn.oregon.gov/OSBNVerification/Default.aspx')
  .wait('#ctl00_MainContent_txtLicense')
  .insert('#ctl00_MainContent_txtLicense', licenseNumber)
  .click('#ctl00_MainContent_btnLicense')
  .wait(5000)
  .evaluate(licNumber => {
    let resultRows = document.querySelectorAll(
      '#ctl00_MainContent_gvSearchResult > tbody > tr'
    );

    for (const row of resultRows) {
      let webLicNumber =
        row.querySelector('td:nth-child(1) > a') &&
        row.querySelector('td:nth-child(1) > a').innerText;

      if (webLicNumber === licNumber) {
        row.querySelector('td:nth-child(1) > a').click();
        return true;
      }
    }
  }, licenseNumber)
  .wait('#gvLicenses')
  .evaluate(fech => {
    if (fech) {
      document.body.innerHTML = document.body.innerHTML
        .toString()
        .replace('08/24/2018', fech)
        .replace('8/24/2018', fech);
    }
  }, fecha)
  .wait(3000)
  .screenshot()
  .then(buffer => Jimp.read(buffer))
  .then(img => {
    return new Promise((res, rej) => {
      img.quality(85).write(filename, err => (err ? rej(err) : res()));
    });
  })
  .catch(e => {
    console.log(e);
  })
  .then(err => process.exit());
