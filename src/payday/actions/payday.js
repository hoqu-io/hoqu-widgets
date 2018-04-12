import AppConfig from 'AppConfig';
import { postRequest } from './../../../sdk/http/requests';

export const PAYDAY_POST = 'PAYDAY_POST';
export const PAYDAY_POST_SUCCESS = 'PAYDAY_POST_SUCCESS';
export const PAYDAY_POST_FAIL = 'PAYDAY_POST_FAIL';

export const paydayPost = (meta, data) => dispatch => {
  dispatch({
    type: PAYDAY_POST,
    data: data,
  });

  const widgetData = {
    "adId": AppConfig.AdId,
    "meta": JSON.stringify(meta),
    "data": data,
  };

  return postRequest('widget/submit', widgetData)
    .then((data) => {
      dispatch({
        type: PAYDAY_POST_SUCCESS,
        data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PAYDAY_POST_FAIL,
        error,
      });
    });
};
