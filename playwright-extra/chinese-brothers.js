import * as fs from "fs"

let trackingNumber = "ADL300122300"
let seaLine = "PCIU"
let fileNameWithCurrentTime = new Date().toLocaleString().replaceAll(':', '-') + "-raw.json"

fetch(`https://www.searates.com/tracking-system/reverse/tracking?route=false&last_successful=false&number=${trackingNumber}&sealine=${seaLine}`, {
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

    let json = response;
    let data = JSON.stringify(json);

    fs.writeFile(fileNameWithCurrentTime, data, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Output has been written successfully.');
        }
    })

})