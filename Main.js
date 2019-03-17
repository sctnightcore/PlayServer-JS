
const Playserver = require('./src/PlayServer');
const Msg = require('./src/Msg');
const Anticaptcha = require('./src/Anticaptcha');
const File = require('./src/File');

main();
async function main() {
	console.log('\x1Bc');
	await Msg.banner();
	while (0 < 999) {
		try {
			// get img 
			const checksum = await Playserver.getimgpic();
			// save img
			await Playserver.saveimg(checksum);
			//Need to be test !
			const ans = await Anticaptcha.getanswer(checksum);
			// send answer to playserver 
			const time = await Playserver.sendanswer(checksum,ans);
			// del file 
			await File.delimg(checksum);
			//sleep 61 sec
			const delay = time.data.wait;
			console.log(`Sleep ${delay} sec!`);
			await sleep(delay);
		} catch (err) {
			console.log(err);
		}
	}
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}