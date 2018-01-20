const PythonShell = require('python-shell');

const plugIp = process.env.PLUG_IP;
const plugPass = process.env.PLUG_PASS;
const sleep = process.env.SLEEP_TIME_MS;
if(!plugIp || !plugPass || !sleep) throw 'env vars: smart plug IP and password and time required (PLUG_IP, PLUG_PASS, SLEEP_TIME_MS)';
console.log(plugIp, plugPass);

function plugSend(command) {
  console.log('plugSend', command, `plug.py ${command} ${plugIp} ${plugPass}`);
	PythonShell.run('plug.py', {args:[command, plugIp, plugPass]}, function (err) {
		if (err) throw err;
		console.log('Done.');
	});
}
plugSend('on');

let interval = null;
let isOff = false;
function wait() {
	console.log('wait', isOff, interval === null);
	if(isOff) plugSend('on');
	isOff = false;
	if(interval) clearTimeout(interval);
	interval = setTimeout(() => {
		plugSend('off');
		isOff = true;
	}, sleep);
}
const { exec } = require('child_process');
const audioSource = 'alsa hw:0,0';
const command = `./sox.sh ${audioSource}`;
function listen() {
	console.log('command:', command);

	exec(command, (err, stdout, stderr) => {
		  if (err) {
			      console.error(err);
			      return;
			    }
		wait();
		listen();
	});
}
wait();
listen();


