import React from 'react';
import './card.css';

export default ({ data }) => {
    const arr = [];
    for (var key in data) {
       if(data[key]){
            arr.push(<span id={key}>{`${key}:${data[key]}`}</span>)
        }
    }

    let image = '';
    if(data.IMG){
        image=data.IMG.replace('@{img1;//','http://').replace(';ico1}@','');
    }

    return (
        <div className='card'>
            {image ? <img class="img-fluid" src={image} alt="Jean Marc Millot" /> : <div/>}
            <div className='description'>
            {arr}
            </div>
        </div>
    );
}

