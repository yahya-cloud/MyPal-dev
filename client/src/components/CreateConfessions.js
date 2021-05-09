import React,{useState,useContext} from 'react';
import {storage,DataBase} from './firebase';
import firebase from 'firebase';
import {Button, IconButton, Input, Modal,TextField} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import LinearProgress from '@material-ui/core/LinearProgress'
import {useStateValue} from '../contexts/StateProvider'
import './CreateConfessions.css'
import DateTimeSelect from './DateTimeSelect'

function CreateConfessions() {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //store confession
    const [confession,setConfession] = useState('')

    const handlePost = () => {
        DataBase.collection('confessions').add({
            confession:confession,
            user_id:user.uid,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })

    }


    return (
        <div className="createConfessions">
                <form className="createConfessions__form">
                    <h2 id="createConfessions_h2"> Write a Confession </h2>
                    <TextField placeholder = "Write your heart out..." className = "createConfessions__textarea" onChange={(e)=>setConfession(e.target.value)} value={confession}
                                    id="outlined-multiline-static"
                                    label="Write a confession..."
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    />
                    <Button className="createEvent___iButton" disabled = {!confession} variant ='contained' color="primary" type ='submit' onClick={handlePost}>Post</Button>
                </form>
        </div>
        
    )
}

export default CreateConfessions;

