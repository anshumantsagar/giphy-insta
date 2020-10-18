import React from 'react';

const gifcard = props => {
    return (
        <div className='card'>
            <div className='cardHead'> 
                <img alt='profile' src={props.avatar}/>
                <div >
                    <p>{props.username}</p>
                    <p>{props.time.slice(0,10)}</p>
                </div>                
            </div>
            <p className='cardGifName'>{props.title}</p>
            <div className='cardGIf'>
                <img alt='cardgif' src={props.gif}/>
            </div>
        </div>
    );
}

export default gifcard;