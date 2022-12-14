import React from 'react';
import {useNavigate} from 'react-router-dom';

export default () => {
    const history = useNavigate();
    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='p-3 w-50 rounded shadow-lg bg-white'>
                <h4 className="display-4 text-center">Ops!</h4>
                <p className="lead text-center">
                    Page Not Found <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo pariatur quasi sunt! Id illo,
                    nam quisquam quos sequi similique sunt voluptatum? Accusamus dicta illum non provident, veniam
                    voluptates. Animi, consectetur.
                </p>
                <button onClick={() => history("/")} className="btn btn-primary btn-lg">Back to Home</button>
            </div>
        </div>
    );
}