import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useMutation, useQueryClient } from 'react-query'
import { Popover, styled, toast } from '@/modules/common'
import fruitsOne from '@/public/images/fruits-1.jpg'
import { trackEvent, userIdentify, pageVisit } from '@/modules/analytics'
import { sendUserDataToApi } from '@/modules/utilities/apiCalls'
type Props = {}


export default function EcommerceAnalytics({ }: Props) {
  const queryClientAccess = useQueryClient()

  useEffect(() => {
    pageVisit()
  }, [])

  // Send the new user data to the backend.
  // We're using React Query because it allows us to manage server side
  // state more efficiently.
  const { mutateAsync } = useMutation(sendUserDataToApi, {
    onSuccess: () => {
      toast.success('Added user details successfully')
      queryClientAccess.invalidateQueries('users')
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  const onSignIn = useCallback(() => {
    userIdentify({ userId: 'user-id-131', username: 'ryann254', email: 'kingzoo.2021@gmail.com', mutateAsync: mutateAsync })
  }, [])

  const onAddToCart = useCallback(() => {
    trackEvent('addToCart', {
      product: 'Mixed Salad',
      quantity: 2
    })
  }, [])

  const onCheckout = useCallback(() => {
    trackEvent('checkout', {
      products: ['Mixed salad']
    })
  }, [])
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
              <button onClick={onSignIn} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </button>
              <Button type="button"
                onClick={onCheckout}
                className="inline-flex items-center ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Checkout</Button>
            </div>
          </div>
        </div>
      </Popover>

      {/* Main Section */}
      <main>
        <section className='flex justify-center items-center'>
          <Image src={fruitsOne} width={400}
            height={300} />
          <div className='flex flex-col items-center ml-3'>
            <div className='mb-3'>Price: $45.00</div>
            <div>
              <Button type="button"
                onClick={onAddToCart}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add To Cart</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const Button = styled.button`
  height: 40px
`