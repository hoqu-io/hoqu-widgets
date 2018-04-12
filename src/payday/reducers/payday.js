import { PAYDAY_POST, PAYDAY_POST_SUCCESS, PAYDAY_POST_FAIL } from './../actions/payday';

const initialState = {
  isSubmitting: false,
  item: null,
  error: null,
};

const reducers = (state = initialState, actionData = null) => {
  switch (actionData.type) {
    case PAYDAY_POST:
      return {
        ...state,
        isSubmitting: true,
        user: null,
      };

    case PAYDAY_POST_SUCCESS:
      return {
        ...state,
        item: actionData.data,
        isSubmitting: false,
        error: null,
      };

    case PAYDAY_POST_FAIL:
      return {
        ...state,
        isSubmitting: false,
        user: null,
        error: Object.assign({}, state.error, actionData.error),
      };

    default:
      return state;
  }
};

export default reducers;
