import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecipie, initialDataRecipie } from '../redux/recipiesDucks'
import initialRecipiesData from '../models/Recipies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import TopNavbar from '../components/TopNavbar'

const NewRecipie = (props) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.recipie);
    const [recipie, setRecipie] = React.useState(initialRecipiesData);
    const [image, setImage] = React.useState(null);

    const addRecipieSubmit = (e) => {
        e.preventDefault();

        if (!recipie.name.trim()) {
            console.log("name vaciio")
            return
        }
        if (!recipie.description.trim()) {
            console.log("description vaciio")
            return
        }

        dispatch(addRecipie(recipie, image));

    }

    const chooseFile = (e) => {
        const img = e.target.files[0];

        if (img === undefined) {
            console.log("No se selecciono imagen")
            return;
        }

        if (!(img.type === "image/png" || img.type === "image/jpg" || img.type === "image/jpeg")) {
            console.log(img.type);
            console.log("Not supported files");
        }

        setImage(img);
    }

    return (
        <>
            <TopNavbar>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => props.history.goBack()} />
                <span className="navbar-brand" >
                    Add recipie
                </span>
 
                {
                    !loading ? (
                        <FontAwesomeIcon icon={faCheck} onClick={addRecipieSubmit} />
                    ) : (
                        <div className="spinner-border" style={{width: "25px", height: "25px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                }
 
            </TopNavbar>
            <div id="new-recipie">
                <div className="custom-file" style={{ textAlign: "center" }}>
                    <input
                        type="file"
                        className="custom-file-input"
                        id="pic"
                        aria-describedby="inputGroupFileAddon04"
                        onChange={chooseFile}
                        style={{ display: "none" }}
                    />
                    <label className="choose-pic btn btn-dark mt-2" htmlFor="pic">Picture</label>
                </div>
                <form onSubmit={addRecipieSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            aria-describedby="emailHelp"
                            value={recipie.name}
                            onChange={e => setRecipie({ ...recipie, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={recipie.description}
                            onChange={e => setRecipie({ ...recipie, description: e.target.value })}
                        />
                    </div>
                    {/* {
                    !loading ? (
                        <button type="submit" className="btn btn-dark">Add!</button>
                    ) : (
                            <button type="submit" className="btn btn-dark">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </button>
                        )
                } */}
                    <button type="submit" hidden></button>
                </form>
            </div>
        </>

    )
}

export default withRouter(NewRecipie)
