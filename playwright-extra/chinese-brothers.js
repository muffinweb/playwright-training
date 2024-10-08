const fs = require("fs");

fetch("https://www.searates.com/tracking-system/reverse/tracking?route=true&last_successful=false&number=244609286&sealine=MAEU", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-referer": "https://www.chinese-brothers.com/"
    },
    "referrer": "https://www.chinese-brothers.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
}).then(res => res.json()).then((response) => {

    let json = response.data;
    let data = JSON.stringify(json);


    fs.writeFile('rawTS.json', data, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('output has been written successfully.');
        }
    });
})