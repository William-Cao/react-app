import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

function Loadables (fun) {
  return Loadable({
    loader: fun,
    loading: () => { return (<div></div>) }
  });
}

const Login = Loadables(() => import('../Login/index'));


class ContentMain extends React.Component {
  render (props) {
    console.log(props)
    return (
      <div className="content">
        <Switch>
          <Route path='/index' component={Login} />
          <Redirect to="/index" />
        </Switch>
      </div>
    )
  }
}

export default ContentMain