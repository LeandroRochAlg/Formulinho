import "../styles/components/coworker.css";
import React from 'react'

const Coworker = ({nome, cargo, desc, img}) => {    

    return (
        <div className="abt-container">
            <img className="abt-fig" src={img} alt="fodase" height="640" width="805" loading="lazy" />
            <div className="abt-desc">
                <div className="abt-titles">
                    <h4 style={{color:'#fff', fontWeight:'600'}}>{nome}</h4>
                    <span  style={{color:'#718096', fontWeight:'400', display:'block', fontSize:'0.875rem'}}>{cargo}</span> 
                </div>
                <div className="ppl-desc">
                    <p style={{marginTop:'2rem', color:'#a0aec0'}}>
                        {desc}
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default Coworker