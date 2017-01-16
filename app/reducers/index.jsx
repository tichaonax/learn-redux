export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
    ;
};

var nextTodoItemId = 1;
export var todoItemReducer = (state = [], action) => {
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

export var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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