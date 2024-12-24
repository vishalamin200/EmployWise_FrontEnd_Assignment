import { configureStore } from "@reduxjs/toolkit";

import UserSlice from './UserSlice.js';

const Store = configureStore({
    reducer: {
        Auth: UserSlice,
    }
})

export default Store