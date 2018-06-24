const host = '127.0.0.1';   // default appium host
const port = 4723;          // default appium port

const waitforTimeout = 60 * 60;
const waitforStart = 60 * 60000;
const commandTimeout = 30 * 60000;

const platform = process.env.npm_config_platform;
const device = process.env.npm_config_device;
const startingTime = new Date();

const iosAppValid = '/Users/cvalarezo/Documents/developer/picky-eaters/picky-eaters-app/ios/build/Build/Products/Debug-iphonesimulator/pickyEatersApp.app';
const androidAppValid = '/Users/cvalarezo/Documents/developer/picky-eaters/picky-eaters-app/android/app/build/outputs/apk/app-debug.apk';


const iosApp = '/Users/carlos-valarezo-loaiza/Documents/developer/nyu/picky-eaters-app/ios/build/Build/Products/Debug-iphonesimulator/pickyEatersApp.app';

const androidApp = '/Users/carlos-valarezo-loaiza/Documents/developer/nyu/picky-eaters-app/android/app/build/outputs/apk/app-debug.apk';

var calculateTimeOfTesting = (currentTime) => {
	return (Math.round((currentTime - startingTime) / 1000)) / 60; 
}

exports.config = {
    debug: true,
    specs: [
       './__tests__/specs/**/*.js',
    ],
    reporters: ['spec','allure'],
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
            platformName: platform,
            app: platform === 'iOS' ? iosApp : androidApp,          			   // path to your mobile app
            appPackage: platform === 'iOS' ? 'org.nyumc.pickyeater' : 'com.pickyeatersapp',                        // package name of your app
            platformVersion: platform === 'iOS' ? '11.4' : '7.0' ,              // iOS platform version
            //deviceName: platform === 'iOS' ? 'iPhone X' : 'emulator-5554',              // device name of the mobile simulator
            deviceName: device,
	    waitforTimeout: waitforTimeout,
            commandTimeout: commandTimeout,
            newCommandTimeout: 0,
	    noReset: true,
	    fullReset: false,
	    automationName: platform === 'iOS' ? 'XCUITest' : 'UiAutomator2'           
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
        startApp: ['./__tests__/specs/00startApp/**.js'],
        registrationProcess: ['./__tests__/specs/01registrationProcess/**.js']
    }, 
    mochaOpts: {
	ui: 'bdd',
	timeout: 20000
    },

    /**
     * hooks help us execute the repeatitive and common utilities 
     * of the project.
     */
    onPrepare: function (config, capacbilities) {
        console.log('Test started on ', platform, ' at ', startingTime);
    },

    onComplete: function () {
        console.log('Test finished on ', platform);
	console.log('Time elapsed on testing', calculateTimeOfTesting(Date.now()), ' minutes');
    }

};

