import React from 'react'
import NavItem from './NavItem'

type Props = {}

export default function NavGroup() {
    const totalEventsTitles = ['Visit Page', 'Add to Cart', 'New Order', 'Login']
    return (
        <>
            {totalEventsTitles.map((title, index) => (
                <NavItem key={index} title={title} index={index} />
            ))}
        </>
    )
}
