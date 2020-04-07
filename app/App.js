import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ToastContainer, Slide } from 'react-toastify'
import { theme, StyledPage, GlobalStyle } from './components/styles/Theme'
import PrivateRoute from './hoc/PrivateRoute'
import Spinner from './components/Spinner'
import 'react-toastify/dist/ReactToastify.min.css'

const Login = React.lazy(() => import('./components/Login'))
const Home = React.lazy(() => import('./components/Home'))
const Map = React.lazy(() => import('./components/Map'))
const Tasks = React.lazy(() => import('./components/Tasks'))
const Gems = React.lazy(() => import('./components/Gems'))
const Personnels = React.lazy(() => import('./components/Personnels'))
const MissionDetail = React.lazy(() => import('./components/MissionDetail'))
const OperatorDrillDetail = React.lazy(() => import('./components/OperatorDrillDetail'))
const OperatorDetail = React.lazy(() => import('./components/OperatorDetail'))
const DriverDetail = React.lazy(() => import('./components/DriverDetail'))
const Vehicles = React.lazy(() => import('./components/Vehicles'))
const TruckDetail = React.lazy(() => import('./components/TruckDetail'))
const ExcavatorDetail = React.lazy(() => import('./components/ExcavatorDetail'))
const DrillDetail = React.lazy(() => import('./components/DrillDetail'))
const DefaultVehicleDetail = React.lazy(() => import('./components/DefaultVehicleDetail'))
const Reports = React.lazy(() => import('./components/Reports'))
const Notifications = React.lazy(() => import('./components/Notifications'))
const Settings = React.lazy(() => import('./components/Settings/index'))
const GemChart = React.lazy(() => import('./components/GemChart'))

export default () => {
    const authenticated = useSelector(state => state.auth.authenticated)

    return (
        <ThemeProvider theme={theme}>
            <StyledPage>
                <Router>
                    <React.Suspense fallback={<Spinner />}>
                        <Switch>
                            <PrivateRoute path="/" exact component={Home} />
                            <PrivateRoute path="/map" component={Map} />
                            <PrivateRoute path="/tasks" component={Tasks} />
                            <PrivateRoute path="/gem" component={Gems} />
                            <PrivateRoute path="/gemchart" component={GemChart} />
                            <PrivateRoute path="/personnels/detail/operatordrill" component={OperatorDrillDetail} />
                            <PrivateRoute path="/personnels/detail/operator" component={OperatorDetail} />
                            <PrivateRoute path="/personnels/detail/driver" component={DriverDetail} />
                            <PrivateRoute path="/personnels/detail/mission" component={MissionDetail} />
                            <PrivateRoute path="/personnels" component={Personnels} />
                            <PrivateRoute path="/vehicles/detail/truck" component={TruckDetail} />
                            <PrivateRoute path="/vehicles/detail/excavator" component={ExcavatorDetail} />
                            <PrivateRoute path="/vehicles/detail/drill" component={DrillDetail} />
                            <PrivateRoute path="/vehicles/detail/other" component={DefaultVehicleDetail} />
                            <PrivateRoute path="/vehicles" component={Vehicles} />
                            <PrivateRoute path="/reports" component={Reports} />
                            <PrivateRoute path="/notifications" component={Notifications} />
                            <PrivateRoute path="/settings" component={Settings} />
                            <Route path="/login" render={() => (!authenticated ? <Login /> : <Redirect to="/" />)} />
                            <Redirect to="/not-found" />
                        </Switch>
                    </React.Suspense>
                </Router>
                <ToastContainer hideProgressBar autoClose={1500} transition={Slide} />
                <GlobalStyle />
            </StyledPage>
        </ThemeProvider>
    )
}
