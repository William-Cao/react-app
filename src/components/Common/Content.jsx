import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

function Loadables (fun) {
  return Loadable({
    loader: fun,
    loading: () => { return (<div></div>) }
  });
}

const Login = Loadables(() => import('../Login/index'));


class ContentMain extends React.Component {
  render () {
    return (
      <div className="content">
        <Switch>
          <Route path='/' component={Login} />
          <Route path='/index' component={Login} />
        </Switch>
      </div>
    )
  }
}

export default ContentMain