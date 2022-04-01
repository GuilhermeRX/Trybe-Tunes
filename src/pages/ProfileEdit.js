import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: true,
      email: '',
      image: '',
      description: '',
      disabled: true,
      loadUpdate: false,
      redirect: false,
      imgProfile: '',
    };
  }

  componentDidMount() {
    this.getUsuario();
  }

  getUsuario = async () => {
    const response = await getUser();
    const { name, email, description, image } = response;
    this.setState({
      username: name,
      loading: false,
      email,
      image,
      description,
    });
    this.verifyInput();
    this.setState({ imgProfile: image });
  }

  verifyInput = () => {
    const { username, email, image, description } = this.state;
    const regex = /^\S+@\S+\.\S+$/; // https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
    const checkName = username.length > 0;
    const checkEmail = regex.test(email);
    const checkImage = image.length > 0;
    const checkDescription = description.length > 0;

    const allCheck = checkName && checkEmail && checkImage && checkDescription;
    if (allCheck) {
      this.setState({ disabled: false });
    }
  }

  handleChange = async ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.verifyInput();
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { username, email, image, description } = this.state;
    const returnData = {
      name: username,
      email,
      image,
      description,
    };
    this.setState({ loadUpdate: true });
    await updateUser(returnData);
    this.setState({ loadUpdate: false, redirect: true, imgProfile: image });
  }

  render() {
    const {
      username,
      loading,
      disabled,
      email,
      image,
      description,
      loadUpdate,
      redirect,
      imgProfile,
    } = this.state;

    const divImg = (
      <div className="div-img-editProfile">
        <img src={ imgProfile } alt={ username } className="edit-img" />
      </div>
    );
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header user={ username } load={ loading } />
        <form className="form">
          {(imgProfile
            ? divImg
            : <FaUserCircle className="edit-profile-icon" />
          )}
          <label htmlFor="username" className="label-name">
            Nome:
            <p className="place">Fique à vontade para usar seu nome social</p>
            <input
              type="text"
              id="username"
              name="username"
              data-testid="edit-input-name"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            Email:
            <p className="place">Escolha um e-mail que consulte diariamente</p>
            <input
              type="text"
              id="email"
              name="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <textarea
              type="text"
              id="description"
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
              className="textarea"
            />
          </label>

          <label htmlFor="image">
            Image:
            <input
              type="text"
              id="image"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
            className="btn-salvar-profile"
          >
            Salvar
          </button>
          {loadUpdate && <Loading />}
          {redirect && <Redirect to="/profile" />}
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
