import { createContext } from 'react';

export const ModelBoundsContext = createContext({
    bounds: null,
    setBounds: () => { },
});