import React from 'react'

const Copyright = () => {
    return (
        <div>
            {'Copyright © '}
            Your Website
            {new Date().getFullYear()}
            {'.'}
        </div>
    )
}

export default Copyright


