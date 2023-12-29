import { createContext, useContext } from 'react';

export const Context = createContext({    
     search: '',
     setSearch: (auth) => { },
     searchRec: '',
     setSearchRec: (auth) => { },
     searchTop: '',
     setSearchTop: (auth) => { },
    
})