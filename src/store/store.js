import { configureStore } from '@reduxjs/toolkit';

import stateCameraReducer from './reducers/stateCamera';

const store = configureStore({
    reducer: {
        stateCamera: stateCameraReducer,
    },
});

export default store;