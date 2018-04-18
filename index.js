const Config = require("./config")
const Clc = require("cli-color")
const Onoff = require("onoff")
const Gpio = Onoff.Gpio

const led1 = new Gpio(Config.led.bcm[0], "out")
const led2 = new Gpio(Config.led.bcm[1], "out")
const button = new Gpio(Config.button.bcm, "in", "both")

const option = process.argv[2]

if (option !== "-s") {
	Config.led.bcm.map((pin) => {
		console.log("My LED bound to", Clc.green(pin), 
			"Let's get started", 
			`with ${Clc.yellow('no')} argument.`)
	})

	console.log(`if u Wanna Hide log message use ${Clc.cyan("-s")} option When u Execute`)
}

const blink = (led, name) => {
	let mode = true
	let statusMessage = (value) => value == 1 ? "ON" : "OFF"
	let readButton = (mode, callback) => {
		button.read((error, value) => {
			let result = Config.led.off
			
			if (!error && Config.button.on == value) {
				result = Config.led.on
				console.log(`the button is ${Clc.greenBright("ON")} now`)
			} else {
				result = mode ? Config.led.on : Config.led.off
			}

			callback(error, result)
		})
	}

	return () => {
		readButton(mode, (error, result) => {
			led.write(result, (error) => {
				if (error) throw new Error(error)
				if (option !== "-s") {
					console.log(`changed ${Clc.white(name)} LED state to:`, Clc.red(statusMessage(result)))
				}
				mode = !mode
			})
		})
	}
}

setInterval(blink(led1, "Yello"), 500)
setInterval(blink(led2, "Red"), 250)

