import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Popover } from '@/modules/common'
import fruitsOne from '@/public/images/fruits-1.jpg'
type Props = {}

export default function EcommerceAnalytics({ }: Props) {
  return (
    <div>
      <Popover className="relative bg-white">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </Popover>

      {/* Main Section */}
      <main>
        <section className='flex justify-center content-center'>
          <Image src={fruitsOne} width={400}
            height={300} />
          <button type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add To Cart</button>
        </section>
      </main>
    </div>
  )
}

