const ce = React.createElement
const profImg = document.getElementById("defaultimg").value;



class TrininitReactComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        // return ce(LoginComponent)
        return ce(ProjectViewComponent)
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
                        ce('input', {type:'text', className:'loginTextInput', id:'usernameInput', placeholder:'username'}),
                        ce('br'),
                        ce('input', {type:'password', className:'loginTextInput', id:'passwordInput', placeholder:'password'}),
                        ce('br'),
                        ce('input', {type:'submit', id:'loginSubmit', value:'Login'})
                    )
                )
            )
        )
    }
}


class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //add state variables here
        };
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
                        ce('a', {id:'usernameDisplay'}, 'rainihuynh')
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
                            ce('h4', {className:'profileMainSubheader2'}, 'rainihuynh')
                        ),
                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'Major'),
                            ce('h4', {className:'profileMainSubheader2'}, 'Computer Science'),
                        ),

                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'Graduation Year'),
                            ce('h4', {className:'profileMainSubheader2'}, '2021'),
                        ),

                        ce('div', {className: 'leftProfileInfoWrapper'},
                            ce('h3', {className:'profileMainSubheader1'}, 'GitHub'),
                            ce('h4', {className:'profileMainSubheader2'}, 'rainihuynh')
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

                ce('div', {id: 'rightProfileDiv'},
                    ce('div', {id: 'profileInterestsDiv'},
                        ce('h3', {className:'profileMainSubheader3'}, 'Interests'),
                        ce('h4', {className:'profileMainSubheader2'}, 'Frontend dev, data, visualization, sports, cybersecurity')
                    ),

                    ce('div', {id: 'profileSkillsDiv'},
                        ce('h3', {className:'profileMainSubheader3'}, 'Skills'),
                        ce('h4', {className:'profileMainSubheader2'}, 'Java, C/C++, React, Javascript, HTML, CSS')
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
                        ce('a', {id:'usernameDisplay'}, 'rainihuynh')
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
                        ce('h4', {className: 'mainSubheader2'}, 'Project 1')
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
}

class CreateProjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
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
                        ce('a', {id:'usernameDisplay'}, 'rainihuynh')
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
            //add state variables here
        };
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
                        ce('a', {id:'usernameDisplay'}, 'rainihuynh')
                    )
                ),
            ),

            ce('div', {id: 'projectViewDiv'},
                ce('div', {id: 'projectViewTitleDiv'},
                    ce('h1', {id: 'projectViewTitle'}, 'Project Title')
                ),

                ce('div', {id: 'projectViewUserInfoDiv'},
                    ce('div', {id: 'projectViewUserImgDiv'},
                        ce('img', {id:'projectViewUserImg', src: profImg}),
                    ),

                    ce('div', {id: 'projectViewUserNameDiv'},
                        ce('h2', {id: 'projectViewUserName'}, 'rainihuynh'),
                    )
                ),

                ce('div', {id: 'projectUserInteractionDiv'},

                    ce('div', {id: 'projectInterestBtnDiv'},
                        ce('button', {id: 'projectInterestBtn'},
                            ce('i', {className: "far fa-eye"})
                        )
                    ),

                    ce('div', {id: 'projectLikeBtnDiv'},
                        ce('button', {id: 'projectViewLikeBtn'},
                            ce('i', {className: "far fa-heart"})
                        )
                    )
                ),

                ce('div', {id: 'projectViewDescDiv'},
                    ce('p', {id: 'projectViewDesc'}, 'Duis non commodo tortor. Proin diam odio, aliquet sed tellus quis, maximus accumsan dolor. Donec egestas malesuada nibh, quis dignissim diam dictum non. Duis eleifend tristique congue. Maecenas in pharetra velit. Phasellus ac odio eget mi pharetra mattis. Suspendisse consectetur dapibus nunc et rhoncus. Vivamus pellentesque mattis lorem, in fringilla arcu placerat non. Fusce ac lectus velit.')
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
}

ReactDOM.render(
    ce(TrininitReactComponent, null, null),
    document.getElementById("trininit-root")
)