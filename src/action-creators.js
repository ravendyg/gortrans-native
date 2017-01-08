'use strict';

const Actions = {
  UPDATE_BUS_DATA: 3,
};

const ActionCreators = {
  loadData() {
    return {
      type: Actions.UPDATE_BUS_DATA,
      payload: true
    };
  },
};

module.exports = { Actions, ActionCreators };