const refs = {
    MAIN_URL: 'https://pixabay.com/api/',
    API_KEY: '37838198-1a117cc0732e6b102a4c5cb6d',
    IMAGE_TYPE: 'photo',
    ORIENTATION: 'horizontal',
    SAFESEARCH: 'true',
};

export const ImageApiService = (SearchValue, page, per_page) => {
    console.log(SearchValue);
    console.log(page);
    console.log(per_page);

    return fetch(`${refs.MAIN_URL}?key=${refs.API_KEY}&q=${SearchValue}&image_type=${refs.IMAGE_TYPE}&orientation=${refs.ORIENTATION}&safesearch=${refs.SAFESEARCH}&page=${page}&per_page=${per_page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            console.log(response);
            return response.json();
        });
};