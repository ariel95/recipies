import React from 'react';
import '../public/css/Recipie.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { deleteRecipie } from '../redux/recipiesDucks'

var moment = require('moment'); // require

const Recipie = (props) => {

  const dataRecipie = props.data;
  const dispatch = useDispatch();
  const getDate = () => {
    const recipieDate = dataRecipie.date.toDate();
    return moment(recipieDate).startOf('seconds').fromNow();
  }

  const onClickDelete = (id) => {
      dispatch(deleteRecipie(id));
  }

  return (
    <div className="recipie card">
      <div className="row no-gutters">
        {
          dataRecipie.user && (
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

        <div className="col-md-4">
          <img src={dataRecipie.imageUrl} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{dataRecipie.name}</h5>
            <p className="card-text">{dataRecipie.description}</p>
            <p className="card-text"><small className="text-muted">{getDate()}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipie
