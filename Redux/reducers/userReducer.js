import { actionTypes } from "../store/types";

export const initial = {
  userName: null,
  pincode: null,
  token: null,
  cart: [],
  isLoggedIn: false,
  openCart: false,
  email: "",
  name: "",
};

const userReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return Object.assign({}, state, {
        userName: action.payload,
      });

    case actionTypes.SET_PINCODE:
      return Object.assign({}, state, {
        pincode: action.payload,
      });

    case actionTypes.UPDATE_CART:
      return Object.assign({}, state, {
        cart: action.payload,
        openCart: true,
      });

    case actionTypes.TOGGLE_CART:
      return Object.assign({}, state, {
        openCart: !state.openCart,
      });

    case actionTypes.SET_AUTHDATA:
      return Object.assign({}, state, {
        token: action.payload.token,
        email: action.payload.email,
        name: action.payload.name,
        isLoggedIn: true,
      });

    case actionTypes.CLEAR_DATA:
      return Object.assign({}, state, initial);

    default:
      return Object.assign({}, state);
  }
};

export default userReducer;
