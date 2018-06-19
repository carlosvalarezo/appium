var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
var randomstring = require("randomstring");

chai.use(chaiWebdriver(browser));

var nameOptions = {
  length: 12,
  charset: 'alphabetic'
};


describe('registration process', function() {
    it('should check the presence of nameId inputBox', function () {
 	    browser.screenshot();
            browser.waitForVisible('~nameId', 6000);
            chai.expect('~nameId').to.be.visible();
    });
    it('should check a green icon on nameId when it is filled', function() {
	    browser.setValue('~nameId', randomstring.generate(nameOptions));
	    var nameValue = browser.getText('~nameId');
 	    browser.screenshot();
	    chai.expect(nameValue).to.have.lengthOf(12);
    });
});
