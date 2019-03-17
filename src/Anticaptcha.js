const anticaptcha = require('anticaptcha-async');
const fs = require('fs');
require('dotenv').config();

async function getanswer(checksum) {
	try {
		const client = anticaptcha(process.env.AntiCaptchakey);
	    const result = await client.getImage(fs.createReadStream(`./img/${checksum.data.checksum}.png`), {
	        restriction: {
	            minLength: 5,
	            maxLength: 5,
	        },
	    });
	    const ans = result.getValue();
	    console.error(`[Anti-captcha.com]:${checksum.data.checksum}.png is ${ans}`);
	    return ans;
	} catch (err) {
		console.log(err);
	}
}		

module.exports.getanswer = getanswer;