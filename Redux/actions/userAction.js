import { actionTypes } from "../store/types";

export const storeAuthData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_AUTHDATA,
    payload: data,
  });
};

export const updatePincode = (pincodeData) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_PINCODE,
    payload: pincodeData,
  });
};
export const updateCart = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_CART,
    payload: data,
  });
};
export const toggleCart = () => (dispatch) => {
  dispatch({
    type: actionTypes.TOGGLE_CART,
  });
};

export const clearData = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_DATA,
  });
};
