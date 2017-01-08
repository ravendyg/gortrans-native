'use strict';

import { AsyncStorage } from 'react-native';
import * as config from './config';

module.exports = {
  test
};

const data = {
  apiKey: '',
  routes: {
    routes: [],
    routeCodes: [],
    timestamp: 0
  },
  trasses: {
    trasses: {},
    timestamp: 0
  },
  stopsData: {
    stops: {},
    busStops: {}
  }
};

// get api key
AsyncStorage.getItem('@gortransStore:smallStrings')
.then( str => {
  var key, routesTimestamp, trassesTimestamp, lastUpdate;
  if (str === null) {
    key = Math.random().toString().slice(2);
    routesTimestamp = 0;
    trassesTimestamp = 0;
    lastUpdate = Date.now();
    AsyncStorage.setItem('@gortransStore:smallStrings', JSON.stringify({key, routesTimestamp, trassesTimestamp, lastUpdate}));
  } else {
    try {
      var {key, routesTimestamp, trassesTimestamp, lastUpdate} = JSON.parse(str);
    } catch (err) {

    }
  }
  data.apiKey = key;
  data.routes.timestamp = routesTimestamp;
  data.trasses.timestamp = trassesTimestamp;

  return lastUpdate;
})
.then( lastUpdate => {
  let now = Date.now();
  let makeFetch = now - lastUpdate > config.INFO_VALID_FOR ? true : false;

  return Promise.all([
    AsyncStorage.getItem('@gortransStore:routes').then(parseArray),
    AsyncStorage.getItem('@gortransStore:routeCodes')
      .then(parseArray)
      .then( routeCodes => {

        let calls = [Promise.resolve(null)];
        let trasses = {};

        for (let code of routeCodes) {
          calls.push(
            AsyncStorage.getItem('@gortransStore:trasses:' + code)
            .then(parseArray)
            .then( trass => {
              trasses[code] = trass;
            })
          );
        }

        return Promise.all(calls)
          .then( () => ({routeCodes, trasses}) )
          .catch( () => {} );
      }),
    AsyncStorage.getItem('@gortransStore:stops').then(parseObj),
    AsyncStorage.getItem('@gortransStore:busStops').then(parseObj),
    makeFetch
      ? fetch(`${config.URL}/${config.SYNC_ROUTE}?routestimestamp=${data.routes.timestamp}` +
        `&trassestimestamp=${data.trasses.timestamp}&&api_key=${data.apiKey}`)
        .then( resp => resp.json() )
        .catch( () => null )
      : Promise.resolve(null)
  ]);
})
.then( _data => {
  let [routes, {routeCodes, trasses}, stops, busStops, respJson] = _data;

  if (respJson) { // made successfull sync
    if (respJson.routes.timestamp > data.routes.timestamp) {
      routes = respJson.routes.routes;
      routeCodes = respJson.routes.routeCodes;
      data.routes.timestamp = respJson.routes.timestamp;

      AsyncStorage.setItem('@gortransStore:routes', JSON.stringify(routes));
      AsyncStorage.setItem('@gortransStore:routeCodes', JSON.stringify(routeCodes));
    }
    if (respJson.trasses.timestamp > data.trasses.timestamp) {
      trasses = respJson.trasses.trasses;
      stops = respJson.stopsData.stops;
      busStops = respJson.stopsData.busStops;
      data.trasses.timestamp = respJson.trasses.timestamp;

      // don't want to use file API
      for (let busCode of Object.keys(trasses)) {
        AsyncStorage.setItem('@gortransStore:trasses:' + busCode, JSON.stringify(trasses[busCode]));
      }
      AsyncStorage.setItem('@gortransStore:stops', JSON.stringify(stops));
      AsyncStorage.setItem('@gortransStore:busStops', JSON.stringify(busStops));
    }
    AsyncStorage.setItem('@gortransStore:smallStrings',
      JSON.stringify({key: data.key, routesTimestamp: data.routes.timestamp,
        trassesTimestamp: data.trasses.timestamp, lastUpdate: Date.now()})
    );
  }

  data.routes.routes = routes;
  data.trasses.trasses = trasses;
  data.stopsData.stops = stops;
  data.stopsData.busStops = busStops;
})
.catch(handeError);

function handeError(err) {
  console.error(err);
}


function test() {
  console.log('test');
}

function parseArray(arr) {
  let temp = [];
  try {
    temp = JSON.parse(arr || '[]');
  } catch (err) {}

  return temp;
}

function parseObj(obj) {
  let temp = {};
  try {
    temp = JSON.parse(obj || '{}');
  } catch (err) {}

  return temp;
}