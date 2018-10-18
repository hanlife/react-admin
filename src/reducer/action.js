import {
    ADD_TODO,
    SET_VISIBILITY_FILTER,
    TOGGLE_TODO,
    ADD_ASYNC
} from './type'

let nextTodoId = 0
export const event_addTodo = text => {
    return {
        type: ADD_TODO,
        id: nextTodoId++,
        text
    }
}

function async_add(text){
    return {
        type: ADD_ASYNC,
        id: nextTodoId++,
        text
    }
}
export const event_async = text => {
    return dispatch => {
        setTimeout(()=>{dispatch(async_add(text))},3000)
    }
    
}

export const event_setVisibilityFilter = filter => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}

export const event_toggleTodo = id => {
    return {
        type: TOGGLE_TODO,
        id
    }
}