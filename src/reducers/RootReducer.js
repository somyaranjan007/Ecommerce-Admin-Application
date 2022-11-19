import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import categoryReducer from "./CategoryReducer";
import productReducer from "./ProductReducer";
import BannerReducer from "./BannerReducer";


const rootReducer = combineReducers({
    login: loginReducer,
    category: categoryReducer,
    product: productReducer,
    banner: BannerReducer
});

export default rootReducer;