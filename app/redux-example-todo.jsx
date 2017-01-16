var redux = require('redux');

console.log('starting todo redux example');

const stateDefault = {
    showCompleted: false,
    searchText: '',
    todoItems: []
};

//has to be a pure function
var reducer = (state = stateDefault, action) => {
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

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : (f) => {
            return f
        }
));

//subscribe to changes
var unsubscribe = store.subscribe(() => {

    console.log('currentState', store.getState());
    var state = store.getState();
    console.log('subscribe searchText', state.searchText);
    document.getElementById('app').innerHTML = state.searchText;

});

//unsubscribe();

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: '401k'
});


store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'love'
});
