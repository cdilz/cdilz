'use client'

import { usePathname  } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './titled_h1.module.css'

export default function Titled_H1() {
    const [title, setTitle] = useState('')
    const pathname = usePathname()
    useEffect(() => {
        if(typeof document === typeof undefined) {
            setTitle('CDilz')
        }
        setTitle(document.title)
    }, [pathname])

    return (
    <h1 className={styles.h1}>
        {title}
    </h1>
    )
}