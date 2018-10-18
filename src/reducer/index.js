import {
    combineReducers
} from 'redux';
import {
    ADD_TODO,
    SET_VISIBILITY_FILTER,
    TOGGLE_TODO,
    ADD_ASYNC
} from './type'

// 页面一redux
const data_todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case ADD_ASYNC:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map(todo =>
                (todo.id === action.id) ?
                { ...todo,
                    completed: !todo.completed
                } :
                todo
            )
        default:
            return state
    }
}

// 页面二redux
const data_visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}


// 整合reduer
const rootReducer = combineReducers({
    data_todos,
    data_visibilityFilter,
});

export default rootReducer;