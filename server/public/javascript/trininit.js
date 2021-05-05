const ce = React.createElement
const profImg = document.getElementById("defaultimg").value;



class TrininitReactComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        // return ce(LoginComponent)
        return ce(MainComponent)
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

ReactDOM.render(
    ce(TrininitReactComponent, null, null),
    document.getElementById("trininit-root")
)