import { Route, Switch } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import LeaderBoardPage from "./Pages/LeaderBoardPage";
import SchedulePage from "./Pages/SchedulePage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={SchedulePage}></Route>
      <Route path={"/schedule"} component={SchedulePage}></Route>
      <Route path={"/leaderboard"} component={LeaderBoardPage}></Route>
      <Route path={"*"} component={ErrorPage}></Route>
    </Switch>
  );
};

export default Routes;
