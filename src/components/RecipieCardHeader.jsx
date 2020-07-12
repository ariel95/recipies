import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { deleteRecipie } from '../redux/recipiesDucks'
import '../public/css/Recipie.css'

const RecipieCardHeader = (props) => {

    const dataRecipie = props.data;
    const dispatch = useDispatch();

    const onClickDelete = (id) => {
        dispatch(deleteRecipie(id));
    }

    return (
            <div className="d-flex flex-row bd-highlight card-header col-12">
              <div className="profile-picture">
                <img src={dataRecipie.user.photoURL} alt="" />
              </div>
              <div className="p-2 profile-name">
                {dataRecipie.user.displayName}
              </div>
              <div className="actions">
                <div className="btn-group dropleft">
                  <button className="btn-actions" data-toggle="dropdown">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>

                  <div className="dropdown-menu">
                    <button 
                      className="dropdown-item" 
                      type="button"
                      onClick={() => onClickDelete(dataRecipie.id)}  
                    >Delete</button>
                    {/* <button className="dropdown-item" type="button">Action2</button> */}
                  </div>
                </div>
              </div>
            </div>
    )
}

export default RecipieCardHeader
