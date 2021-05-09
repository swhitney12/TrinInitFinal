const ce = React.createElement

//eventually will be used to make nav global for easy transition to profile

class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //add state variables here
        };
    }

    render() { 
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
        )

    }
}

export default NavComponent;