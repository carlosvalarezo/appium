# Description
This project is an example to test iOS Apps using Appium and webdriverio as javascript client.

# Running the example
```
npm install -g appium
npm install
```
Change the **wdio.ios.app.config.js** file according to your needs

```
appium
wdio 

```
npm run --platform="android" --device="emulator-5554" testapp
npm run --platform="iOS" --device="iPhone X" testapp
