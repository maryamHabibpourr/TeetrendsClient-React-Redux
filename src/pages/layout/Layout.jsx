import React from 'react'
import {Footer , Header} from "../../components"

function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout