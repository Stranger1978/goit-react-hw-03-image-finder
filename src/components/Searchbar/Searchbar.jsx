import React, { Component } from 'react';
import Style from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export class Searchbar extends Component {
  state = {
        SearchValue: '',
    }

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ SearchValue: value });
  }; 

    handleSubmit = e => {
      e.preventDefault();
      const { SearchValue } = this.state;
      if (SearchValue.trim() === '') {
        return toast.warn('Enter any data for searh');
      }
    
    this.props.onSubmit(SearchValue);
    this.reset();
    };
    
    reset = () => {
    this.setState({SearchValue: ''});
    };

  render() {
    return (
    <header className={Style.Searchbar}>
        <form className={Style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={Style.SearchButton}>
           <BsSearch className={Style.ButtonIcon} />
          <span className={Style.SearchButtonLabel}>Search</span>
        </button>

        <input
          className={Style.SearchFormInput}
          type="text"
          //autocomplete="off"
          //autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
        />
      </form>
    </header>
  )} 
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};