import React, { Component } from 'react';
import { toast } from 'react-toastify';
import  * as ImageApi  from '../Services/Api-Search-image';
import { ImageGalleryItem } from '../ImageGalleryItem';
import Style from './ImageGallery.module.css';
import { Loader } from '../Loader';
import { Button } from '../Button';
import PropTypes from 'prop-types';

export class ImageGallery extends Component { 
    state = { 
        images: [],
        page: 1,
        per_page: 12,
        isLoadMore: false,
        isLoading: false,
    }

    componentDidUpdate(prevProps, prevState) { 
        const { page, per_page } = this.state;
        const { SearchValue } = this.props;

        if (prevProps.SearchValue !== SearchValue) { 
            this.setState({ images: [], page: 1, isLoading: true });
            this.fetchArticles(SearchValue, page, per_page);
        }
    }  
    fetchArticles = () => {
        const { SearchValue } = this.props;
        const { page, per_page } = this.state;
   
        ImageApi.ImageApiService(SearchValue, page, per_page)
            .then(({ hits, totalHits }) => {
                if (totalHits === 0) {
                    this.setState({isLoading: false});
                    return toast('Sorry, there are no images matching your search query. Please try again.');
                }
                if (page === 1) {
                toast(`Hooray! We found ${totalHits} images.`);    
                }
                this.setState(prevState => ({
                    images: [...prevState.images, ...hits],
                    page: prevState.page +1,
                    isLoadMore: page < Math.ceil(totalHits / per_page),
                    isLoading: false,
                }));
            })
     }
       
    render() { 
        const { onClick } = this.props; 
        const { images, isLoadMore, isLoading } = this.state;
        return (
            <div>
            <ul className={Style.ImageGallery}>
            {images && images.map(image => (
                <ImageGalleryItem key={image.id}
                                  image={image}
                                  onClick={onClick}
                />
            ))}
                </ul>
                {isLoadMore &&  <Button onClick={this.fetchArticles} />}
                {isLoading && <Loader />}
                </div>
                )
        }
    };

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    SearchValue: PropTypes.string.isRequired,
    image: PropTypes.shape({
        id: PropTypes.object.isRequired
    }),
};
