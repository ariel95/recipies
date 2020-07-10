
import React from 'react'
// import {UserContext} from '../context/UserProvider'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../redux/userDucks'

import { withRouter } from 'react-router-dom'
import Copyright from './Copyright'

const SignIn = (props) => {

    const dispatch = useDispatch()
    // const loading = useSelector(store => store.user.loading)
    const activo = useSelector(store => store.user.activo)
    const [emailMethod, setEmailMethod] = React.useState(false);

    React.useEffect(() => {
        // console.log(activo)
        if (activo) {
            props.history.push('/')
        }
    }, [activo, props.history])

    const onClickGoogleAuth = () => {
        dispatch(signInAction());
        props.history.push('/');
    }

    return (
        <div>
            <h3>Sign In</h3>
            <button
                onClick={onClickGoogleAuth}
                className="btn btn-dark"
            >Sign in with google</button>

        </div>
    )
}

export default withRouter(SignIn);

