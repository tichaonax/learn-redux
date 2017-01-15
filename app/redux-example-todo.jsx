var redux = require('redux');

console.log('starting todo redux example');

const stateDefault = {
    showCompleted: false,
    searchText: '',
    todoItems: []
};

//has to be a pure function
var reducer = (state = stateDefault
    , action) => {


    return state;
}

var store = redux.createStore(reducer);

console.log('currentState', store.getState());

