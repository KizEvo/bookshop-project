import React, { useContext, useReducer, useEffect, useCallback } from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  FETCH_USER,
  FETCH_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  TOGGLE_ADMIN_SIDEBAR,
  HANDLE_CHANGE_PRODUCT_GLOBAL,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  SHOW_EDIT_MODAL,
  SET_PRODUCT_ID,
  CLOSE_MODAL,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  RE_FETCH_NEW_UPDATED_PRODUCTS,
  SHOW_DELETE_MODAL,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  GET_SEARCH_PRODUCT_INPUT,
  CHANGE_PAGE,
  FETCH_SINGLE_PRODUCT_DETAIL_BEGIN,
  FETCH_SINGLE_PRODUCT_DETAIL_SUCCESS,
  FETCH_SINGLE_PRODUCT_DETAIL_ERROR,
  ADD_INFO_OF_PRODUCTS_TO_CART,
  GET_TOTAL_PRICE_OF_PRODUCTS_IN_CART,
  ADD_INFO_OF_PRODUCTS_TO_CART_WITHOUT_GOING_INTO_ITS_DETAIL_PAGE,
  DELETE_PRODUCT_IN_CART,
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_PERSONAL_USER_ORDERS_BEGIN,
  GET_PERSONAL_USER_ORDERS_SUCCESS,
  GET_PERSONAL_USER_ORDERS_ERROR,
  USER_IS_NOT_LOGGED_IN,
  GET_ALL_ORDERS_ADMIN_BEGIN,
  GET_ALL_ORDERS_ADMIN_SUCCESS,
  GET_ALL_ORDERS_ADMIN_ERROR,
  GET_SINGLE_ORDER_ADMIN_BEGIN,
  GET_SINGLE_ORDER_ADMIN_SUCCESS,
  GET_SINGLE_ORDER_ADMIN_ERROR,
} from './action'

const initialState = {
  isFetchingProduct: false,
  isProductUpdated: false,
  pageLoading: true,
  showModal: false,
  showDeleteModal: false,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  showAdminSidebar: false,
  totalUser: {},
  totalProducts: 0,
  numberOfPages: 1,
  numberOfPagesOrders: 1,
  page: 1,
  monthlyUser: [],
  totalPriceOfProductsInCart: 0,
  productsInCart: [],
  productStats: {},
  productId: '',
  products: [],
  product: {
    name: '',
    price: '0',
    author: '',
    description: '',
    image: '',
    category: 'adventure',
    categories: [
      'adventure',
      'classic',
      'mystery',
      'fantasy',
      'historical',
      'horror',
      'sci-fi',
    ],
  },
  search: {
    name: '',
    author: '',
    sort: 'newest',
    category: 'all',
    price: 0,
  },
  userPersonalOrders: [],
  adminAllOrders: [],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 4000)
  }

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      await axios.post('/api/v1/auth/register', currentUser)
      dispatch({ type: REGISTER_USER_SUCCESS })
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)
      const { user } = data
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout')
    } catch (error) {
      console.log(error)
    }
  }

  const forgotPasswordUser = async (currentUser) => {
    dispatch({ type: FORGOT_PASSWORD_BEGIN })
    try {
      await axios.post('/api/v1/auth/forgot-password', currentUser)
      dispatch({ type: FORGOT_PASSWORD_SUCCESS })
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const verifyResetPasswordUser = async (newPassword) => {
    dispatch({ type: RESET_PASSWORD_BEGIN })
    try {
      await axios.post('/api/v1/auth/reset-password', newPassword)
      dispatch({ type: RESET_PASSWORD_SUCCESS })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const updateUser = async (newUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await axios.patch('/api/v1/user/updateUser', newUser)
      const { user } = data

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } })
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const toggleAdminSidebar = () => {
    dispatch({ type: TOGGLE_ADMIN_SIDEBAR })
  }

  const handleChangeProductGlobal = (name, value) => {
    dispatch({ type: HANDLE_CHANGE_PRODUCT_GLOBAL, payload: { name, value } })
  }

  const createProduct = async (formData) => {
    dispatch({ type: CREATE_PRODUCT_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/products', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.product })
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
    setTimeout(() => {
      dispatch({ type: CLOSE_MODAL })
    }, 4000)
  }

  const getSearchProductInput = (query) => {
    dispatch({ type: GET_SEARCH_PRODUCT_INPUT, payload: query })
  }

  const fetchSingleProduct = async (abortController, productId) => {
    dispatch({ type: FETCH_SINGLE_PRODUCT_DETAIL_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/products/${productId}`, {
        signal: abortController.signal,
      })
      const { product } = data
      dispatch({
        type: FETCH_SINGLE_PRODUCT_DETAIL_SUCCESS,
        payload: product,
      })
    } catch (error) {
      if (!abortController.signal.aborted) {
        dispatch({
          type: FETCH_SINGLE_PRODUCT_DETAIL_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
  }

  const fetchProduct = async (abortController) => {
    dispatch({ type: FETCH_PRODUCT_BEGIN })
    try {
      const { data } = await axios.get(
        `/api/v1/products?name=${state.search.name}&author=${state.search.author}&category=${state.search.category}&sort=${state.search.sort}&price=${state.search.price}&page=${state.page}`,
        {
          signal: abortController.signal,
        }
      )
      const { products, totalProducts, numberOfPages } = data
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: { products, totalProducts, numberOfPages },
      })
    } catch (error) {
      if (!abortController.signal.aborted) {
        dispatch({
          type: FETCH_PRODUCT_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
  }

  const updateProduct = async (formData) => {
    dispatch({ type: UPDATE_PRODUCT_BEGIN })
    try {
      await axios.patch(`/api/v1/products/${state.productId}`, formData)
      dispatch({ type: UPDATE_PRODUCT_SUCCESS })
      setTimeout(() => {
        dispatch({ type: RE_FETCH_NEW_UPDATED_PRODUCTS })
      }, 2000)
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const deleteProduct = async () => {
    dispatch({ type: DELETE_PRODUCT_BEGIN })
    try {
      await axios.delete(`/api/v1/products/${state.productId}`)
      dispatch({ type: DELETE_PRODUCT_SUCCESS })
      setTimeout(() => {
        dispatch({ type: RE_FETCH_NEW_UPDATED_PRODUCTS })
      }, 2000)
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const addProductToCartInItsDetailPage = async (amount) => {
    dispatch({
      type: ADD_INFO_OF_PRODUCTS_TO_CART,
      payload: amount,
    })
    dispatch({
      type: GET_TOTAL_PRICE_OF_PRODUCTS_IN_CART,
    })
  }

  const addProductToCartWithoutGoingIntoItsDetailPage = () => {
    dispatch({
      type: ADD_INFO_OF_PRODUCTS_TO_CART_WITHOUT_GOING_INTO_ITS_DETAIL_PAGE,
    })
    dispatch({
      type: GET_TOTAL_PRICE_OF_PRODUCTS_IN_CART,
    })
  }

  const deleteProductInCart = (productId) => {
    dispatch({ type: DELETE_PRODUCT_IN_CART, payload: productId })
  }

  const showStats = async (abortController) => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await axios.get('/api/v1/products/stats', {
        signal: abortController.signal,
      })
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          productStats: data.defaultValue,
          totalUser: data.totalUser,
          monthlyUser: data.monthlyUser,
        },
      })
    } catch (error) {
      if (!abortController.signal.aborted) {
        console.log(error.response.data)
      }
    }
  }

  const createOrder = async () => {
    dispatch({ type: CREATE_ORDER_BEGIN })
    try {
      await axios.post('/api/v1/order', {
        productsInCart: state.productsInCart,
      })
      dispatch({ type: CREATE_ORDER_SUCCESS })
    } catch (error) {
      dispatch({ type: CREATE_ORDER_ERROR, payload: error.response.data })
    }
    clearAlert()
  }

  const getPersonalUserOrders = useCallback(async (abortController) => {
    dispatch({ type: GET_PERSONAL_USER_ORDERS_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/order/getPersonalUserOrders`, {
        signal: abortController.signal,
      })
      dispatch({
        type: GET_PERSONAL_USER_ORDERS_SUCCESS,
        payload: data.orders,
      })
    } catch (error) {
      if (!abortController.signal.aborted) {
        dispatch({
          type: GET_PERSONAL_USER_ORDERS_ERROR,
          payload: error.response.data,
        })
      }
    }
    clearAlert()
  }, [])

  const getSingleOrderAdmin = async (orderId) => {
    dispatch({ type: GET_SINGLE_ORDER_ADMIN_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/order?orderId=${orderId}`)
      dispatch({ type: GET_SINGLE_ORDER_ADMIN_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ORDER_ADMIN_ERROR,
        payload: error.response.data.msg,
      })
    }
    clearAlert()
  }

  const getAllOrdersAdmin = useCallback(async (abortController, page) => {
    dispatch({ type: GET_ALL_ORDERS_ADMIN_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/order?page=${page}`, {
        signal: abortController.signal,
      })
      dispatch({ type: GET_ALL_ORDERS_ADMIN_SUCCESS, payload: data })
    } catch (error) {
      if (!abortController.signal.aborted) {
        dispatch({
          type: GET_ALL_ORDERS_ADMIN_ERROR,
          payload: error.response.data,
        })
      }
    }
    clearAlert()
  }, [])

  const userIsNotLoggedIn = () => {
    dispatch({ type: USER_IS_NOT_LOGGED_IN })
    clearAlert()
  }

  const showEditModal = () => {
    dispatch({ type: SHOW_EDIT_MODAL })
  }
  const toggleDeleteModal = () => {
    dispatch({ type: SHOW_DELETE_MODAL })
  }
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL })
  }
  const setProductId = (id) => {
    dispatch({ type: SET_PRODUCT_ID, payload: id })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: page })
  }
  useEffect(() => {
    const abortController = new AbortController()
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/v1/user/showMe', {
          signal: abortController.signal,
        })
        const { user } = data
        dispatch({ type: FETCH_USER, payload: { user } })
      } catch (error) {
        if (!abortController.signal.aborted) {
          dispatch({ type: FETCH_USER_ERROR, payload: { user: null } })
        }
      }
    }
    fetchUser()
    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        forgotPasswordUser,
        verifyResetPasswordUser,
        updateUser,
        toggleAdminSidebar,
        handleChangeProductGlobal,
        createProduct,
        fetchProduct,
        showEditModal,
        closeModal,
        toggleDeleteModal,
        setProductId,
        updateProduct,
        deleteProduct,
        showStats,
        getSearchProductInput,
        changePage,
        fetchSingleProduct,
        addProductToCartInItsDetailPage,
        addProductToCartWithoutGoingIntoItsDetailPage,
        deleteProductInCart,
        createOrder,
        getPersonalUserOrders,
        userIsNotLoggedIn,
        getSingleOrderAdmin,
        getAllOrdersAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }
