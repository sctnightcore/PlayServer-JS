const fs = require('fs')
async function delimg(checksum) {
	try {
		await fs.unlinkSync(`./img/${checksum.data.checksum}.png`);
		console.error(`[DeleteImg]:${checksum.data.checksum}.png`);
	} catch(err) {
		console.error(err);
	}
}

module.exports.delimg = delimg;