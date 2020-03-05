'use strict';

import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const { BMDPedometer } = NativeModules;

const PedometerEmitter = new NativeEventEmitter(BMDPedometer);

export default {
  isStepCountingAvailable: callback => {
    BMDPedometer.isStepCountingAvailable(callback);
  },

  isDistanceAvailable: callback => {
    BMDPedometer.isDistanceAvailable(callback);
  },

  isFloorCountingAvailable: callback => {
    BMDPedometer.isFloorCountingAvailable(callback);
  },

  isPaceAvailable: callback => {
    BMDPedometer.isPaceAvailable(callback);
  },

  isCadenceAvailable: callback => {
    BMDPedometer.isCadenceAvailable(callback);
  },

  startPedometerUpdatesFromDate: (date, listener) => {
    BMDPedometer.startPedometerUpdatesFromDate(date);
    PedometerEmitter.addListener('pedometerDataDidUpdate', listener);
  },

  queryPedometerDataBetweenDates: (startDate, endDate, listener) => {
    if (Platform.OS === 'ios') {
      BMDPedometer.queryPedometerDataBetweenDates(startDate, endDate, (err, pedometerData) => {
        if (err) {
          listener(err);
        } else {
          listener(pedometerData);
        }
      });
    } else {
      BMDPedometer.queryPedometerDataBetweenDates(startDate, endDate, listener);
    }
  },

  stopPedometerUpdates: () => {
    BMDPedometer.stopPedometerUpdates();
  }
};
