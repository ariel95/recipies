import React from 'react';
import '../public/css/Recipie.css'
import RecipieCardHeader from '../components/RecipieCardHeader'
import { isMobile } from '../helpers/window'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { favouriteRecipie } from '../redux/recipiesDucks';
import { useDispatch } from 'react-redux'


var moment = require('moment'); // require

const Recipie = (props) => {

  
  const dispatch = useDispatch();
  const [dataRecipie, setDataRecipie] = React.useState(props.data);
  const [isFav, setIsFav] = React.useState(dataRecipie.favourite);
  const getDate = () => {
    const recipieDate = dataRecipie.date.toDate();
    return moment(recipieDate).startOf('seconds').fromNow();
  }

  const deletingRecipie = (e) => {
    console.log("deletingRecipie")
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("deleting")
  }

  const onClickFavourite = () => {
    dispatch(favouriteRecipie(dataRecipie))
    if(isFav){
      setIsFav(false);
      setDataRecipie( {...dataRecipie, favourite: false})
    }
    else{
      setIsFav(true);
      setDataRecipie({...dataRecipie, favourite: true});
    }
      

    
  }

  return (
    <div className="recipie card">
      <div className="row no-gutters">
        {
          dataRecipie.user && isMobile() && (
            <RecipieCardHeader data={dataRecipie} deleteFunction={deletingRecipie} />
          )
        }

        <div className="col-md-4">
          <img src={dataRecipie.imageUrl} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          {
            dataRecipie.user && !isMobile() && (
              <RecipieCardHeader data={dataRecipie} deleteFunction={deletingRecipie} />
            )
          }

          <div className="card-body">

            <h5 className="card-title">{dataRecipie.name}</h5>
            <p className="card-text">{dataRecipie.description}</p>
            <p className="card-text"><small className="text-muted">{getDate()}</small></p>
            <div className="card-actions">
              {
                isFav ? (
                  <button
                    className="btn-default"
                    onClick={onClickFavourite}
                  >
                    <FontAwesomeIcon icon={faHeartSolid} />
                  </button>
                ) : (
                    <button
                      className="btn-default"
                      onClick={onClickFavourite}
                    >
                      <FontAwesomeIcon icon={faHeartRegular} />
                    </button>
                  )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipie
