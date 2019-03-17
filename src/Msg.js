const colors = require('colors/safe');
async function banner() {
	console.log(colors.rainbow("========================="));
	console.log(colors.rainbow("PlayServer-Javascript"));
	console.log(colors.rainbow("========================="));
}

module.exports.banner = banner;