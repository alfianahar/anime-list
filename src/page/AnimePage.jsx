import React from 'react'
import { useLocation } from 'react-router-dom'

const usePathname = () => {
    const location = useLocation();
    return location.pathname;
}

const AnimePage = () => {
    const currentPath = usePathname().substring(
        usePathname().indexOf("e/") + 1,
        usePathname().lastIndexOf("/")
    ).replace('/', '');
    // console.log(currentPath)
    return (
        <div>Anime Detail Page</div>
    )
}

export default AnimePage

