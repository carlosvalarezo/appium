var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
var randomstring = require("randomstring");
var faker = require('faker');

chai.use(chaiWebdriver(browser));

var getName = () => {
	return faker.fake("{{name.firstName}}{{name.lastName}}") + String.fromCharCode(32) + faker.fake("{{name.firstName}}");
}

var getEmail = () => {
	return faker.internet.email();
}

describe('registration process', function() {
	describe('tests on name textbox', function(){
		it('should check the presence of nameId textBox', function () {
            		browser.screenshot();
			browser.waitForVisible("~nameId", 6000);
			console.log("platform on tests file...", process.env.npm_config_platform);
            		chai.expect('~nameId').to.be.visible();
    		});
    		it('should fill the textBox with id nameId correctly', function() {
			browser.click('~nameId');
			browser.screenshot();
			getName().split('').map(character  => browser.keys(character));
			browser.screenshot();
                        browser.hideDeviceKeyboard();
           		chai.expect('~validIcon').to.be.visible();
    		});
	});
	
	describe('tests on email textbox', function(){
		it('should check the presence of emailId textBox', function () {
			browser.screenshot();
                        chai.expect('~emailId').to.be.visible();
		});
		it('should check a green icon on emailId when it is filled correctly', function () {
			browser.click('~emailId');
			getEmail().split('').map(character => browser.keys(character));
			browser.screenshot();
                        browser.hideDeviceKeyboard();
                        var greenIcons = browser.elements('~validIcon');
                        console.log("greenicons...", greenIcons);
			chai.expect('~validIcon').to.have.count(3);
		});
	});
});
