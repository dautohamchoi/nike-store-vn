
import axios from 'axios';
import { PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAIL, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from '../constants/productConstant';

const listProducts = (category = '', searchKeyWord = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const {data} = await axios.get(
      "/api/products?category=" + 
      category + "&searchKeyWord=" + searchKeyWord
    );
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: error})
  }
}

const detailProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error})
  }
}

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product});
    const { userSignin: { userInfo }} = getState();
    if (!product._id) {
      const { data } = await axios.post("/api/products" , product,
      {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data})
    } else {
      const { data } = await axios.put("/api/products/" + product._id, product, {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
    }

  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
  }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const { userSignin : { userInfo } } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/products/" + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
  }
}

export {listProducts, detailProduct, saveProduct, deleteProduct};