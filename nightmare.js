const Nightmare = require('nightmare');

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
    .screenshot('./screenshots/Nightmare-evercheck.png')
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
