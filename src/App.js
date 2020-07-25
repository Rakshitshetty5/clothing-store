import React, { lazy , Suspense} from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import ErrorBoundary from './components/error-boundary/error-boundary.component'

import Spinner from './components/spinner/spinner.components'

// import HomePage from './pages/homepage/homepage.component';

// import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component'

// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

// import CheckoutPage from './pages/checkout/checkout.component'

import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions'


//lazy loading performance optimization(this is async use suspense in route with a fallback)
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));





class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
    
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback = {<Spinner />}>
              <Route exact path='/' component={HomePage}/>
              <Route path='/shop' component={ShopPage} />
              <Route 
                exact 
                path='/signin' 
                render={() => 
                  this.props.currentUser ? (
                    <Redirect to='/' />
                  ) : (
                    <SignInAndSignUpPage/>
                    )
                  } 
                />
              <Route exact path='/checkout' component={CheckoutPage}/>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

/*
const mapStateToProps = ({user}) => (
  {currentUser : user.currentUser }
) */
// above code is same as below with memoization. header has furether explanation 

const mapStateToProps = createStructuredSelector(
  {
    currentUser : selectCurrentUser,
  
  }
) 

const dispatchStateToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, dispatchStateToProps)(App);
