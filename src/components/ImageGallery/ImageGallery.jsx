import React, { Component } from 'react';
import { toast } from 'react-toastify';
import  * as ImageApi  from '../Services/Api-Search-image';
import { ImageGalleryItem } from '../ImageGalleryItem';
import Style from './ImageGallery.module.css';

export class ImageGallery extends Component { 
    state = { 
        images: [],
        page: 1,
        per_page: 12,
        isLoadMore: false,
    }

    componentDidUpdate(prevProps, prevState) { 
        const { page, per_page } = this.state;
        const { SearchValue } = this.props;

        if (prevProps.SearchValue !== SearchValue) { 
            this.setState({ images: [], page: 1 });
            this.fetchArticles(SearchValue, page, per_page);
        }
    }    

    fetchArticles = (SearchValue, page, per_page) => {
        //const { images } = this.state;
        ImageApi.ImageApiService(SearchValue, page, per_page)
            .then(({ hits, totalHits }) => {
                if (totalHits === 0) {
                    return toast('Sorry, there are no images matching your search query. Please try again.');
                }
                toast(`Hooray! We found ${totalHits} images.`);
            
                this.setState(prevState => ({
                    images: [...prevState.images, ...hits],
                    page: prevState.page +1,
                    isLoadMore: page < Math.ceil(totalHits / per_page),
                }));
                
            })
    }
  
        //    if (per_page < total_hits) {
        //       this.setState(isLoadMore: false);    
        //    }
        
       

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

