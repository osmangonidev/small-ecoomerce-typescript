import React, { ReactChildren, ReactChild } from 'react';
import Nav from "./Nav";

interface LayoutProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  }

export default function Layout({children}: LayoutProps){
    return(
        <>  
            <Nav/>
            <main>{children}</main>
        </>
    )
}