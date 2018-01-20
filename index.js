const PythonShell = require('python-shell');
const clapDetector = require('clap-detector');

const plugIp = process.env.PLUG_IP;
const plugPass = process.env.PLUG_PASS;
if(!plugIp || !plugPass) throw 'smart plug IP and password required';
console.log(plugIp, plugPass);

function plugSend(command) {
  console.log('command:', `plug.py ${command} ${plugIp} ${plugPass}`);
	PythonShell.run('plug.py', {args:[command, plugIp, plugPass]}, function (err) {
		if (err) throw err;
		console.log('Done.');
	});
}
plugSend('on');

//const clapConfig = {
// AUDIO_SOURCE: 'alsa hw:1,0'// default for linux
//};
//clapDetector.start(clapConfig);
// clapDetector.updateConfig({CLAP_ENERGY_THRESHOLD: 0.2});

clapDetector.start();

let nextSend = 'off';
clapDetector.onClaps(2, 1000, function(delay) {
  console.log('claps!!');
  plugSend(nextSend);
	nextSend = nextSend === 'on' ? 'off' : 'on';
});


