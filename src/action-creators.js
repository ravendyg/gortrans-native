'use strict';

const Actions = {
  SHOW_BUS_SELECTOR: 1,
  UPDATE_BUS_DATA: 3,
};

const ActionCreators = {
  loadData() {
    return {
      type: Actions.UPDATE_BUS_DATA,
      payload: true
    };
  },

  showBusSelector() {
    return {
      type: Actions.SHOW_BUS_SELECTOR
    };
  }
};

module.exports = { Actions, ActionCreators };