import { configureStore } from "@reduxjs/toolkit";

import UserSlice from './UserSlice.js';

const Store = configureStore({
    reducer: {
        User: UserSlice,
    }
})

export default Store