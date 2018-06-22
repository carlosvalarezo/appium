var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
var randomstring = require("randomstring");
var faker = require('faker');
const platform = process.env.npm_config_platform;

chai.use(chaiWebdriver(browser));

var getName = () => {
	return faker.fake("{{name.firstName}}{{name.lastName}}") + String.fromCharCode(32) + faker.fake("{{name.firstName}}");
}

var getEmail = () => {
	return faker.internet.email();
}

xdescribe('registration process', function() {
	describe('tests on name textbox', function(){
		let component = '~nameId';
		it('should check the presence of nameId textBox', function () {
            		browser.screenshot();
			browser.waitForVisible(component, 6000);			
            		chai.expect(component).to.be.visible();
    		});
    		it('should fill the textBox with id nameId correctly', function() {
			browser.click(component);
			browser.screenshot();
			platform === 'ios' ? getName().split('').map(character  => browser.keys(character)) : browser.setValue(component, getName());
			browser.screenshot();
                        browser.hideDeviceKeyboard();
			let name = browser.getText(component);
			chai.expect(name).to.be.not.null;
           		//chai.expect('~validIcon').to.be.visible();
    		});
	});
	
	describe('tests on email textbox', function(){
		let component = '~emailId';
		it('should check the presence of emailId textBox', function () {
			browser.screenshot();
                        chai.expect(component).to.be.visible();
		});
		it('should check a green icon on emailId when it is filled correctly', function () {
			browser.click(component);
			platform === 'ios' ? getEmail().split('').map(character => browser.keys(character)) : browser.setValue(component, getEmail());
			browser.screenshot();
                        browser.hideDeviceKeyboard();
                        var greenIcons = browser.elements('~validIcon');
                        console.log("greenicons...", greenIcons);
			chai.expect('~validIcon').to.have.count(3);
		});
	});
});
