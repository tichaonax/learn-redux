var redux = require('redux');
var axios = require('axios');

console.log('starting todo redux example');

const stateDefault = {
    showCompleted: false,
    searchText: '',
    todoItems: [],
    map: {
        isFetching: true,
        url: undefined
    }
};


// searchText reducer and action generators
// -----------------
var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
    ;
};

var changeSearchTextAction = (searchText) => {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText
    }
};


var nextTodoItemId = 1;
// TodoItems reducer and action generators
// -----------------
var todoItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO_ITEM':
            return [
                //preserve original todoItems then add a new one
                ...state,
                {
                    id: nextTodoItemId++,
                    completed: action.todoItem.completed,
                    text: action.todoItem.text,
                    createDate: action.todoItem.text
                }
            ];
        case 'REMOVE_TODO_ITEM':
            return state.filter((todoItem) => {
                return todoItem.id !== action.id
            });

        default:
            return state;
    }
    ;
};

var addTodoItemAction = (todoItem) => {
    return {
        type: 'ADD_TODO_ITEM',
        todoItem
    }
};


var removeTodoItemAction = (id) => {
    return {
        type: 'REMOVE_TODO_ITEM',
        id
    }
};

// Map reducer and action generators
// -----------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
    switch (action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined
            };
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            };
        default:
            return state;
    }
};

var startLocationFetchAction = () => {
    return {
        type: 'START_LOCATION_FETCH'
    };
};

var completeLocationFetchAction = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};

var fetchLocation = () => {
    store.dispatch(startLocationFetchAction());

    axios.get('http://ipinfo.io').then(function (res) {
        var loc = res.data.loc;
        var baseUrl = 'http://maps.google.com?q='

        store.dispatch(completeLocationFetchAction(baseUrl + loc));
    });
};

var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    todoItem: todoItemsReducer,
    map: mapReducer
});

//create store and load developer tools if they exist
var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : (f) => {
            return f
        }
));

//subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    document.getElementById('app').innerHTML = JSON.stringify(state);
    console.log('New store state', state);

    if (state.map.isFetching) {
        document.getElementById('app').innerHTML = 'Fetching location daata...';
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
    }

});

//unsubscribe();

store.dispatch(changeSearchTextAction('Well'));

store.dispatch(addTodoItemAction(
    {
        text: 'Get some milk',
        createDate: 3540,
        completed: false
    }
));

store.dispatch(changeSearchTextAction('Love'));

store.dispatch(addTodoItemAction({
    text: 'Make a phone call to Zim',
    createDate: 5000,
    completed: false
}));

store.dispatch(addTodoItemAction({
    text: 'Make supper',
    createDate: 35440,
    completed: false
}));

store.dispatch(removeTodoItemAction(2));

fetchLocation();