import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUsuario();
  }

  getUsuario = async () => {
    const response = await getUser();
    const { name, email, image, description } = response;
    this.setState({
      username: name,
      loading: false,
      email,
      image,
      description,
    });
  }

  render() {
    const { username, loading, email, image, description } = this.state;
    const renderInfo = (
      <div className="profile-div">
        <div className="profile-container">
          <div className="div-img-link">
            {(image
              ? <img data-testid="profile-image" src={ image } alt={ username } />
              : <div className="fadiv"><FaUserCircle className="profile-icon" /></div>
            )}

          </div>
          <div className="div-info-profile">
            <Link
              to="/profile/edit"
              className="link-edit-profile"
            >
              Editar Perfil
              {' '}
              <MdOutlineEditNote className="editProfile-icon" />

            </Link>
            <p className="title-profile">{username}</p>
            <p className="profile-info-text">{email}</p>
            <p className="profile-info-text">{description}</p>
          </div>

        </div>
      </div>

    );

    const renderLoad = (
      <div className="load-profile">
        <Loading />
      </div>
    );

    return (
      <div data-testid="page-profile" className="page-profile">
        <Header user={ username } load={ loading } />
        {loading ? renderLoad : renderInfo}
      </div>
    );
  }
}

export default Profile;
