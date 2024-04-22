import React, { Component } from 'react';
import Slide from '../components/layouts/Slide';
import Category from '../components/layouts/Category';
import ProductOverview from '../components/layouts/ProductOverview';

const App = () => {



    return (
        <>
            <Slide />

            <Category />

            <div className="m-t-40 p-b-40">

                <ProductOverview pagination={false} />
            </div>
        </>
    )
}

export default App;
