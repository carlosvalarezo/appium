var assert = require('assert');

describe('webdriver.io page', function() {
    it('should have the right title - the fancy generator way', function () {
	    browser.background(3);
            //browser.swipeLeft("MainView",100);
	    var isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
	    assert(isAppInstalled.value, true);
    	    console.log("lorenxo...",isAppInstalled); // outputs: true
    });
});
