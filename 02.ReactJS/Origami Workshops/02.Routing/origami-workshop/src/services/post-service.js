const postService = {
    load: function (id, limit) {
        return fetch(`https://localhost:9999/api/origami${id ? `/${id}${limit ? `?limit=${limit}` : ''}` : ''}`)
        .then(response => response.json());
    }  
}

export default postService;