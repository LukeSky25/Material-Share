const initialState = {
  user: false
};

export default function (state = initialState, action) {

  switch(action.type) {
    case 'LOGIN_REQUEST': {

      const newState = { ...state };
      newState.user = !newState.user;

      return newState;
    }

    default: {
      return state;
    }
  }

}
