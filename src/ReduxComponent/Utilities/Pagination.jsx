import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab"
import useStyles from "./styles"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Getter } from "../Redux/AsyncActions/AsyncActions";


function Paginate({page}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector(
        state => state.posts
    );

    useEffect(
        () => {
            if(page) {
                dispatch(Getter(page))
            }
        }, [page]
    );


    return (
        <Pagination
            classes = {
                { ul: classes.ul}
            }
            count = {state.numberOfPages}
            page = {Number(page || 1)}
            variant = "outlined"
            color="primary"
            renderItem={
                (item) => (
                    <PaginationItem {...item} component={Link} to={`/memories?page=${item.page}`} />
                )
            }
        />
    );

}



export default Paginate;



