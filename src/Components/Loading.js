import React from 'react';
import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="container">
        <p className="text">Carregando...</p>
        <div className="spinner" />
      </div>
    );
  }
}

export default Loading;
