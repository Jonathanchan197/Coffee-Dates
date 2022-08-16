import React from 'react';

const First = ({formData, setFormData}) => {
    return (
        <div>
            <h2>Are you a mentor?</h2>
            <button onClick={() => {setFormData({...formData, isMentor: true})}}>Yes</button>
            <button onClick={() => {setFormData({...formData, isMentor: false})}}>No</button>
        </div>
    );
}

export default First;