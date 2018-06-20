const host = '127.0.0.1';   // default appium host
const port = 4723;          // default appium port

const waitforTimeout = 60 * 60;
const waitforStart = 60 * 60000;
const commandTimeout = 30 * 60000;

const platform = process.env.npm_config_platform;
console.log("Tests on...", platform)

exports.config = {
    debug: false,
    specs: [
        './__tests__/specs/**/*.js',
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
            platformName: 'iOS',
            app: '/Users/cvalarezo/Documents/developer/picky-eaters/picky-eaters-app/ios/build/Build/Products/Debug-iphonesimulator/pickyEatersApp.app',          			   // path to your mobile app
            appPackage: 'org.nyumc.pickyeater',                        // package name of your app
            platformVersion: '11.4',              // iOS platform version
            deviceName: 'iPhone X',              // device name of the mobile simulator
            waitforTimeout: waitforTimeout,
            commandTimeout: commandTimeout,
            newCommandTimeout: 0,
	    noReset: true,
            automationName: 'XCUITest'
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
        startApp: ['./__tests__/specs/startApp/**.js'],
        registrationProcess: ['./__tests__/specs/registrationProcess/**.js --platform'+platform]
        
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

