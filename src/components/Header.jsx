import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameImput: <Loading />,
    };
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const nameChanges = await getUser();
    this.setState({ nameImput: nameChanges.name });
  };

  render() {
    const { nameImput } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ nameImput }</p>
      </header>
    );
  }
}
