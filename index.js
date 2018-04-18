const Config = require("./config")
const clc = require("cli-color")
const Onoff = require("onoff")
const Gpio = Onoff.Gpio

const led = new Gpio(Config.led.bcm, "out")
const option = process.argv[2]

if (option !== "-s") {
	console.log("My LED bound to", clc.green(Config.led.bcm), "Let's get started", `with ${clc.yellow('no')} argument.`)
	console.log(`if u Wanna Hide log message use ${clc.cyan('-s')} option When u Execute`)
}

const blink = () => {
	let mode = true
	let statusValue = (mode) => mode ? Config.led.on : Config.led.off
	let statusMessage = (mode) => mode ? "ON" : "OFF"

	return () => {
		led.write(statusValue(mode), (err) => {
			if (err) throw new Error(err)
			if (option !== "-s") {
				console.log("changed LED state to:", clc.red(statusMessage(mode)))
			}
			mode = !mode
		})
	}
}

setInterval(blink(), 500)
