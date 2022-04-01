import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import Logo from '../img/logo.svg';
import { userAction } from '../Redux/actions/userAction';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      status: '',
      loading: '',
      loginNameInput: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const { loginNameInput } = this.state;
    const { action } = this.props;
    const user = await createUser({ name: loginNameInput });
    action(loginNameInput);

    this.setState({
      status: (user),
      loading: false,
    });
  }

  render() {
    const { status, loading, loginNameInput } = this.state;
    const minlength = 3;

    if (status) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login" className="container-login">

        <form>
          <img src={ Logo } alt="Logo" className="logo" />
          <div className="div-input">
            <input
              data-testid="login-name-input"
              type="text"
              id="loginNameInput"
              name="loginNameInput"
              value={ loginNameInput }
              onChange={ this.handleChange }
              placeholder="Nome"
              className="loginNameInput"
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ (loginNameInput.length < minlength) }
              onClick={ this.handleClick }
              className="btn-submit"
            >
              Entrar
            </button>
          </div>
          <div className="containerLoad">
            {(loading && <Loading />)}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userName: store.userReduce.username,
});

const mapDispatchToProps = (dispatch) => ({
  action: (user) => dispatch(userAction(user)),
});

Login.propTypes = {
  inputState: PropTypes.string,
  action: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
