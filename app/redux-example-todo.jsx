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

    console.log('New action :', action);

    switch (action.type) {

        //use the spread operator to preserve the old state
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            }
            break
        default:
            return state;
            break;
    }
}

var store = redux.createStore(reducer);

console.log('currentState', store.getState());

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: '401k'
});

console.log('currentState', store.getState());

