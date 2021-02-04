import { Route, Switch } from "react-router"
import Board from "./Board"

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Board} />
            </Switch>
        </div>
    )
}

export default Routes