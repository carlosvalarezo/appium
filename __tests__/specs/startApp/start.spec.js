var assert = require('assert');

describe('webdriver.io page', function() {
    it('should have the right title - the fancy generator way', function () {
	    //browser.background(3);
            //browser.swipeLeft("MainView",100);
	    //var isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
	    //assert(isAppInstalled.value, true);
    	    //console.log("lorenxo...",isAppInstalled); // outputs: true
	    browser.background(3);
            //browser.swipeLeft("MainView",100);
            //browser.waitForVisible('~MainView', 10000);
            //var isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
            //assert(browser.isVisible('~MainView'), true);
            //console.log("lorenxo...",isAppInstalled); // outputs: true
            //browser.swipe('~MainView',10,20,3);
            browser.execute('mobile: swipe', {direction: 'left'});
            browser.execute('mobile: swipe', {direction: 'left'});
            //browser.waitForVisible('~MainView', 10000);
    });
});
