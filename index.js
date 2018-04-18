const Config = require("./config")
const Clc = require("cli-color")
const Onoff = require("onoff")
const Gpio = Onoff.Gpio

const led1 = new Gpio(Config.led.bcm[0], "out")
const led2 = new Gpio(Config.led.bcm[1], "out")

const option = process.argv[2]

if (option !== "-s") {
	Config.led.bcm.map((pin) => {
		console.log("My LED bound to", Clc.green(pin), "Let's get started", 
			`with ${Clc.yellow('no')} argument.`)
	})

	console.log(`if u Wanna Hide log message use ${Clc.cyan('-s')} option When u Execute`)
}

const blink = (led, name) => {
	let mode = true
	let statusValue = (mode) => mode ? Config.led.on : Config.led.off
	let statusMessage = (mode) => mode ? "ON" : "OFF"

	return () => {
		led.write(statusValue(mode), (err) => {
			if (err) throw new Error(err)
			if (option !== "-s") {
				console.log(`changed ${Clc.white(name)} LED state to:`, Clc.red(statusMessage(mode)))
			}
			mode = !mode
		})
	}
}

setInterval(blink(led1, "Yello"), 500)
setInterval(blink(led2, "Red"), 250)

