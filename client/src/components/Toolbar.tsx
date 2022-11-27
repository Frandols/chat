import { useSockets } from '../context/socket'

import './Toolbar.css'

const Toolbar = () => {
    const { user } = useSockets()

    return (
        <div
            className='toolbar'>
            {user}
        </div>
    )
}

export default Toolbar