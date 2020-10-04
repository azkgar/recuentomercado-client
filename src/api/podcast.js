import {basePath, apiVersion} from "./config";

export function getPodcastsApi(limit, page){
    const url = `${basePath}/${apiVersion}/get-paginated-podcasts?limit=${limit}&page=${page}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err;
    });
}

export function deletePodcastApi(token, id){
    const url = `${basePath}/${apiVersion}/delete-podcast/${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function addPodcastApi(token,post){
    const url = `${basePath}/${apiVersion}/add-podcast`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(post)
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function updatePodcastApi(token, id, data) {
    const url = `${basePath}/${apiVersion}/update-podcast/${id}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function getPodcastApi(urlPost) {
    const url = `${basePath}/${apiVersion}/get-podcast/${urlPost}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function getAllPodcastsApi() {
    const url = `${basePath}/${apiVersion}/get-all-podcasts/`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function getRelatedPodcastsApi(tag) {
    const url = `${basePath}/${apiVersion}/get-podcasts-related/${tag}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}