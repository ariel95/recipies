import React from 'react';
import '../public/css/Recipie.css'
import RecipieCardHeader from '../components/RecipieCardHeader'
import { isMobile } from '../helpers/window'

var moment = require('moment'); // require

const Recipie = (props) => {

  const dataRecipie = props.data;
  

  const getDate = () => {
    const recipieDate = dataRecipie.date.toDate();
    return moment(recipieDate).startOf('seconds').fromNow();
  }

  return (
    <div className="recipie card">
      <div className="row no-gutters">
        {
          dataRecipie.user && isMobile() &&(
            <RecipieCardHeader data={dataRecipie} />
          )
        }

        <div className="col-md-4">
          <img src={dataRecipie.imageUrl} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          {
            dataRecipie.user && !isMobile()  && (
              <RecipieCardHeader data={dataRecipie} />
            )
          }
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
