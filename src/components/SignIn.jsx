
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../redux/userDucks'

import { withRouter } from 'react-router-dom'
import '../public/css/SignIn.css'

const SignIn = (props) => {

    const dispatch = useDispatch()
    const loading = useSelector(store => store.user.loading)
    const active = useSelector(store => store.user.active)
    // const [emailMethod, setEmailMethod] = React.useState(false);

    React.useEffect(() => {
        if (active) {
            props.history.push('/')
        }
    }, [active, props.history])

    const onClickGoogleAuth = () => {
        dispatch(signInAction());
        // props.history.push('/');
    }

    return (
        <div id="sign-in" className="portada">
            <div className="content">
                <div className="text">
                    <h3>Sign In</h3>
                    <button
                        onClick={onClickGoogleAuth}
                        className="btn btn-light mt-2"
                    >
                    {
                        !loading ?
                           "Sign in with google"
                           : (
                            <div className="spinner-border" style={{width: "25px", height: "25px"}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                           )
                        
                    }
                    </button>
                </div>
            </div>

        </div>
    )
}

export default withRouter(SignIn);

