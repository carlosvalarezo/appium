var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

describe('start the app', function() {
    it('should check if the app is installed', function () {
	    //var screen = $('//MainView');
	     //browser.background(3);
            //browser.swipeLeft("MainView",100);
	    //var isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
	    //assert(isAppInstalled.value, true);
    	    //console.log("lorenxo...",isAppInstalled); // outputs: true
	    //ios//android//browser.background(3);
            //browser.swipeLeft("MainView",100);
            //browser.waitForVisible('~MainView', 10000);
            //var isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
            //assert(browser.isVisible('~MainView'), true);
            //console.log("lorenxo...",isAppInstalled); // outputs: true
            //browser.swipe('~MainView',10,20,3);
            //ios//browser.execute('mobile: swipe', {direction: 'left'});
            //ios//browser.execute('mobile: swipe', {direction: 'left'});
            //browser.screenshot();
	    //browser.waitForVisible('~nameId', 9000);
	    //browser.screenshot();
	    //browser.waitForVisible('~MainView', 9000);
	    //browser.execute('mobile: swipe', {startX: '0.01',startY:'0.5', endX: '0.5', endY: '0.5', duration:'2.5'});
	    //browser.touchAction(['press',{options:{action:'moveTo', x:200,y:0}}, 'release']);
	    //browser.touchAction([
        //{ action: 'press', x: 20, y: 50 },
        //{ action: 'moveTo', x: -10, y: 30},
        //'release'
    //]);
	    //browser.waitForVisible('~nameId', 6000);
	    //var value = chai.expect('~nameId').to.be.visible();
	    //console.log('value...', value);
            var isAppInstalled = browser.isAppInstalled('org.nyumc.pickyeater');
	    if(!isAppInstalled.value){
		isAppInstalled = browser.isAppInstalled('com.pickyeatersapp'); 
	    }
            //console.log("log...",isAppInstalled);
            chai.expect(isAppInstalled.value, "something wrong...").to.be.true;
	});
});
