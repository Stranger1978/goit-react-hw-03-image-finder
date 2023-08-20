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
    LargeImg: '',
    
  }
  
  toggleModal = largeImage => {
    this.setState(({ ShowModal }) => ({
      ShowModal: !ShowModal,
      LargeImg: largeImage,
    }))
   }


  
  onSubmitForm = Value => {
    this.setState({ SearchValue: Value });
};
  render() {
    const { ShowModal, LargeImg } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}>
        <Searchbar onSubmit={this.onSubmitForm} />
        {ShowModal && <Modal onClose={this.toggleModal} largeImageURL={LargeImg} />}
        <ImageGallery SearchValue={this.state.SearchValue} onClick={this.toggleModal} />
        <ToastContainer onClose={3000} />
      </div>
    );
  }
}