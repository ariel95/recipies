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
        {/* <div className="col-12 header">
          {"hola soy el encabezado"}
        </div> */}
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
