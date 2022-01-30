import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';

function Layout({children,loading}) {
  return <div>
      <Header />
      <div className='content'>
        {loading && <Loader />}
        {children}
      </div>
      <Footer />
  </div>;
}

export default Layout;
