
import React from 'react'
// import {UserContext} from '../context/UserProvider'
// import { useDispatch, useSelector } from 'react-redux'
import {  useSelector } from 'react-redux'

import { withRouter } from 'react-router-dom'



const SignUp = (props) => {

    // const dispatch = useDispatch()
    // const loading = useSelector(store => store.user.loading)
    const activo = useSelector(store => store.user.activo)

    React.useEffect(() => {
        // console.log(activo)
        if (activo) {
            props.history.push('/')
        }
    }, [activo, props.history])

    return (
        <div>
            Sign up
        </div>
    )
}

export default withRouter(SignUp);
