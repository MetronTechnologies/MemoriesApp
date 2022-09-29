import axios from 'axios';
// const url = "http://localhost:5000/memories";

const API = axios.create(
    {
        baseURL: "https://mtmemories.onrender.com"
    }
);

API.interceptors.request.use(
    (request) => {
        if (localStorage.getItem("profile")) {
            const profile = JSON.parse(localStorage.getItem("profile"));
            request.headers.Authorization = `Bearer ${profile.token}`;
        }
        return request;
    }
);



// const getItems = () => axios.get(url+"/get");

// const createItem = (item) => axios.post(url+"/create",item);

// const deleteItem = (id) => axios.delete(url+ "/delete/"+ id);

// const getItem = (id) => axios.get(url+"/get/"+id);

// const updateItem = (id, updates) => axios.put(url+"/update/"+id, updates);

// const likeItem = (id) => axios.patch(url+"/like/"+id+"/likememory" );


// const getItems = () => API.get("/memories/get");


const getItems = (page) => API.get(`/memories/get?page=${page}`);

const createItem = (item) => API.post("/memories/create", item);

const deleteItem = (id) => API.delete("/memories/delete/" + id);

const getItem = (id) => API.get("/memories/get/" + id);

const updateItem = (id, updates) => API.put("/memories/update/" + id, updates);

const likeItem = (id) => API.patch("/memories/like/" + id + "/likememory");

const signIn = (formData) => API.post("/user/signin", formData);

const signUp = (formData) => API.post("/user/signup", formData);

const getItemsBySearch = (searchQuery) => API.get(`/memories/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

const comment = (theComment, id) => API.post("/memories/comment/" + id + "/commentMemory", { theComment })




export { getItems, createItem, deleteItem, updateItem, getItem, likeItem, signIn, signUp, getItemsBySearch, comment }