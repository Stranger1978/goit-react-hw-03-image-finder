import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ImageApiService from '../Services/Api-Search-image';
import { ImageGalleryItem } from './ImageGalleryItem';
import Style from './ImageGallery.module.css';


export class ImageGallery extends Component { 
    state = { 
        images: [],
        isLoadMore: false,
    }

    componentDidUpdate(prevProps, prevState) { 
        const { page, per_page, total_hits } = ImageApiService;
       // const { images } = this.state;
        const { SearchValue } = this.props;

    if (prevProps.SearchValue !== SearchValue) {
            ImageApiService.resetPage();
            ImageApiService.fetchArticles(SearchValue).then(hits => {
            toast(`Hooray! We found ${total_hits} images.`);
          //  if (imageApiService.per_page<imageApiService.total_hits) {
          //      this.setState(isLoadMore: false);    
          //  }
            this.setState(prevState => ({
                images: [...prevState.images, ...hits],
                isLoadMore: page < Math.ceil(total_hits / per_page),
            }));

        })
        }
    }
    render() { 
        const { onClick } = this.props; 
        const { images } = this.state;
        return (
        <ul className={Style.ImageGallery}>
            {images && images.map(image => (
            <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
            ))}
        </ul>
        )
    }
};

