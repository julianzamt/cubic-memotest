import { Route, Switch } from "react-router"
import Board from "./pages/Board"
import Registro from "./pages/Registro"
import Login from "./pages/Login"

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Board} />
                <Route exact path='/registro' component={Registro} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </div>
    )
}

export default Routes