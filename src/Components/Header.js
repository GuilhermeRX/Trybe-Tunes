import PropTypes from 'prop-types';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { RiUserSettingsLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../img/headerLogo.svg';
import { userAction } from '../Redux/actions/userAction';
import { getUser } from '../services/userAPI';
import './Header.css';
import LoadingHeader from './LoadingHeader';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUsuario();
  }

  getUsuario = async () => {
    const { action } = this.props;
    const response = await getUser();
    const { name, image } = response;
    this.setState({
      username: name,
      image,
    });
    action(name);
  };

  getName = (input) => input;

  render() {
    const { load } = this.props;
    const { username, image } = this.state;

    return (
      <header data-testid="header-component">
        <img src={ Logo } alt="logo" className="logoHeader" />
        <div className="div-img-user">
          <div className="user">
            {(image
              ? <img src={ image } alt={ username } className="header-user-img" />
              : <FaUserCircle className="user-icon" />
            )}

            {load ? <LoadingHeader /> : <p data-testid="header-user-name">{username}</p>}
          </div>
        </div>
        <div className="linkContainer">
          <NavLink
            to="/search"
            data-testid="link-to-search"
            className="Link"
            activeClassName="active"
          >
            <BsSearch className="icon-header" />
            Buscar
          </NavLink>

          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            className="Link"
            activeClassName="active"
          >
            <div className="div-favorite-img-header">
              <MdFavorite className="icon-favorite-card-header" />
            </div>
            Músicas Favoritas
          </NavLink>
          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            className="Link"
            activeClassName="active"
          >
            <RiUserSettingsLine className="icon-header" />
            Perfil
          </NavLink>
        </div>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReduce.userName,
});

const mapDispatchToProps = (dispatch) => ({
  action: (user) => dispatch(userAction(user)),
});

Header.propTypes = {
  load: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
