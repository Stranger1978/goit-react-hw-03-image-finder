import React, { Component } from 'react';
//import Modal from './Modal';
import Searchbar from './Searcbar';


export class App extends Component {
  state = {
    showModal: true,
    SearchValue: '',
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
   }

onSubmitForm = Value => {
  this.setState({ SearchValue: Value });
};
  render() {
   // const { showModal } = this.state;
    return (
      <Searchbar onSubmit={this.onSubmitForm} />
      //showModal && <Modal onClose={this.toggleModal} />
    )
  }
}