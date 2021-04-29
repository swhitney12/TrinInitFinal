const ce = React.createElement

class TrininitReactComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return ce(LoginComponent)
    }
}

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loginUsername: "", 
            loginPassword:"", 
            createUserName:"", 
            createUserPass:"",
            loginMessage: "",
            createMessage: ""
        
        };
    }

    render() {
        return ce('div', null, 
            ce('div', {id:'loginAreaDiv'},
                ce('div', {id:'loginImage'},
                    ce('h2', {id:'loginImageText'}, 'TrinInit'),
                    ce('h3', {id:'trinInitTagline'}, 'TrinInit Tagline')
                ),
                ce('div', {id:'loginFormDiv'},
                    ce('p', {id:'loginText'}, 'Welcome'),
                    ce('form', {id:'loginForm'},
                        ce('input', {type:'text', class:'loginTextInput', id:'usernameInput', placeholder:'username'}),
                        ce('br'),
                        ce('input', {type:'password', class:'loginTextInput', id:'passwordInput', placeholder:'password'}),
                        ce('br'),
                        ce('input', {type:'submit', id:'loginSubmit', value:'Login'})
                    )
                )
            )
        )
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //add state variables here
        };
    }

    render() {
        return ce('div', null, 
            ce('div', {id:'siteBanner'},
                ce('form', {id:'searchProjectsFormMain'},
                    ce('input', {type:'text', id:'searchProjectsMainInput', placeholder:'Search for projects and users'})
                ),
                //add image here as well
                //add a p element for username display            
            )
        )
    }
}

ReactDOM.render(
    ce(TrininitReactComponent, null, null),
    document.getElementById("trininit-root")
)