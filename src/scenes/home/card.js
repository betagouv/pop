import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './card.css';

export default ({ data }) => {
    const arr = [];
    for (var key in data) {
       if(data[key]){
            arr.push(<span key={key}>{`${key}:${data[key]}`}</span>)
        }
    }

    return (
            <div className='card' >
            {data.IMG ? <img className="img-fluid" src={data.IMG} alt="Jean Marc Millot" /> : <div/>}
            <div className='description'>
                {arr}
            </div>
            <div className='actions'>
                    <Link to={`/notice/${data.REF}`} >
                        <Button color="primary">
                                Visit
                        </Button>
                    </Link>
            </div>
        </div>
    );
}

