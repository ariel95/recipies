import React from 'react'
import { seeMoreText } from '../helpers/texts'

const MoreButton = (props) => {

    const click = props.click;
    const loading = props.loading

    return (
        <div style={{ textAlign: "center" }}>
            {
                !loading ? (
                    <button
                        style={{ marginBottom: "25px" }}
                        className="btn color-app"
                        onClick={click}
                    >
                        {seeMoreText()}
                    </button>
                ) : (
                    <div className="spinner-border" 
                        style={{width: "25px", height: "25px"}} 
                        role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )
            }

        </div>
    )
}

export default MoreButton
