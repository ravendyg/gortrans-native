## Gortrans mobile app

Don't remember how many times I started it in different variations )).


### Smth that could be helpful

to make it work

./node_modules/react-native/packager/packager.sh start --resetCache

### Build the bastard

- copy from gradle.properties.to.copy to gradle.propertie
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=***
MYAPP_RELEASE_KEY_PASSWORD=***

- change comments on SYSTEM_ALERT_WINDOW permission

- rm -rf node_modules && npm install

- npm cache clean

- node_modules/react-native/packager/packager.sh --reset-cache

- cd android && ./gradlew assembleRelease

Thanks to https://github.com/facebook/react-native/issues/4968 and https://shift.infinite.red/what-sucks-about-react-native-c38a307a210f

#### ENOSPC
http://stackoverflow.com/questions/22475849/node-js-error-enospc