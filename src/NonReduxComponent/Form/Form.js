import React, {useEffect, useState} from 'react';
import FileBase64 from 'react-file-base64';
import {createImage, getImage, updateImage} from "../NonReduxService";
import {useNavigate, useParams} from "react-router-dom";

function Form(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [creator, setCreator] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState("");

    const {id} = useParams();
    console.log(id);

    function SubmitForm(e){
        e.preventDefault();
        let imageDetail ={
            title,
            message,
            creator,
            tags,
            image
        }
        if (id) {
            console.log("About to update");
            updateImage(id, imageDetail)
                .then(
                    () => {
                        navigate("/allimages")
                    }
                )
        } else{
            createImage(imageDetail)
                .then(
                    response => {
                        console.log(response);
                        navigate("/allimages")
                    }
                )
        }
    }


    useEffect(
        () => {
            if (id){
                getImage(id)
                    .then(
                        (data) => {
                            setTitle(data.title);
                            setMessage(data.message);
                            setCreator(data.creator);
                            setTags(data.tags);
                            setImage(data.image);
                        }
                    )
            }
        }, []
    );

    return (
        <div>
            <div>
                <img src={image} alt=""/>
            </div>
            <form>
                Title: <input
                    type="text"
                    className="title_field"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br/><br/>
                Message: <input
                    type="text"
                    className="message_field"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br/><br/>
                Creator: <input
                    type="text"
                    className="creator_field"
                    name="creator"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                />
                <br/><br/>
                Tags: <input
                    type="text"
                    className="tag_field"
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <br/><br/>
                Image: <FileBase64 type="file" multiple={false} onDone={({base64}) => setImage(base64)}/>
                <div className="right-align">
                    <button className="btn" onClick={SubmitForm}>
                        submit
                    </button>
                </div>
            </form>
        </div>
    )


}


export default Form;