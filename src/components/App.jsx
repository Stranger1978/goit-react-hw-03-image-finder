import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
//import { ImageGaleryItem } from './ImageGaleryItem';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    ShowModal: false,
    SearchValue: '',
  }

  toggleModal = () => {
    this.setState(({ ShowModal }) => ({
      ShowModal: !ShowModal,
    }))
   }

onSubmitForm = Value => {
  this.setState({ SearchValue: Value });
};
  render() {
    //const { ShowModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitForm} />
        {this.state.ShowModal && <Modal onClose={this.toggleModal} />}
        <ImageGallery SearchValue={this.state.SearchValue} onClick={this.toggleModal} />
        <ToastContainer onClose={3000} />
      </>
    );
  }
}