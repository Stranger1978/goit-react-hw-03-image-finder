import { toast } from 'react-toastify';

const refs = {
    MAIN_URL: 'https://pixabay.com/api/',
    API_KEY: '37838198-1a117cc0732e6b102a4c5cb6d',
    IMAGE_TYPE: 'photo',
    ORIENTATION: 'horizontal',
    SAFESEARCH: 'true',
};

export default class ImageApiService { 
    constructor() { 
        this.queryValue = '';
        this.page = 1;
        this.per_page = 12;
        this.total_hits = 0;
    }

    fetchArticles() { 
        return fetch(`${refs.MAIN_URL}?key=${refs.API_KEY}&q=${this.queryValue}&image_type=${refs.IMAGE_TYPE}&orientation=${refs.ORIENTATION}&safesearch=${refs.SAFESEARCH}&page=${this.page}&per_page=${this.per_page}`)
        .then(response => { 
        if (!response.ok) { 
            throw new toast(response.status);
        }
        return response.json();
        })
            .then(data => {
                if (data.totalHits === 0) {
                    toast('Sorry, there are no images matching your search query. Please try again.');
                }
                this.total_hits = data.totalHits;
                this.page += 1;
                return data.hits;
            }
                )
        .catch(console.warn);
    }

    resetPage() {
        this.total_hits = 0;
        this.page = 1;
    }
    get query() { 
    return this.queryValue;
    }

    set query(newQuery) { 
    this.queryValue = newQuery;
    }
}