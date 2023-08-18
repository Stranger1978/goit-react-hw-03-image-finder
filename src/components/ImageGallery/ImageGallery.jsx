import React, { Component } from 'react';


export default class ImageGallery extends Component { 

    componentDidUpdate(prevProps, prevState) { 
        if (prevProps.SearchValue !== this.props.SearchValue) {
            console.log(prevProps.SearchValue);
            console.log(this.props.SearchValue);
        }
    }
    render() { 
        return (
        <ul className="gallery">
            <li> Набор с изображениями</li>
            <li></li>
        </ul>
        )
    }
};