import { 
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    PLUS_CART
} from '../actions/types';

const INITIAL_STATE = { username: '', user_id: 0, email: '', error: '', loading: false, cookie: false, jumlahCart: 0 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return { ...INITIAL_STATE, username: action.payload.username, email: action.payload.email, cookie: true };
        case AUTH_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error: action.payload, cookie: true }
        case AUTH_LOADING :
            return { ...state, loading: true }
        case LOGOUT :
            return { ...INITIAL_STATE, cookie: true }
        case COOKIE_CHECKED :
            return { ...INITIAL_STATE, cookie: true }
        case PLUS_CART: 
            return{...state , jumlahCart : action.payload}  
        default :
            return state;
    }
}