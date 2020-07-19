import React from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect'


import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component'

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import CheckoutPage from './pages/checkout/checkout.component'

import { setCurrentUser } from './redux/user/user.actions' 
import { selectCurrentUser } from './redux/user/user.selector'


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;
    //console.log(setCurrentUser) this contains user => dispatch(setCurrentUser(user)) //the setCurrentUser passed in dispatch is the action imported above

    this.unsubscribeFromAuth = 
    
    auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser : user});
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth); 

        userRef.onSnapshot(snapShot => {
         setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
              })
         }) //thid data is dispacted to actions.js and according to type changes occur
      }
      setCurrentUser(userAuth); //userAuth is null
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})
export default connect(mapStateToProps, mapDispatchToProps)(App);
