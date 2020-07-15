import React from 'react'

const LoadingBlocked = () => {
    return (
        <div style={{ justifyContent: "center",
                        height: "100%",
                        position: "fixed",
                        width: "100%",
                        top: "0px",
                        left: "0px",
                        zIndex: "3200",
                        filter: "alpha(opacity=65)",
                        opacity: "0.5",
                        background: "#999",
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        verticalAlign: "middle" }}
        >
            <div className="spinner-border" 
                style={{width: "25px", height: "25px"}} 
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )   
        
}

export default LoadingBlocked
