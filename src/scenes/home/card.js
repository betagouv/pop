import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default ({ data }) => {
    const arr = [];
    for (var key in data) {
       if(data[key]){
            arr.push(<span key={key}>{`${key}:${data[key]}`}</span>)
        }
    }

    return (
        <Link className='card' to={`/notice/${data.REF}`} params={{ notice: data }}>
                {data.IMG ? <img className="img-fluid" src={data.IMG} alt="Jean Marc Millot" /> : <div/>}
                <div className='description'>
                    {arr}
                </div>
        </Link >
    );
}

