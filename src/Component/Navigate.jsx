import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Navigate = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("type");
    useEffect(()=>{
        if (user === "Institute") {
            navigate("/institute/request"); 
        }
        if(user==="Transport"){
            navigate("/transport/request")
        }
        else{
            navigate('/login')
        }
    },[])
    
    
    return (
        <div>
            Redirting...
            
        </div>
    );
}

export default Navigate;
