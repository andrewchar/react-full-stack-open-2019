import React from 'react';

const Notification = ({msg, status}) => {
    


    if (msg === null) {
        return null;
    }



    return (
        <div className={`${status} notification`}>
            {msg}
        </div>
    );
};

export default Notification;