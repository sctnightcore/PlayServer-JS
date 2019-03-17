const axios = require('axios');
const axiosFile = require('axios-file');
const colors = require('colors/safe');
require('dotenv').config();


/*get Img/ Save Img */
async function getimgpic() {
	try {
		return await axios.post(`http://playserver.co/index.php/Vote/ajax_getpic/${process.env.URL}`);
	} catch (err) {
		console.log(err);
	}
}

async function saveimg(checksum) {
	try {
		await axiosFile({url: `http://playserver.co/index.php/VoteGetImage/${checksum.data.checksum}`,method: 'get',savePath: `img/${checksum.data.checksum}.png`});
		console.error(colors.grey(`[GetImg/SaveImg]:${checksum.data.checksum}.png`));
	} catch (err) {
		console.log(err);
	}	
}

async function sendanswer(checksum,ans) {
	try {
		var data = `server_id=${process.env.SERVERID}&captcha=${ans}&gameid=${process.env.GAMEID}&checksum=${checksum.data.checksum}`;
		var headers = {
        	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        	'Referer': `http://playserver.in.th/index.php/Vote/prokud/${process.env.URL}`
        };
		let json = await axios.post(`http://playserver.co/index.php/Vote/ajax_submitpic/${process.env.URL}`, data, {headers: headers});
		if (json.data.success == true) {
			console.error(colors.green(`[Success]:${checksum.data.checksum}.png is ${ans}`));
		} else {
			console.error(colors.red(`[Fail]:${checksum.data.checksum}.png isn't ${ans}`));
		}
		return json;
	} catch (err) {
		console.log(err);
	}
}

module.exports.getimgpic = getimgpic;
module.exports.saveimg = saveimg;
module.exports.sendanswer = sendanswer;
