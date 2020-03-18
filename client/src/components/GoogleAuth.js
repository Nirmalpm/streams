import React from 'react';
import {signIn,signOut} from '../actions';
import {connect} from 'react-redux';

class GoogleAuth extends React.Component{
    componentDidMount(){
        //console.log(this.auth);
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'932750716865-ska6b9ltktk33hqo8de1jheo8kk8dn4i.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
  
    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    } 

    onSignInClick = () => {
       this.auth.signIn();
    }
    
    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton = () =>{
        if(this.props.isSignedIn === null){
            return <div>I don't know if we were signed in</div>;
        }else if (this.props.isSignedIn){    
            return( 
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="googe icon"/>
                    Sign Out
                </button>
            );
        }else {
            return (
                <button className="ui red google button"  onClick={this.onSignInClick}>
                    <i className="googe icon"/>
                    Sign In with google
                </button>
            );
        }
    }
    render(){
    return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) =>{
    return {isSignedIn:state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);