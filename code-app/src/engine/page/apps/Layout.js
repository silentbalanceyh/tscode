import React from 'react'
import Header from './Header'

export const Layout = ({children}) => (
  <div>
    <Header/>
    {children}
  </div>
)

Layout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Layout
