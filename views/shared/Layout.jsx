import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default (props) => {
    const { children, ...rest } = props;
    return (
        <>
            <Header {...rest} />

            <main className="mx-auto">

                {children}

            </main>

            <Footer />

        </>
    );

}