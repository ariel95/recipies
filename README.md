
### This app was made by Ariel Vergara, this is a project that I did to learn React JS.
This project is using:
- React js
- Redux
- Redux Thunk (async logic).
- Database + Authentication + Images storage: Firebase.
- Icons: Fontawesome
- CSS3 + Bootstrap 4.5

### To do
-Add more recipies in scroll
-Add ingredients
-On recipie click, show details.
-Modify a recipie
-Dutch translation
-Mail sign up
-Change last searches for filters.
-Make it to PWA (Progressive web app)
-Loading while the profile is updating.

### To use font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faHeart, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon={faHome} />

### to use redux
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../redux/userDucks'
