"use strict";

const ce = React.createElement
const profImg = document.getElementById("defaultimg").value;
const csrfToken = document.getElementById("csrfToken").value;
const validateRoute = document.getElementById("validateRoute").value;
//const tasksRoute = document.getElementById("tasksRoute").value;
const createRoute = document.getElementById("createRoute").value;
const getUserDataRoute = document.getElementById("getUserDataRoute").value;
const getOwnerDataRoute = document.getElementById("getOwnerDataRoute").value;
const getProjectDataRoute = document.getElementById("getProjectDataRoute").value;
const likeProjectRoute = document.getElementById("likeProjectRoute").value;
const getUserProjectsRoute = document.getElementById("getUserProjectsRoute").value;
const getAllProjectsRoute = document.getElementById("getAllProjectsRoute").value;
const createProjectRoute = document.getElementById("createProjectRoute").value;
const getUserIDRoute = document.getElementById("getUserIDRoute").value;
const addCommentRoute = document.getElementById("addCommentRoute").value;
const getProjectCommentsRoute = document.getElementById("getProjectCommentsRoute").value;
const getCommentSenderDataRoute = document.getElementById("getCommentSenderDataRoute").value;
const getLikeCountRoute = document.getElementById("getLikeCountRoute").value;
const getCommentCountRoute = document.getElementById("getCommentCountRoute").value;
//const deleteRoute = document.getElementById("deleteRoute").value;
//const addRoute = document.getElementById("addRoute").value;
//const logoutRoute = document.getElementById("logoutRoute").value;
const setCollabsRoute = document.getElementById("setCollabsRoute").value;
const getCollaboratorIDRoute = document.getElementById("getCollaboratorIDRoute").value;
const getLikedProjectsRoute = document.getElementById("getLikedProjectsRoute").value;

let selectedProjectId = "";
let searchInput = "";


class TrininitReactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            inProfileState: false, 
            inCreateUserState: false,
            inMainState: false,
            inLoginState: true,
            inProjectState: false,
            inCreateProjectState: false,
        };
    }

    render() {
        //cut these down
        if(this.state.inCreateUserState){
            return ce(CreateUserComponent, {toLogin: () => this.setState({inProjectState:false, inProfileState: false, inLoginState:true, inCreateUserState: false, inMainState: false})})
        }
        if(this.state.inLoginState) {
            return ce(LoginComponent, {doLogin: () => this.setState({inProjectState:false, inMainState: true, inProfileState: false, inLoginState:false, inCreateUserState: false}), sendToCU: () => this.setState({inProjectState: false, inCreateUserState: true, inMainState: false, inProfileState: false, inLoginState: false})})
        }
        if(this.state.inProfileState){
            return ce(ProfileComponent, {goToProjectView: () => this.setState({inProjectState:true ,inMainState: false, inProfileState: false, inLoginState:false, inCreateUserState: false}), toMain: () => this.setState({inProjectState:false, inMainState: true, inProfileState: false, inLoginState:false, inCreateUserState: false})})
        }
        if(this.state.inMainState) {
            return ce(MainComponent, {toMain: () => this.setState({inProjectState:false, inMainState: true, inProfileState: false, inLoginState:false, inCreateUserState: false}), goToProjectView: () => this.setState({inProjectState:true ,inMainState: false, inProfileState: false, inLoginState:false, inCreateUserState: false}), toCreateProjectView: () => this.setState({inCreateProjectState: true, inProjectState:false, inMainState: false, inProfileState: false, inLoginState:false, inCreateUserState: false}), toProfile: () => this.setState({inProjectState:false, inMainState: false, inProfileState: true, inLoginState:false, inCreateUserState: false})})
        }
        if(this.state.inProjectState){
            return ce(ProjectViewComponent, {toProfile: () => this.setState({inProjectState:false, inMainState: false, inProfileState: true, inLoginState:false, inCreateUserState: false}), toMain: () => this.setState({inProjectState:false, inMainState: true, inProfileState: false, inLoginState:false, inCreateUserState: false})})
        }
        if(this.state.inCreateProjectState){
            return ce(CreateProjectComponent, {goToProjectView: () => this.setState({inProjectState:true ,inMainState: false, inProfileState: false, inLoginState:false, inCreateUserState: false}), toProfile: () => this.setState({inProjectState:false, inMainState: false, inProfileState: true, inLoginState:false, inCreateUserState: false}), toMain: () => this.setState({inProjectState:false, inMainState: true, inProfileState: false, inLoginState:false, inCreateUserState: false})})
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
            searchProjectsBannerInput:"",
            username:"",
            Major:"",
            GradYear:"",
            GitHubLink: "",
            MyProjects:[],
            filteredProjects: [],
            Myinterests: "Frontend dev, data visualization, sports, cybersecurity",
            MySkills: "Java, C/C++, React, Javascript, HTML, CSS"
        };
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUserProjects();
        this.searchProjects();
    }

    render() {
        return ce('div', null, 
            ce('div', {id:'siteBanner'},
                ce('h1', {id: 'trinInitLogoText', onClick: () => {
                    searchInput = "";
                    this.props.toMain();
                }}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('div', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...', value: this.state.searchProjectsBannerInput, onChange: e => this.changeHandler(e)}),
                    ),
                ),

                ce('div', {id:'submitSearchBtnDiv'},
                    ce('button', {type: 'button', id:'searchBtn', className: 'fa fa-search', onClick: () => {
                        searchInput = this.state.searchProjectsBannerInput
                        this.props.toMain()
                    }})
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
                ),

                ce('div', {id: 'middleProfileDiv'},
                    ce('div', {id: 'myProjectSecTitleDiv'},
                        ce('h2', {id: 'myProjectSecTitle'}, 'My Projects')
                    ),

                    ce('hr'),

                    ce('div', {id: 'myProjSecListings'},
                        //code to insert projects here, template for what will be appended in foreach
                        this.state.filteredProjects.map((project, index) =>
                        // this.state.MyProjects.map((project, index) =>
                            {
                                return ce('div', {className: 'ProjListing', key: index},
                                    ce('div', {className: 'ProjListingTitleDiv'},
                                        ce('h3', {className: 'ProjListingTitle', onClick: () => {
                                            this.props.goToProjectView()
                                            selectedProjectId = project["id"]
                                        }}, project["name"]), 
                                        ce('p', {className: 'ProjListingCreator'}, 'Created by ' + this.state.username), //adjust to use ownerid
                                    ),
                                    ce('p', {className: 'ProjListingDesc'}, project["description"]),
                                    ce('div', {className: 'ProjListingEngagementDiv'},
                                        ce('p', {className: 'ProjListingEngagementInfo'}, '10 Interested Collaborators'),
                                        ce('div', {className: 'vl'}),
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

    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value });
    }

    getUserInfo() {
        fetch(getUserDataRoute).then(res => res.json()).then(data => {
            this.setState({username: data["username"], Major: data["major"], GradYear: data["graduationYear"], GitHubLink: data["githubLink"] })
        });
    }

    getUserProjects() {
        fetch(getUserProjectsRoute).then(res => res.json()).then(data => {
            this.setState({MyProjects: data})
            this.setState({filteredProjects: data})
        });
    }

    searchProjects() {
        console.log(this.state.MyProjects.filter(project => project["name"].includes(this.state.searchProjectsBannerInput)));
        const filteredprojs = this.state.MyProjects.filter(project => project["name"].includes(this.state.searchProjectsBannerInput));
        this.setState({filteredProjects: filteredprojs})
    }

    
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchProjectsBannerInput:"",
            username: "",
            likedProjects: [],
            myProjects: [],
            Projects: [],
            owners: {},
            likes: {},
            comments: {},
            filteredProjects: []
        };
    }

    componentDidMount() {
        this.getUserName();
        this.getUserProjects();
        this.getAllProjects();
        this.getLikedProjects();
    }

    render() {
        return ce('div', null, 
            ce('div', {id:'siteBanner'},
                ce('h1', {id: 'trinInitLogoText', onClick: () => {
                    searchInput = "";
                    this.setState({searchProjectsBannerInput: ""});
                    this.getAllProjects();
                }}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('div', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...', value: this.state.searchProjectsBannerInput, onChange: e => this.changeHandler(e)}),
                    ),
                ),

                ce('div', {id:'submitSearchBtnDiv'},
                    ce('button', {type: 'button', id:'searchBtn', className: 'fa fa-search', onClick: () => {
                        searchInput = this.state.searchProjectsBannerInput
                        this.getAllProjects()
                    }})
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
                        ce('button', {id: 'addProjectMainBtn', onClick: () => this.props.toCreateProjectView()}, '+')
                    )
                ),

                ce('div', {id: 'myProjectsMainListDiv'},
                    //insert code here to populate this, use below as template
                    this.state.myProjects.map((project, index) => 
                        ce('h4', {className: 'mainSubheader2', key: index, onClick: () => {
                            this.props.goToProjectView()
                            selectedProjectId = project["id"]}}, 
                            project["name"])
                    )
                ),

                ce('div', {id: 'likedProjectsMainTitleDiv'},
                    ce('h3', {className: 'mainSubheader1'}, 'Liked Projects')            
                ),

                ce('div', {id: 'likedProjectsMainListDiv'},
                    this.state.likedProjects.map((project, index) => 
                        ce('h4', {className: 'mainSubheader2', key: index, onClick: () => {
                            this.props.goToProjectView()
                            selectedProjectId = project["id"]}}, 
                            project["name"])
                    )
                    
                )
            ),

                ce('div', {id: 'rightMainDiv'},

                    ce('div', {id: 'ProjSecListings'},
                        this.state.filteredProjects.map((project,index) => {
                            return ce('div', {className: 'ProjListing', key: index},
                                ce('div', {className: 'ProjListingTitleDiv'},
                                    ce('h3', {className: 'ProjListingTitle', onClick: () => {
                                        this.props.goToProjectView()
                                        selectedProjectId = project["id"]
                                        }}, project['name']),
                                    ce('p', {className: 'ProjListingCreator'}, 'Created by ' + this.state.owners[project['id']]),
                                ),
                                ce('p', {className: 'ProjListingDesc'}, project['description']),
                                ce('div', {className: 'ProjListingEngagementDiv'},
                                    ce('p', {className: 'ProjListingEngagementInfo'}, String(this.state.likes[project['id']]) + ' Likes'),
                                    ce('div', {className: 'vl'}),
                                    ce('p', {className: 'ProjListingEngagementInfo'}, String(this.state.comments[project['id']]) + ' Comments')
                                )
                            )
                        })
                    )
                ),

            )
        )
    }

    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value });
    }

    getUserName() {
        fetch(getUserDataRoute).then(res => res.json()).then(data => this.setState({username: data["username"] }));
    }

    getUserProjects() {
        fetch(getUserProjectsRoute).then(res => res.json()).then(data => {
            this.setState({myProjects: data})
        });
    }

    getLikedProjects() {
        fetch(getLikedProjectsRoute).then(res => res.json()).then(data => {
            this.setState({likedProjects: data});
        });
    }

    getAllProjects() {
        fetch(getAllProjectsRoute).then(res => res.json()).then(data => {
            this.setState({Projects: data});

            const filteredprojs = this.state.Projects.filter(project => project["name"].includes(searchInput));
            this.setState({filteredProjects: filteredprojs})

            for (let project of data) {
                this.getOwnerName(project['ownerId'], project['id']);
                this.getLikeCount(project['id']);
                this.getCommentCount(project['id']);
            }
        });
    }

    getOwnerName(ownerId, projId) {
        fetch(getCommentSenderDataRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(ownerId)
          }).then(res => res.json()).then(data => {
            if(data) {
                let o = this.state.owners;
                o[projId] = data['username'];
                this.setState({owners: o});
            } else {
                return "failed";
            }
          });
    }

    getLikeCount(projId) {
        fetch(getLikeCountRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(projId)
          }).then(res => res.json()).then(data => {
                let l = this.state.likes;
                l[projId] = data;
                this.setState({likes: l});
          });
    }

    getCommentCount(projId) {
        fetch(getCommentCountRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(projId)
          }).then(res => res.json()).then(data => {
                let c = this.state.comments;
                c[projId] = data;
                this.setState({comments: c});
          });
    }


}

class CreateProjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchProjectsBannerInput:"",
            username:"",
            newProjectTitleInput:"",
            newProjectDescInput:"",
            repoLink:"",
            userID: "",
            projectID: "",
            collaborators:"",
            collabIds:[]
        };
    }

    componentDidMount() {
        this.getUserName();
        this.getUserID();
        this.setCollabs();
    }

    render() {  
        return ce('div', {id: 'createProjBGDiv'},
            ce('div', {id:'siteBanner'},
                ce('h1', {id: 'trinInitLogoText', onClick: () => {
                    searchInput = "";
                    this.props.toMain();
                }}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('div', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...', value: this.state.searchProjectsBannerInput, onChange: e => this.changeHandler(e)}),
                    ),
                ),

                ce('div', {id:'submitSearchBtnDiv'},
                    ce('button', {type: 'button', id:'searchBtn', className: 'fa fa-search', onClick: () => {
                        searchInput = this.state.searchProjectsBannerInput
                        this.props.toMain()}
                    })
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

            ce('div', {id: "createProjDiv"},
                ce('div', {className: 'createProjSecTitleDiv'}, 
                    ce('h1', {className: 'createProjSecTitle'}, 'New Project')
                ),

                ce('hr', {id: 'createProjLine'}),

                ce('div', {id: 'newProjectTitlePromptDiv'},
                    ce('h3', {className: 'newProjectPrompt'}, 'Project Title'),
                    //{type:'text', className:'createUserName', id:'createUserName', placeholder:'username', value: this.state.createUserName, onChange: e => this.changeHandler(e)}
                    ce('input', {type: 'text', id: 'newProjectTitleInput', placeholder: 'Enter Your Project Name...', value: this.state.newProjectTitleInput, onChange: e => this.changeHandler(e)})
                ),

                ce('div', {id: 'newProjectDescPromptDiv'},
                    ce('h3', {className: 'newProjectPrompt'},'Description'),
                    ce('textarea', {id: 'newProjectDescInput', rows: '4', cols: '50', placeholder: 'Enter Your Project Description...', value: this.state.newProjectDescInput, onChange: e => this.changeHandler(e)})
                ),

                ce('div', {id: 'newProjectCollabPromptDiv'},
                    ce('h3', {className: 'newProjectPrompt'}, 'Invite Collaborator'),
                    ce('textarea', {id: 'collaborators', rows: '1', cols: '50', placeholder: 'Enter Your Collaborator Names...', value: this.state.collaborators, onChange: e => this.changeHandler(e)})
                ),

                ce('button', {id: 'createNewProjectBtn', onClick: () =>  {
                    this.createProject();
                    }}, 'Create Project')
            )
        )
    }

    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value });

    }

    getUserName() {
        fetch(getUserDataRoute).then(res => res.json()).then(data => this.setState({username: data["username"] }));
    }

    getUserID() {
        fetch(getUserIDRoute).then(res => res.json()).then(data => {
            this.setState({userID: data});
        });
    }

    getCollaboratorID(username) {
        fetch(getCollaboratorIDRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(username)
          }).then(res => res.json()).then(data => {
            if(data) {
                //console.log(data);
              //selectedProjectId = data;
              //this.props.goToProjectView();
              return data;
            } else {
              console.log("fail");
            }
          });
    }

    setCollabs(){
        const collaboratorsString = this.state.collaborators; 
        const collaborators = collaboratorsString.split(",");
        //const collabIds = [];
        collaborators.forEach(collab => {
            (this.state.collabIds.push(this.getCollaboratorID(collab)))
        })
        this.state.collabIds.forEach(collabID => {
           fetch(setCollabsRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify("" + collabID + ","  + selectedProjectId)
          }).then(res => res.json()).then(data => {
            if(data) {
                console.log(data);
              // = data;
              //this.props.goToProjectView();
            } else {
              console.log("fail");
            }
          }); 
        })

        
    }
    

    createProject() {
        const name = this.state.newProjectTitleInput;
        const description = this.state.newProjectDescInput;
        const repositoryLink = this.state.repoLink;
        const ownerId = parseInt(this.state.userID);
        const id = parseInt('1');
        const creationDate = Date.now();
        //const collabs = this.state.collaborators;

        fetch(createProjectRoute, { 
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
          body: JSON.stringify({id, ownerId, name, description, repositoryLink, creationDate})
        }).then(res => res.json()).then(data => {
          if(data) {
            selectedProjectId = data;
            this.setCollabs();
            this.props.goToProjectView();
          } else {
            console.log("fail");
          }
        });
    }


}

class ProjectViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchProjectsBannerInput: "",
            username:"",
            userID: "",
            Name: "",
            ID: "",
            OwnerID: "",
            Owner: "",
            RepositoryLink: "",
            Liked: false,
            Description: "",
            CreationDate: "",
            commentInput: "",
            Collaborators: "",
            Comments: [],
            senderNames: {}
        };
    }

    componentDidMount() {
        this.getUserName();
        this.getUserID();
        this.getOwnerName();
        this.getProjectData();
        this.getProjectComments();
        //todo
        // this.isLiked();
    }

    render() {
        return ce('div', null, 
        
            ce('div', {id:'siteBanner'},
                ce('h1', {id: 'trinInitLogoText', onClick: () => {
                    searchInput = "";
                    this.props.toMain();
                }}, 'TrinInit'),
                ce('div', {id: 'searchProjectsFormBannerDiv'},
                    ce('div', {id:'searchProjectsFormBanner'},
                        ce('input', {type:'text', id:'searchProjectsBannerInput', placeholder:'Search for projects and users...', value: this.state.searchProjectsBannerInput, onChange: e => this.changeHandler(e)}),
                    ),
                ),

                ce('div', {id:'submitSearchBtnDiv'},
                    ce('button', {type: 'button', id:'searchBtn', className: 'fa fa-search', onClick: () => {
                        searchInput = this.state.searchProjectsBannerInput
                        this.props.toMain()
                    }})
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
                        ce('textarea', {id: 'commentInput', rows: '2', cols: '100', placeholder: 'Type Your Comment...', value: this.state.commentInput, onChange: e => this.changeHandler(e)}),
                        ce('button', {id: 'commentSendBtn', onClick: () => this.addProjectComment()}, 
                            ce('i', {className: 'fas fa-paper-plane'})
                        )
                    ),

                    ce('hr', {id: 'commentHr'}),
                    ce('h2', {id: 'commentSecHeader'}, 'Comments'),
                    this.state.Comments.map((comment, index) => {
                            return ce('div', {className: 'commentCardDiv', key: index}, 
                            ce('h3', {className: 'commentSender'}, this.state.senderNames[comment["id"]]),
                            ce('p', {className: 'commentContent'}, comment["comment"]),
                            ce('p', {className: 'sendTime'}, new Date(comment["creationDate"]).toString())
                            )
                        })
                    )
                )
            )
        }

    getUserName() {
        fetch(getUserDataRoute).then(res => res.json()).then(data => { this.setState({username: data["username"]}) });
    }

    getUserID() {
        fetch(getUserIDRoute).then(res => res.json()).then(data => {
            this.setState({userID: data});
        });
    }

    getOwnerName() {
        fetch(getOwnerDataRoute).then(res => res.json()).then(data => this.setState({Owner: data["username"]}))
    }

    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value });
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
              //change button color?
          } else {
            //include some error message
            //   console.log("like failed")
          }
        });
    }

    getProjectData() {
        const projectid = parseInt(selectedProjectId);
        
        fetch(getProjectDataRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(projectid)
          }).then(res => res.json()).then(data => {
            if(data) {
                this.setState({Name: data["name"], Description: data["description"], ID: data["id"], OwnerID: data["ownerid"], RepositoryLink: data["repositoryLink"], CreationDate: data["creationDate"]})
            } else {
                //include some error message
                //   console.log("like failed")
            }
          });
    }

    // this.getOwnerName(project['ownerId'], project['id']);
    // this.getLikeCount(project['id']);
    // this.getCommentCount(project['id']);

    getProjectComments() {
        const projectId = parseInt(selectedProjectId);

        fetch(getProjectCommentsRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(projectId)
          }).then(res => res.json()).then(data => {
            if(data) {
                this.setState({Comments: data})
                for (let comment of data) {
                    this.getSenderName(comment["userId"], comment["id"]);
                }
            } else {
                //include some error message
                // console.log("like failed")
            }
          });
    }

    getSenderName(idnum, idcomm) {
        const senderid = parseInt(idnum);

        fetch(getCommentSenderDataRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(senderid)
          }).then(res => res.json()).then(data => {
            if(data) {
                let names = this.state.senderNames;
                names[idcomm] = data["username"];
                this.setState({senderNames: names})
            } else {
                return "failed";
            }
          });
    }

    addProjectComment() {
        const id = parseInt('1');
        const projectId = this.state.ID;
        const userId = parseInt(this.state.userID);
        const creationDate = Date.now();
        const comment = this.state.commentInput;

        fetch(addCommentRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify({id, projectId, userId, creationDate, comment})
          }).then(res => res.json()).then(data => {
            if(data) {
                this.getProjectComments();
            } else {
                //include some error message
                // console.log("like failed")
            }
          });
    }
}

ReactDOM.render(
    ce(TrininitReactComponent, null, null),
    document.getElementById("trininit-root")
)