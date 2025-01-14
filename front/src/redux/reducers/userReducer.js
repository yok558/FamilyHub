import {
 USER_LOGIN, USER_LOGOUT, COOKIES_SAVE, USER_ADD_FAMILY 
} from '../actionNames/userActionNames';

const initState = {
  user: '',
  cookies: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload.user, cookies: action.payload.cookie };
    case USER_LOGOUT:
      return { ...state, user: '', cookies: '' };
    case COOKIES_SAVE:
      return { ...state, cookies: action.payload };
    case USER_ADD_FAMILY:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
