import React from 'react'
import { MiniHeader } from './Date'
import NavItem from './NavItem'

type Props = {}

export default function Categories({ }: Props) {
    return (
        <>
            <MiniHeader>Categories</MiniHeader>
            <NavItem title='Commerce' />
            <NavItem title='User' />
        </>
    )
}