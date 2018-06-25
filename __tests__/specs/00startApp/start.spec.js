const devices = require ('../../../devices/devices');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
const platform = process.env.npm_config_platform;
const device = devices.filter(device => device.name === process.env.npm_config_device);
const save = require('save-file');


console.log('device...', device);
chai.use(chaiWebdriver(browser));

var screenshotNumber = -1;

const getFolderName = () => {
	const currentDate = new Date();
	return currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear();
}

const getFileName = () => {
	return 'screenshots/'+platform+'/'+getFolderName()+'/'+device+'/'+browser.sessionId+'/'+("0" + getScreenshotNumber()).slice(-2)+'_screenshot_'+getFolderName()+'.png';
}

const getScreenshotNumber = () => {
	return screenshotNumber += 1;
}

const swipeAndTakeScreenshotAndroid = () => {
	takeScreenshot();
	browser.touchAction([
                        {action: 'press', x: 600, y: 200},
                        {action: 'moveTo', x: 5, y: 200},
                        'release'
                ]);
}

const swipeAndTakeScreenshotiOS = () => {
	takeScreenshot();
	browser.execute('mobile: swipe', {direction: 'left'});
}

const clickButtoniOS = (device) => {
	console.log("buttons...", device[0]);
	browser.touchAction({
        	action: 'tap', x: device[0].buttons[0].x, y:device[0].buttons[0].y		
    	});
}

const setupScreenshot = () => {
	let screenshot = browser.saveScreenshot();
        save(screenshot, getFileName());
}

const takeScreenshot = () => {
    	let screenshot = browser.saveScreenshot();
        save(screenshot, getFileName());
}

describe('start the app', function() {
        it('should check if the app is installed', function () {
            let isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
	    if(!isAppInstalled.value){
		isAppInstalled = browser.isAppInstalled('com.pickyeatersapp'); 
	    }
            chai.expect(isAppInstalled.value).to.be.true;
	});

	it('should swipe the first five screens and checks registrationButton enabled', function () {
	   let views = ["suportersA", "supportersB", "aboutSectionA", "aboutSectionB", "aboutSectionC"];
	   browser.waitForVisible('~MainView', 9900);
	   platform === 'iOS' ? views.map(view => swipeAndTakeScreenshotiOS(view)) : views.map(view => swipeAndTakeScreenshotAndroid(view));
	   let element = browser.element('~aboutStartButton');
	   browser.waitForVisible(element.selector, 99000);	
	   chai.expect(element.selector).to.be.visible();		 
	});

	it('should take the user to the taskLaunch screen', function() {
           let element = browser.element('~aboutStartButton');
	   platform ==='iOS' ? clickButtoniOS(device) : element.click();
	   browser.waitForVisible('~taskLaunchView', 9900);
	   if (browser.isVisible('~taskLaunchView')) { takeScreenshot(); }
           chai.expect('~taskLaunchView').to.be.visible();		
	});
});
