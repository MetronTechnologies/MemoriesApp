import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import Memories from "../Memories/Memories";
import { GetPostsBySearch, Getter } from "../Redux/AsyncActions/AsyncActions";
import "./Home.css";
import Pagination from "../Utilities/Pagination";
import {AppBar, TextField, Button, Paper} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import useStyles from "./styles";




function Home(){

    function useQuery(){
        return new URLSearchParams(useLocation().search)
    }

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([])


    // useEffect(() => {
    //     dispatch(Getter());
    // }, [currentId, dispatch]);

    function handleKeyPress(e){
        if(e.keyCode === 13) {
            searchPost();
        }
    }

    function handleAdd(tag) {
        return setTags([...tags, tag])
    }

    function handleDelete(tagToDelete) {
        return setTags(
            tags.filter(
                (tag) => tag !== tagToDelete
            )
        )
    }

    function searchPost() {
        if(search.trim() || tags) {
            var theQuery = {
                search,
                tags: tags.join(",")
            }
            dispatch(GetPostsBySearch(theQuery));
            navigate(`/memories/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate("/")
        }
    }



    return(
        <div className="app_body">
            <div className="app_posts">
                <Memories setCurrentId={setCurrentId} />
            </div>
            <div className="app_form">
                <AppBar  className={classes.appBarSearch} position="static" color="inherit">
                    <TextField
                        name="search"
                        variant="outlined"
                        label="Search Memories"
                        fullWidth
                        value={search}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setSearch(e.target.value)}
                        className="material"
                    />
                    <ChipInput
                        style={
                            {margin: "10px 0"}
                        }
                        value = {tags}
                        onAdd ={handleAdd}
                        onDelete ={handleDelete}
                        label = "Search Tags"
                        variant="outlined"
                        className="material"
                    />
                    <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" >
                        Search
                    </Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                {
                    (!searchQuery && !tags.length) && 
                    <Paper elevation={6} className={classes.pagination}>
                        <Pagination page={page} />
                    </Paper>
                }
                
            </div>
        </div>
    );

}


export default Home;
