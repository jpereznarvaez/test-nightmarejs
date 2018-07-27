var Nightmare = require("nightmare");

var fs = require("fs");
var nightmare = Nightmare({
    maxWidth: 1204,
    maxHeight: 1800
});

var fileName = "./github.jpg";
console.time("Time");
return nightmare
    .viewport(1024, 600)
    .goto(
        "https://github.com"
    )
    .wait(9000)
    .screenshot(fileName)
    .end()
    .then(function () {
        console.log("Done!");
        console.timeEnd("Time");
    })
    .catch(err => {
        console.error("Error:", err);
        console.timeEnd("Time");
    });