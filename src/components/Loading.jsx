import React from 'react'

const Loading = () => {
    return (
        <div style={{ height: "80vh",
                    /* width: 100vh; */
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center" }}
        >
            <div className="spinner-border" 
                style={{width: "25px", height: "25px"}} 
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
            
        
        
    )
}

export default Loading
