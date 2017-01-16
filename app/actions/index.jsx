var axios = require('axios');

export var changeSearchText = (searchText) => {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText
    }
};

export var addTodoItem = (todoItem) => {
    return {
        type: 'ADD_TODO_ITEM',
        todoItem
    }
};


export var removeTodoItem = (id) => {
    return {
        type: 'REMOVE_TODO_ITEM',
        id
    }
};


export var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    };
};

export var completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};

export var fetchLocation = () => {
    //redux-thunk allows access to the dispatch function
    return (dispatch, getState) => {
        dispatch(startLocationFetch());

        axios.get('http://ipinfo.io').then(function (res) {
            var loc = res.data.loc;
            var baseUrl = 'http://maps.google.com?q='

            dispatch(completeLocationFetch(baseUrl + loc));
        });
    };
};