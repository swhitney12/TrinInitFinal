"use strict";

const ce = React.createElement
const profImg = document.getElementById("defaultimg").value;
const csrfToken = document.getElementById("csrfToken").value;
const validateRoute = document.getElementById("validateRoute").value;
//const tasksRoute = document.getElementById("tasksRoute").value;
const createRoute = document.getElementById("createRoute").value;
const getDataRoute = document.getElementById("getDataRoute").value;
const getProjectDataRoute = document.getElementById("getProjectDataRoute").value;
const likeProjectRoute = document.getElementById("likeProjectRoute").value;
const getUserProjectsRoute = document.getElementById("getUserProjectsRoute").value;
//const deleteRoute = document.getElementById("deleteRoute").value;
//const addRoute = document.getElementById("addRoute").value;
//const logoutRoute = document.getElementById("logoutRoute").value;

let id = ""


class TrininitReactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            inProfileState: false, 
            inCreateUserState: false,
            inMainState: false,
            inLoginState: true,
            inProjectState: false
        };
    }

    render() {
        //cut these down
        if(this.state.inLoginState) {
            return ce(LoginComponent, {doLogin: () => this.setState({inProjectState:false, inMainState: true, inProfileState: false, inLoginState:false, inCreateUserState: false}), sendToCU: () => this.setState({inProjectState: false, inCreateUserState: true, inMainState: false, inProfileState: false, inLoginState: false})})
        }
        if(this.state.inProfileState){
            return ce(ProfileComponent, {goToProjectView: () => this.setState({inProjectState:true ,inMainState: false, inProfileState: false, inLoginState:false, inCreateUserState: false})})
        }
        if(this.state.inMainState) {
            return ce(MainComponent, {toProfile: () => this.setState({inProjectState:false, inMainState: false, inProfileState: true, inLoginState:false, inCreateUserState: false})})
        }
        if(this.state.inCreateUserState){
            return ce(CreateUserComponent, {toLogin: () => this.setState({inProjectState:false, inProfileState: false, inLoginState:true, inCreateUserState: false, inMainState: false})})
        }
        if(this.state.inProjectState){
            return ce(ProjectViewComponent)
        }
    }

}

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loginUsername: "", 
            loginPassword:"", 
            loginMajor: "",
            loginGradYear: "2",
            loginMessage: "",
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
                    ce('div', {id:'loginForm'},
                        ce('input', {type:'text', className:'loginTextInput', id:'loginUsername', placeholder:'username', value: this.state.loginUsername, onChange: e => this.changeHandler(e)}),
                        ce('br'),
                        ce('input', {type:'password', className:'loginTextInput', id:'loginPassword', placeholder:'password', value: this.state.loginPassword, onChange: e => this.changeHandler(e)}),
                        ce('br'),
                        ce('button', {onClick: e => this.login(e)}, 'Login'),
                        ce('br'),
                        ce('br'),
                        ce('span', {id: "loginMessage"}, this.state.loginMessage),
                        ce('button', {onClick: e => this.props.sendToCU(e)}, 'Create a New User')
                    )
                )
            )
        )
    
    
    
    }

    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value });
    }

    login(e) {
        const username = this.state.loginUsername;
        const password = this.state.loginPassword;
        const major = this.state.loginMajor;
        const graduationYear = parseInt(this.state.loginGradYear);
    
        fetch(validateRoute, { 
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
          body: JSON.stringify({ username, password, major, graduationYear })
        }).then(res => res.json()).then(data => {
          if(data) {
            this.props.doLogin();
          } else {
            this.setState({ loginMessage: "Login Failed" });
          }
        });
    }
}

class CreateUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            createUserName:"", 
            createUserPass:"",
            createUserMajor:"", 
            createUserGradYear:"",
            createMessage: "",
            createUserGithubLink: "",

        };
    }

    render() {

        return ce('div', null, 
            ce('div', {id:'loginAreaDiv'},
                ce('div', {id:'loginImage'},
                    ce('h2', {id:'loginImageText'}, 'Create User'),
                ),
                ce('div', {id:'loginFormDiv'},
                ce('p', {id:'loginText'}, 'Create Your User'),
                    ce('div', {id:'loginForm'},
                         ce('input', {type:'text', className:'createUserName', id:'createUserName', placeholder:'username', value: this.state.createUserName, onChange: e => this.changeHandler(e)}),
                         ce('br'),
                         ce('input', {type:'password', className:'createUserPass', id:'createUserPass', placeholder:'password', value: this.state.createUserPass, onChange: e => this.changeHandler(e)}),
                         ce('br'),
                         ce('input', {type:'text', className:'createUserMajor', id:'createUserMajor', placeholder:'major', value: this.state.createUserMajor, onChange: e => this.changeHandler(e)}),
                         ce('br'),
                         ce('input', {type:'number', className:'createUserGradYear', id:'createUserGradYear', placeholder:'grad year', value: this.state.createUserGradYear, onChange: e => this.changeHandler(e)}),
                         ce('br'),
                         ce('input', {type:'text', className:'createUserGithubLink', id:'createUserGithubLink', placeholder:'github lunk', value: this.state.createUserGithubLink, onChange: e => this.changeHandler(e)}),
                         ce('br'),
                         ce('span', {id: "loginMessage"}, this.state.loginMessage),
                         ce('button', {onClick: e => this.createUser(e)}, 'Create User'),
                    )
                )
            )
        )
    
    
    
    }

    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value });
    }

    createUser(e) {
        const username = this.state.createUserName;
        const password = this.state.createUserPass;
        const major = this.state.createUserMajor;
        const graduationYear = parseInt(this.state.createUserGradYear);
        const githubLink = this.state.createUserGithubLink;

        fetch(createRoute, { 
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
          body: JSON.stringify({username, password, major, graduationYear, githubLink})
        }).then(res => res.json()).then(data => {
          if(data) {
            this.props.toLogin();
          } else {
            this.setState({ createMessage: "User Creation Failed"});
          }
        });
    }
}





class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchInput:"",
            username:"",
            Major:"",
            GradYear:"",
            GitHubLink: "",
            MyProjects:[],
            Myinterests: "",
            MySkills: ""
        };
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUserProjects();
    }

    render() {
        return ce('div', null, 
            ce('div', {id:'siteBanner'},

                ce('h1', {id: 'trinInitLogoText'}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('form', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...'})
                    )
                ),

                ce('div', {id: 'toProfileDiv'},
                    ce('div', {id: 'profileImageDivBanner'},
                        ce('img', {id:'profileImgBanner', src: profImg}),
                    ),

                    ce('div', {id: 'usernameDisplayDivBanner'},
                        ce('a', {id:'usernameDisplay'}, this.state.username)
                    )
                ),
            ),

            ce('div', {id: 'profileBody'},
                ce('div', {id: 'leftProfileDiv'}, 
                    ce('div', {id: 'leftProfileImageDiv'},
                        ce('img', {id:'leftProfileImg', src: profImg})
                    ),

                    ce('div', {id:'leftProfileInfoDiv'},
                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'Username'),
                            ce('h4', {className:'profileMainSubheader2'}, this.state.username)
                        ),
                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'Major'),
                            ce('h4', {className:'profileMainSubheader2'}, this.state.Major),
                        ),

                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'Graduation Year'),
                            ce('h4', {className:'profileMainSubheader2'}, this.state.GradYear),
                        ),

                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'GitHub'),
                            ce('a', {className:'profileMainSubheader2', href: this.state.GitHubLink, target: '_blank'}, this.state.username)
                        )
                    ),

                    ce('div', {id:'editProfileBtnDiv'},
                        ce('Button', {id: 'editProfileBtn'}, 'Edit Profile')
                    )
                ),

                ce('div', {id: 'middleProfileDiv'},
                    ce('div', {id: 'myProjectSecTitleDiv'},
                        ce('h2', {id: 'myProjectSecTitle'}, 'My Projects')
                    ),

                    ce('hr'),

                    ce('div', {id: 'myProjSecListings'},
                        //code to insert projects here, template for what will be appended in foreach
                        this.state.MyProjects.map((project, index) =>
                            {
                                return ce('div', {className: 'ProjListing'},
                                    ce('div', {className: 'ProjListingTitleDiv'},
                                        ce('h3', {className: 'ProjListingTitle', onClick: () => {
                                            this.props.goToProjectView()
                                            id = project["id"]
                                        }}, project["name"]), 
                                        ce('p', {className: 'ProjListingCreator'}, 'Created by ' + this.state.username), //adjust to use ownerid
                                    ),
                                    ce('p', {className: 'ProjListingDesc'}, project["description"]),
                                    ce('div', {className: 'ProjListingEngagementDiv'},
                                        ce('p', {className: 'ProjListingEngagementInfo'}, '10 Interested Collaborators'),
                                        ce('vl'),
                                        ce('p', {className: 'ProjListingEngagementInfo'}, '20 Comments')
                                    )
                                )
                            }
                        )
                    )
                ),

                ce('div', {id: 'rightProfileDiv'},
                    ce('div', {id: 'profileInterestsDiv'},
                        ce('h3', {className:'profileMainSubheader3'}, 'Interests'),
                        ce('h4', {className:'profileMainSubheader2'}, this.state.Myinterests)
                    ),

                    ce('div', {id: 'profileSkillsDiv'},
                        ce('h3', {className:'profileMainSubheader3'}, 'Skills'),
                        ce('h4', {className:'profileMainSubheader2'}, this.state.MySkills)
                    )
                )
            )
        )
    }

    getUserInfo() {
        fetch(getDataRoute).then(res => res.json()).then(data => {
            this.setState({username: data["username"], Major: data["major"], GradYear: data["graduationYear"], GitHubLink: data["githubLink"] })
        });
    }

    getUserProjects() {
        fetch(getUserProjectsRoute).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({MyProjects: data})
        });
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //hardcoded for testing purposes
            searchInput:"",
            username: "",
            theProjects: [],
            likedProjects: [],
            myProjects: []
            //add state variables here
        };
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUserProjects();
    }

    render() {
        return ce('div', null, 
            ce('div', {id:'siteBanner'},

                ce('h1', {id: 'trinInitLogoText'}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('form', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...'})
                    )
                ),

                ce('div', {id: 'toProfileDiv'},
                    ce('div', {id: 'profileImageDivBanner'},
                        ce('img', {id:'profileImgBanner', src: profImg}),
                    ),

                    ce('div', {id: 'usernameDisplayDivBanner'},
                        ce('a', {id:'usernameDisplay', onClick: () => this.props.toProfile()}, this.state.username)
                    )
                ),
            ),

            ce('div', {id: 'mainBody'},
                ce('div', {id: 'leftMainDiv'}, 
                    ce('div', {id: 'myProjectsMainTitleDiv'},
                        ce('div', {id:'myProjectsMainTitle'}, 
                            ce('h3', {className: 'mainSubheader1'}, 'My Projects')
                        ),

                        ce('div', {id: 'addProjectMainBtnDiv'},
                            ce('button', {id: 'addProjectMainBtn'}, '+')
                        )
                    ),

                    ce('div', {id: 'myProjectsMainListDiv'},
                        //insert code here to populate this, use below as template
                        this.state.myProjects.map((project, index) => 
                            ce('h4', {className: 'mainSubheader2'}, project["name"])
                        )
                    ),

                    ce('div', {id: 'likedProjectsMainTitleDiv'},
                        ce('h3', {className: 'mainSubheader1'}, 'Liked Projects')            
                    ),

                    ce('div', {id: 'likedProjectsMainListDiv'},
                        //insert code here to populate this, use below as a template
                        ce('h4', {className: 'mainSubheader2'}, 'Liked Project 1')
                    )
                ),

                ce('div', {id: 'rightMainDiv'},

                    ce('div', {id: 'ProjSecListings'},
                        //code to insert projects here, template for what will be appended in foreach
                        ce('div', {className: 'ProjListing'},
                            ce('div', {className: 'ProjListingTitleDiv'},
                                ce('h3', {className: 'ProjListingTitle'}, 'ProjectName'),
                                ce('p', {className: 'ProjListingCreator'}, 'Created by rainihuynh'),
                            ),
                            ce('p', {className: 'ProjListingDesc'}, 'Brief Description that should be cut off after a few lines like this one. This is a super cool project idea that everyone should look into...'),
                            ce('div', {className: 'ProjListingEngagementDiv'},
                                ce('p', {className: 'ProjListingEngagementInfo'}, '10 Interested Collaborators'),
                                ce('vl'),
                                ce('p', {className: 'ProjListingEngagementInfo'}, '20 Comments')
                            )
                        )
                    )
                ),

            )
        )
    }

    getUserInfo() {
        fetch(getDataRoute).then(res => res.json()).then(data => this.setState({username: data["username"] }));
    }

    getUserProjects() {
        fetch(getUserProjectsRoute).then(res => res.json()).then(data => {
            this.setState({myProjects: data})
        });
    }

}

class CreateProjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //hardcoded for testing purposes
            searchInput:"",
            username:"SabrinaWhi",
            //add state variables here
        };
    }

    render() {  
        return ce('div', {id: 'createProjBGDiv'},
            ce('div', {id:'siteBanner'},

                ce('h1', {id: 'trinInitLogoText'}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('form', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...'})
                    )
                ),

                ce('div', {id: 'toProfileDiv'},
                    ce('div', {id: 'profileImageDivBanner'},
                        ce('img', {id:'profileImgBanner', src: profImg}),
                    ),

                    ce('div', {id: 'usernameDisplayDivBanner'},
                        ce('a', {id:'usernameDisplay'}, this.state.username)
                    )
                ),
            ),

            ce('div', {id: "createProjDiv"},
                ce('div', {className: 'createProjSecTitleDiv'}, 
                    ce('h1', {className: 'createProjSecTitle'}, 'New Project')
                ),

                ce('hr', {id: 'createProjLine'}),

                ce('div', {id: 'newProjectTitlePromptDiv'},
                    ce('h3', {className: 'newProjectPrompt'}, 'Project Title'),
                    ce('input', {type: 'text', id: 'newProjectTitleInput', placeholder: 'Enter Your Project Name...'})
                ),

                ce('div', {id: 'newProjectDescPromptDiv'},
                    ce('h3', {className: 'newProjectPrompt'},'Description'),
                    ce('textarea', {id: 'newProjectDescInput', rows: '4', cols: '50', placeholder: 'Enter Your Project Description...'})
                ),

                ce('div', {id: 'newProjectCollabPromptDiv'},
                    ce('h3', {className: 'newProjectPrompt'}, 'Invite Collaborator'),
                    ce('textarea', {id: 'newProjectCollabInput', rows: '1', cols: '50', placeholder: 'Enter Your Collaborator Names...'})
                ),

                ce('button', {id: 'createNewProjectBtn'}, 'Create Project')
            )
        )
    }
}

class ProjectViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //hardcoded for testing purposes
            searchInput:"",
            username:"",
            Name: "",
            ID: "",
            OwnerID: "",
            Owner: "",
            RepositoryLink: "",
            Description: "",
            CreationDate: "",
            Collaborators: [],
            Comments: []
        
            //add state variables here
        };
    }

    componentDidMount() {
        this.getProjectData();
    }

    render() {
        return ce('div', null, 

        
            ce('div', {id:'siteBanner'},
                ce('h1', {id: 'trinInitLogoText'}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('form', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...'})
                    )
                ),

                ce('div', {id: 'toProfileDiv'},
                    ce('div', {id: 'profileImageDivBanner'},
                        ce('img', {id:'profileImgBanner', src: profImg}),
                    ),

                    ce('div', {id: 'usernameDisplayDivBanner'},
                        ce('a', {id:'usernameDisplay'}, this.state.username)
                    )
                ),
            ),

            ce('div', {id: 'projectViewDiv'},
                ce('div', {id: 'projectViewTitleDiv'},
                    ce('h1', {id: 'projectViewTitle'}, this.state.Name)
                ),

                ce('div', {id: 'projectViewUserInfoDiv'},
                    ce('div', {id: 'projectViewUserImgDiv'},
                        ce('img', {id:'projectViewUserImg', src: profImg}),
                    ),

                    ce('div', {id: 'projectViewUserNameDiv'},
                        ce('h2', {id: 'projectViewUserName'}, this.state.Owner),
                    )
                ),

                ce('div', {id: 'projectUserInteractionDiv'},

                    ce('div', {id: 'projectInterestBtnDiv'},
                        ce('button', {id: 'projectInterestBtn'},
                            ce('i', {className: "far fa-eye"})
                        )
                    ),

                    ce('div', {id: 'projectLikeBtnDiv'},
                        ce('button', {id: 'projectViewLikeBtn', onClick: () => this.addToLikes()},
                            ce('i', {className: "far fa-heart"})
                        )
                    )
                ),

                ce('div', {id: 'projectViewDescDiv'},
                    ce('p', {id: 'projectViewDesc'}, this.state.Description)
                ),

                ce('div', {id: 'projectViewCollabDiv'},
                    ce('h2', {id: 'collaboratorPrompt'}, 'Collaborators'),
                    ce('p', {className: 'collaboratorName'}, 'Collaborator Name')
                ),

                ce('div', {id: 'projectViewCommentDiv'},
                    ce('h2', {id: 'commentInputHeader'}, 'Leave a Comment'),

                    ce('div', {id: 'commentInputDiv'},
                        ce('textarea', {id: 'commentInput', rows: '2', cols: '100', placeholder: 'Type Your Comment...'}),
                        ce('button', {id: 'commentSendBtn'}, 
                            ce('i', {className: 'fas fa-paper-plane'})
                        )
                    ),

                    ce('hr', {id: 'commentHr'}),
                    ce('h2', {id: 'commentSecHeader'}, 'Comments'),

                    ce('div', {className: 'commentCardDiv'}, 
                        ce('h3', {className: 'commentSender'}, 'Sender Username'),
                        ce('p', {className: 'commentContent'}, 'Here is the content of a comment'),
                        ce('p', {className: 'sendTime'}, 'about 2 hours ago')
                    )
                )
            )
        )
    }

    addToLikes() {
        const id = this.state.ID;
        const ownerId = this.state.OwnerID;
        const name = this.state.Name;
        const description = this.state.Description;
        const repositoryLink = this.state.RepositoryLink;
        const creationDate = this.state.CreationDate;

        fetch(likeProjectRoute, { 
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
          body: JSON.stringify({id, ownerId, name, description, repositoryLink, creationDate})
        }).then(res => res.json()).then(data => {
          if(data) {
            //   console.log("liked")
          } else {
            //   console.log("like failed")
          }
        });
    }

    getProjectData() {
        const projectid = id
        
        fetch(getProjectDataRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(projectid)
          }).then(res => res.json()).then(data => {
            if(data) {
                this.setState({Name: data["name"], Description: data["description"], ID: data["id"], OwnerID: data["ownerid"], RepositoryLink: data["repositoryLink"], CreationDate: data["creationDate"]})
            } else {
              //   console.log("like failed")
            }
          });
        
    }
}

ReactDOM.render(
    ce(TrininitReactComponent, null, null),
    document.getElementById("trininit-root")
)