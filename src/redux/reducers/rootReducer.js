import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import quizReducer from "./quizReducer";
import createReducer from "./createReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

export default store;
