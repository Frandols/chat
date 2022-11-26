import { useSockets } from '../context/socket'

import './Toolbar.css'

const Toolbar = () => {
    const { username } = useSockets()

    return (
        <div
            className='toolbar'>
            {username}
        </div>
    )
}

export default Toolbar