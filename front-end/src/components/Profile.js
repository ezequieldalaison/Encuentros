import React, { Component } from 'react'

class Profile extends Component {
    state = {
        profile: null,
        error: ""
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated())
            this.loadUserProfile();
    }

    loadUserProfile() {
        this.props.auth.getProfile((profile, error) => 
            this.setState({profile, error})
        );
    }

    render() {
        const {profile} = this.state;
        if(!profile) {
            return <h1>Error al cargar Mi Perfil</h1>
        }
        
        return (<>
            <h1>Profile</h1>
            <p>{profile.nickname}</p>
            <img style={{maxWidth:50 , maxHeight:50}}
                 src={profile.picture}
                 alt="Mi foto de perfil"
            />
            <pre>{JSON.stringify(profile, null, 2)}</pre>
                </>)
    }
}

export default Profile;