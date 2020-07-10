import React from 'react';
var moment = require('moment'); // require

const Recipie = (props) => {

  const getDate = () => {
    const recipieDate = props.data.date.toDate();
    return moment(recipieDate).startOf('hour').fromNow();
  }

  return (
    // <div className="card mb-3">
    //   <div className="row no-gutters">
    //     <div className="col-md-4">
    //       <img src="..." className="card-img" alt="..." />
    //       </div>
    //       <div className="col-md-8">
    //         <div className="card-body">
    //         <h5 className="card-title">{props.data.name}</h5>
    //         <p className="card-text">{props.data.description}</p>
    //         <p className="card-text"><small className="text-muted">{getDate()}</small></p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    <div className="card">
      <img src="..." className="card-img-top" alt="..."/> 
      <div className="card-body">
        <h5 classNameName="card-title">{props.data.name}</h5>
        <p classNameName="card-text">{props.data.description}</p>
        <p classNameName="card-text"><small classNameName="text-muted">{getDate()}</small></p>
      </div>
    </div>
  );
}

export default Recipie
