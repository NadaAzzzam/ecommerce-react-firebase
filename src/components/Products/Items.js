import React from 'react';
import './Item.scss';
function Items({ name, desc, img }) {
    // console.log(props)
    return (
        <>
            <div className="col s12 m4 l3">
                <div className="card  hoverable" >
                    <div className="card-image">
                    <img style={{ "height": "22rem " }} src={'http://adbuy-backend.kion.tech' + img} className="card-img-top" alt="" />

                    </div>

                    <div className="card-content">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{desc}</p>
                    </div>
                    <div className="card-action">
                        link
                    </div>
                </div>
            </div>
            
        </>

    );
}

export default Items;