import type { ComponentProps, FC } from 'react'

import { Nav } from '../components'

import './SiteLayout.css'

type SiteLayoutProps = ComponentProps<FC>

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <Nav />
      <main className="main">{children}</main>
      <footer className="footer">
        <p className="footer-portfolio-link">
          Created by <a href="">Francisco De Los Santos</a>
        </p>
      </footer>
    </>
  )
}

export default SiteLayout
