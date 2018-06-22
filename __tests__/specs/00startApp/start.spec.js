var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const platform = process.env.npm_config_platform;

var swipeAndTakeScreenshotAndroid = (view) => {
	browser.touchAction([
                        {action: 'press', x: 979, y: 151},
                        {action: 'moveTo', x: 10, y: 151},
                        'release'
                ]);
	//browser.screenshot();
	takeScreenShot();
}

var swipeAndTakeScreenshotiOS = (view) => {
	browser.execute('mobile: swipe', {direction: 'left'});
	browser.screenshot();
}

var clickButtoniOS = (element) => {
	browser.touchAction({
        	action: 'tap', x: 181, y:743
    	})

}

var takeScreenShot = () => {
    var screenshot = browser.saveScreenshot();
    fs.writeFileSync('./screenshots/myPhoto'+new Date()+'.png', screenshot);

    // save screenshot to file and receive as Buffer
    //screenshot = browser.saveScreenshot('./snapshot.png');

    // save screenshot to file
    //browser.saveScreenshot('./snapshot.png');
}

describe('start the app', function() {
        it('should check if the app is installed', function () {
            let isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
	    if(!isAppInstalled.value){
		isAppInstalled = browser.isAppInstalled('com.pickyeatersapp'); 
	    }
            chai.expect(isAppInstalled.value, "something wrong...").to.be.true;
	});

	it('should swipe the first five screens and checks registrationButton enabled', function () {
	   let views = ["suportersA", "supportersB", "aboutSectionA", "aboutSectionB", "aboutSectionC"];
	   browser.waitForVisible('~MainView', 9900);
	   platform === 'android' ? views.map(view => swipeAndTakeScreenshotAndroid()) : views.map(view => swipeAndTakeScreenshotiOS(view));
	   let element = browser.element('~accessibilityPEButton');
	   browser.waitForVisible(element.selector, 99000);	
	   chai.expect(element.selector).to.be.visible();		 
	});

	it('should take the user to the taskLaunch screen', function() {
	   let element = browser.element('~accessibilityPEButton');
           platform ==='iOS' ? clickButtoniOS(element) : element.click();
	   browser.waitForVisible('~taskLaunchView', 9990);
           chai.expect('~taskLaunchView').to.be.visible();		
	});
});
