import React from 'react'
import { Route, Switch ,Redirect} from 'react-router-dom'
import Loadable from 'react-loadable'

function Loadables (fun) {
  return Loadable({
    loader: fun,
    loading: () => { return (<div></div>) }
  });
}

const Login = Loadables(() => import('../Login/index'));
const Login1 = Loadables(() => import('../Login/index.1'));


class ContentMain extends React.Component {
  render (props) {
    console.log(props)
    return (
      <div className="content">
        <Switch>
          <Route exact path='/index' component={Login1} />
          <Route path='/index/qqq' component={Login} />
          <Redirect to="/index" />
        </Switch>
      </div>
    )
  }
}

export default ContentMain