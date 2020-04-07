import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import authReducer from './store/reducers/auth'
import mapReducer from './store/reducers/map'
import tasksReducer from './store/reducers/tasks'
import personnelReducer from './store/reducers/personnels'
import vehiclesReducer from './store/reducers/vehicles'
import notificationsReducer from './store/reducers/notification'
import descriptionReducer from './store/reducers/description'
import {
    watchAuth,
    watchMap,
    watchTasks,
    watchVehicles,
    watchPersonnels,
    watchNotifications,
    watchDescriptions,
} from './store/sagas'
import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    auth: authReducer,
    map: mapReducer,
    tasks: tasksReducer,
    vehicles: vehiclesReducer,
    personnels: personnelReducer,
    notifications: notificationsReducer,
    description: descriptionReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchMap)
sagaMiddleware.run(watchTasks)
sagaMiddleware.run(watchVehicles)
sagaMiddleware.run(watchPersonnels)
sagaMiddleware.run(watchNotifications)
sagaMiddleware.run(watchDescriptions)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
