import React from "react";
import { Switch, Route } from "react-router-dom";
import { userRouter } from "./routes";
import Page404 from '../pages/404'

function UserRoutes() {

  const renderRouter = (item, index) => {
    return item.component ? (
      <Route key={index} path={item.path} component={item.component} exact = {true} />
    ) : null;
  };
  return (
    <Switch>
      {/* 渲染路由表 */}
      {userRouter.map(renderRouter)}
      <Route path="*" component={Page404}></Route>
    </Switch>
  );
}

export default UserRoutes;
