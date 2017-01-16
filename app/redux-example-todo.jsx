var redux = require('redux');

console.log('starting todo redux example');
var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

const stateDefault = {
    showCompleted: false,
    searchText: '',
    todoItems: [],
    map: {
        isFetching: true,
        url: undefined
    }
};


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

store.dispatch(actions.changeSearchText('Well'));

store.dispatch(actions.addTodoItem(
    {
        text: 'Get some milk',
        createDate: 3540,
        completed: false
    }
));

store.dispatch(actions.changeSearchText('Love'));

store.dispatch(actions.addTodoItem({
    text: 'Make a phone call to Zim',
    createDate: 5000,
    completed: false
}));

store.dispatch(actions.addTodoItem({
    text: 'Make supper',
    createDate: 35440,
    completed: false
}));

store.dispatch(actions.removeTodoItem(2));
//redux-thunk passes the store configuration to the called function
store.dispatch(actions.fetchLocation());