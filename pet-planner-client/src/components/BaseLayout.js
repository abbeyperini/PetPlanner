import React from 'react';
import Footer from './Footer';
import Header from './Header';

function BaseLayout(props) {
    return (
        <div>
            <Header />
            <div>
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }  
            </div>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>
    )
}

export default BaseLayout;