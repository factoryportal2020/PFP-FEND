import React, { Component } from 'react';
import Slide from '../components/layouts/Slide';
import Category from '../components/layouts/Category';
import ProductOverview from '../components/layouts/ProductOverview';
import Search from '../components/layouts/Search';

const App = () => {



    return (
        <>
            <Slide />
            <Search />

            <Category />


            <div className="m-t-20 p-b-40">
                <ProductOverview pagination={false} />
            </div>
        </>
    )
}

export default App;
