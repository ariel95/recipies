import React from 'react'
import TopNavbar from './TopNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAction, editProfilePictureAction } from '../redux/userDucks'
import '../public/css/EditProfile.css'

const EditProfile = (props) => {

    const dispatch = useDispatch();
    const { user, loading } = useSelector(store => store.user);
    const [dataUser, setDataUser] = React.useState(user);


    const onSubmitEditProfile = (e) => {
        e.preventDefault();
        // console.log("submit edit");
        // console.log(dataUser);
        if(!dataUser.displayName.trim()){
            console.log("Nombre vacii");
            return;
        }
        dispatch(updateUserAction(dataUser, dataUser.newPhoto));
        // props.history.push("profile");
    }

    const chooseFile = (e) => {
        const img = e.target.files[0];

        if(img === undefined){
            console.log("No se selecciono imagen")
            return;
        }

        if(!(img.type === "image/png" || img.type === "image/jpg" || img.type === "image/jpeg")){
            console.log(img.type);
            console.log("Not supported files");
        }

        setDataUser({ ...dataUser, newPhoto: img })
    }

    return (
        <>
            <TopNavbar>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => props.history.goBack()} />
                <span className="navbar-brand" >
                    Edit profile
                </span>
                {
                    !loading ? (
                        <FontAwesomeIcon icon={faCheck} onClick={onSubmitEditProfile} />
                    ) : (
                        <div className="spinner-border" style={{width: "25px", height: "25px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                }
                {/* <FontAwesomeIcon icon={faCheck} onClick={onSubmitEditProfile} /> */}

            </TopNavbar>
            <div id="edit-profile">
                <div className="card" width="400px">
                    {/* <img src={dataUser.photoURL} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <form onSubmit={onSubmitEditProfile}>
                            <div className="profile-picture">
                                <img className="card-img-top" width="100px" src={dataUser.photoURL} alt=""></img>
                            </div>
                            <div className="custom-file" style={{textAlign:"center"}}>
                                <input 
                                    type="file" 
                                    className="custom-file-input" 
                                    id="pic" 
                                    aria-describedby="inputGroupFileAddon04" 
                                    onChange = {chooseFile}
                                    style={{display:"none"}}
                                />
                                <label className="choose-pic btn btn-dark mt-2" htmlFor="pic">Change profile picture</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" value={dataUser.displayName} onChange={(e) => setDataUser({ ...dataUser, displayName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inpemailutAddress2">Email</label>
                                <input id="email" type="text" value={user.email} readOnly disabled/>
                            </div>
                            <button type="submit"hidden></button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default withRouter(EditProfile)
