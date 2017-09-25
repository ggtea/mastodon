import axios from 'axios';

export const SETTING_CHANGE = 'SETTING_CHANGE';

export function changeSetting(key, value) {
  return dispatch => {
    dispatch({
      type: SETTING_CHANGE,
      key,
      value,
    });

    dispatch(saveSettings());
  };
};

export function saveSettings() {
  return (_, getState) => {
    axios.put('/mstdn/api/web/settings', {
      data: getState().get('settings').toJS(),
    });
  };
};
