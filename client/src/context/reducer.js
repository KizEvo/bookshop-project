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
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
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
} from './action'

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all value!',
      }
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
      }
    case REGISTER_USER_BEGIN:
      return { ...state, isLoading: true }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Success! Please verify your email to continue',
      }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case FETCH_USER:
      return {
        ...state,
        pageLoading: false,
        user: action.payload.user,
      }
    case FETCH_USER_ERROR:
      return { ...state, pageLoading: false, user: action.payload.user }
    case LOGIN_USER_BEGIN:
      return { ...state, isLoading: true }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Success, Welcome on board!',
        user: action.payload.user,
      }
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case FORGOT_PASSWORD_BEGIN:
      return { ...state, isLoading: true }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Success! Please check your email for reset password link',
      }
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case RESET_PASSWORD_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Password updated successfully! Redirecting....',
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: 'danger',
        alertType: action.payload.msg,
      }
    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User information updated successfully!',
        user: action.payload.user,
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case TOGGLE_ADMIN_SIDEBAR:
      return {
        ...state,
        showAdminSidebar: !state.showAdminSidebar,
      }
    case HANDLE_CHANGE_PRODUCT_GLOBAL:
      return {
        ...state,
        product: {
          ...state.product,
          [action.payload.name]: action.payload.value,
        },
      }
    case CREATE_PRODUCT_BEGIN:
      return { ...state, isLoading: true }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Success! A new product was created',
        product: {
          ...state.product,
          name: action.payload.name,
          price: action.payload.price,
          description: action.payload.description,
          author: action.payload.author,
          category: action.payload.category,
          image: action.payload.image,
        },
      }
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case FETCH_PRODUCT_BEGIN:
      return { ...state, isFetchingProduct: true, isLoading: true }
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetchingProduct: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        numberOfPages: action.payload.numberOfPages,
        isLoading: false,
      }
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        isFetchingProduct: false,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case SHOW_EDIT_MODAL:
      const editProduct = state.products.find(
        (product) => product._id === state.productId
      )
      return {
        ...state,
        showModal: true,
        product: {
          ...state.product,
          name: editProduct.name,
          price: editProduct.price,
          description: editProduct.description,
          author: editProduct.author,
          category: editProduct.category,
          image: editProduct.image,
        },
      }
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        showDeleteModal: false,
        product: {
          ...state.product,
          name: '',
          price: '0',
          author: '',
          description: '',
          image: '',
          category: 'adventure',
        },
      }
    case SET_PRODUCT_ID:
      return {
        ...state,
        productId: action.payload,
      }
    case UPDATE_PRODUCT_BEGIN:
      return { ...state, isLoading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Success! Product Updated',
      }
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case RE_FETCH_NEW_UPDATED_PRODUCTS:
      return {
        ...state,
        isProductUpdated: !state.isProductUpdated,
        showModal: false,
        showDeleteModal: false,
        product: {
          ...state.product,
          name: '',
          price: '0',
          author: '',
          description: '',
          image: '',
          category: 'adventure',
        },
      }
    case SHOW_DELETE_MODAL:
      const deleteProduct = state.products.find(
        (product) => product._id === state.productId
      )
      return {
        ...state,
        showDeleteModal: true,
        product: {
          ...state.product,
          name: deleteProduct.name,
          price: deleteProduct.price,
          description: deleteProduct.description,
          author: deleteProduct.author,
          category: deleteProduct.category,
          image: deleteProduct.image,
        },
      }
    case DELETE_PRODUCT_BEGIN:
      return { ...state, isLoading: true }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Product deleted!',
      }
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case SHOW_STATS_BEGIN:
      return { ...state, isLoading: true }
    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productStats: action.payload.productStats,
        totalUser: action.payload.totalUser,
        monthlyUser: action.payload.monthlyUser,
      }
    case GET_SEARCH_PRODUCT_INPUT:
      return {
        ...state,
        search: {
          ...state.search,
          name: action.payload.name || '',
          author: action.payload.author || '',
          category: action.payload.category || 'all',
          sort: action.payload.sort || 'newest',
          price: action.payload.price || 0,
        },
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case FETCH_SINGLE_PRODUCT_DETAIL_BEGIN:
      return { ...state, isLoading: true }
    case FETCH_SINGLE_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: {
          ...state.product,
          name: action.payload.name,
          price: action.payload.price,
          author: action.payload.author,
          description: action.payload.description,
          image: action.payload.image,
          category: action.payload.category,
        },
      }
    case FETCH_SINGLE_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case ADD_INFO_OF_PRODUCTS_TO_CART:
      const productAlreadyExistInCart = state.productsInCart.find(
        (product) => product.id === state.productId
      )

      if (productAlreadyExistInCart) {
        return {
          ...state,
          productsInCart: state.productsInCart.map((product) => {
            return product.id === state.productId
              ? {
                  ...product,
                  quantity: product.quantity + parseInt(action.payload),
                }
              : { ...product }
          }),
        }
      }

      const productAddedThroughItsDetailPage = {
        id: state.productId,
        name: state.product.name,
        quantity: action.payload,
        price: state.product.price,
        image: state.product.image,
      }
      return {
        ...state,
        productsInCart: [
          ...state.productsInCart,
          productAddedThroughItsDetailPage,
        ],
      }
    case GET_TOTAL_PRICE_OF_PRODUCTS_IN_CART:
      let totalPrice = 0
      for (let i = 0; i < state.productsInCart.length; i++) {
        totalPrice =
          totalPrice +
          state.productsInCart[i].price * state.productsInCart[i].quantity
      }
      return {
        ...state,
        totalPriceOfProductsInCart: totalPrice,
      }
    case ADD_INFO_OF_PRODUCTS_TO_CART_WITHOUT_GOING_INTO_ITS_DETAIL_PAGE:
      const matchedProduct = state.products.filter(
        (product) => product._id === state.productId
      )

      const productAlreadyInCart = state.productsInCart.find(
        (product) => product.id === state.productId
      )

      if (productAlreadyInCart) {
        return {
          ...state,
          productsInCart: state.productsInCart.map((product) => {
            return product.id === state.productId
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                }
              : { ...product }
          }),
        }
      }

      const productAddedThroughAddToCartButton = {
        id: state.productId,
        name: matchedProduct[0].name,
        quantity: 1,
        price: matchedProduct[0].price,
        image: matchedProduct[0].image,
      }
      return {
        ...state,
        productsInCart: [
          ...state.productsInCart,
          productAddedThroughAddToCartButton,
        ],
      }
    case 'DELETE_PRODUCT_CART':
      const newCart = state.productsInCart.filter(
        (product) => product.id !== action.payload
      )
      return { ...state, productsInCart: newCart }
    default:
      return state
  }
}
export default reducer
