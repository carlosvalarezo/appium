const host = '127.0.0.1';   // default appium host
const port = 4723;          // default appium port

const waitforTimeout = 30 * 60000;
const commandTimeout = 30 * 60000;

exports.config = {
    debug: false,
    specs: [
        './__tests__/specs/**/*.js',
    ],

    reporters: ['dot','allure'],
    reporterOptions: {
        allure: {
            outputDir: './allure-results/'
        }
    },

    host: host,
    port: port,

    maxInstances: 1,

    capabilities: [
        {
            appiumVersion: '1.8.1',                 // Appium module version
            browserName: '',                        // browser name is empty for native apps
            platformName: 'iOS',
            app: '/Users/cvalarezo/Documents/developer/picky-eaters/picky-eaters-app/ios/build/Build/Products/Debug-iphonesimulator/pickyEatersApp.app',          // Path to your native app
            appPackage: 'org.nyumc.pickyeater',  // Package name of your app
            platformVersion: '11.4',              // Android platform version of the device
            deviceName: 'iPhone X',              // device name of the mobile device
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
    }, 
    mochaOpts: {
	ui: 'bdd',
    },

    /**
     * hooks help us execute the repeatitive and common utilities 
     * of the project.
     */
    onPrepare: function (config, capacbilities) {
        console.log('<<< NATIVE APP TESTS STARTED >>>');
    },

    onComplete: function () {
        console.log('<<< TESTING FINISHED >>>');
    }

};

