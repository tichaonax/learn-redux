var redux = require('redux');
var thunk = require('redux-thunk').default;
var {searchTextReducer, todoItemReducer, mapReducer} = require('./../reducers/index');

export var configure =()=>{
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        todoItem: todoItemReducer,
        map: mapReducer
    });

//create store and load developer tools if they exist
//redux-thunk provides support for store configuration from functions
    var store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => {
                return f
            }
    ));

    return store;
};