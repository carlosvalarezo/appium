const host = '127.0.0.1';   // default appium host
const port = 4723;          // default appium port

const waitforTimeout = 30 * 60000;
const commandTimeout = 30 * 60000;

exports.config = {
    debug: false,
    specs: [
        './__tests__/specs/startApp/**.js',
    ],
    reporters: ['spec','mochawesome'],
    reporterOptions: {
        allure: {
            outputDir: './allure-results/',
            includeScreenshots : true
        },
	mochawesome: {
	    outputDir: './mochawesome-results',
	    mochawesome_filename: 'myFile.json',
            includeScreenshots : true
	}
    },
    host: host,
    port: port,
    maxInstances: 1,
    capabilities: [
        {
            appiumVersion: '1.8.1',                 // appium version
            browserName: '',                        // browser name is empty for mobile apps
            platformName: 'Android',
            app: '/Users/cvalarezo/Documents/developer/picky-eaters/picky-eaters-app/android/app/build/outputs/apk/app-debug.apk',          			   // path to your mobile app
            appPackage: 'com.pickyeatersapp',                        // package name of your app
            platformVersion: '7.0',              // platform version
            deviceName: 'emulator-5554',              // device name of the mobile simulator
            waitforTimeout: waitforTimeout,
            commandTimeout: commandTimeout,
            newCommandTimeout: 30 * 60000,
        }
    ],

    services: ['appium'],
    appium: {
        waitStartTime: 6000,
        waitforTimeout: waitforTimeout,
        command: 'appium',
        logFileName: 'appium.log',
        args: {
            address: host,
            port: port,
            commandTimeout: commandTimeout,
            sessionOverride: true,
            debugLogSpacing: true
        }
    },

    /**
     * test configurations
     */
    logLevel: 'silent',
    coloredLogs: true,
    framework: 'mocha',          // mocha framework specified
    suites: {
        startApp: ['./__tests__/specs/startApp/start.spec.js']
	//registrationProcess: ['./__tests__/specs/registrationProcess/**.js']
    }, 
    mochaOpts: {
	ui: 'bdd',
    },

    /**
     * hooks help us execute the repeatitive and common utilities 
     * of the project.
     */
    onPrepare: function (config, capacbilities) {
        console.log('Test started');
    },

    onComplete: function () {
        console.log('Test finished');
    }

};

