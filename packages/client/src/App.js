import { Container } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'

function App () {

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <ToastContainer autoClose={3000} />
        <NavBar />
        <Switch>
          <Route
            path='/'
            exact
          >
            <Home />
          </Route>
          <Route
            path='/auth'
          >
            <Auth />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
