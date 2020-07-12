import React from 'react';
import '../public/css/Recipie.css'
var moment = require('moment'); // require

const Recipie = (props) => {

  const getDate = () => {
    const recipieDate = props.data.date.toDate();
    return moment(recipieDate).startOf('seconds').fromNow();
  }

  return (
    <div className="recipie card">
      <div className="row no-gutters">
        {
          props.data.user && (
            <div class="d-flex flex-row bd-highlight card-header col-12">
              <div className="profile-picture">
                <img src={props.data.user.photoURL} alt=""/>
              </div>
              <div class="p-2 profile-name">{props.data.user.displayName}</div>
            </div>
            // <div className="col-12 card-header row">
            //   <div className="profile-picture col-1">
            //     <img src={props.data.user.photoURL} alt=""/>
            //   </div>
            //   <div className="col-11 ">
            //     {props.data.user.displayName}
            //   </div>
            // </div>
          )
        }
        
        <div className="col-md-4">
          <img src={props.data.imageUrl} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.data.name}</h5>
            <p className="card-text">{props.data.description}</p>
            <p className="card-text"><small className="text-muted">{getDate()}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipie
