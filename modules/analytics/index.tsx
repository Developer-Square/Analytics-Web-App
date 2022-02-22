import { Analytics } from "analytics";
import googleAnalytics from '@analytics/google-analytics'

interface CheckoutEventProps {
    products: string[]
}

interface AddToCartEventProps {
    product: 'string',
    quantity: number
}

// First console log to see the data.
interface UserIdentifyEventProps {

}

const analytics = Analytics({
    app: 'small-scale-ecommerce',
    plugins: [
        googleAnalytics({
            trackingId: 'UA-221105984-1'
        })
    ],
    debug: true
})

export interface EventMap {
    checkout: CheckoutEventProps,
    addToCart: AddToCartEventProps,
    identifyUser: UserIdentifyEventProps
}

export function trackEvent<K extends keyof EventMap>(eventName: K, props: EventMap[K]): void {
    analytics.track(eventName, props)
}

export default analytics