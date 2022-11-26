import type { 
    ComponentProps, 
    FC 
} from 'react'

import { Nav } from '../components'

import './SiteLayout.css'

type SiteLayoutProps = ComponentProps<FC>

const SiteLayout = ({ children }: SiteLayoutProps) => {
    return (
        <>  
            <Nav/>
            <main
                className='main'>
                {children}
            </main>
        </>
    )
}

export default SiteLayout