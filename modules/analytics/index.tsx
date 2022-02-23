import { Analytics } from "analytics";
import googleAnalytics from '@analytics/google-analytics'

interface CheckoutEventProps {
    products: string[]
}

interface AddToCartEventProps {
    product: string,
    quantity: number
}

// First console log to see the data.
interface UserIdentifyEventProps {
    userId: string,
    email: string,
    username: string
}

const sendData = (data: any) => {
    // if (typeof navigator.sendBeacon === 'function') {
    //     navigator.sendBeacon('https://t4odney23k.execute-api.us-east-1.amazonaws.com/default/postEventData', JSON.stringify(data))
    // } else {
    //     var xhr = new XMLHttpRequest()
    //     xhr.open('POST', 'https://t4odney23k.execute-api.us-east-1.amazonaws.com/default/postEventData')
    //     xhr.send(data)
    // }
}

const awsPlugin = () => {
    return {
        name: 'aws-plugin',
        page: function page(_ref: any) {
            const payload = _ref.payload
            console.log('Page Event', payload);
            sendData(payload)
        },
        track: function track(_ref2: any) {
            const payload = _ref2.payload
            sendData(payload)
        },
        identify: function identify(_ref3: any) {
            const payload = _ref3.payload
            sendData(payload)
        },
        loaded: function loaded() {
            return true
        }
    }
}

const analytics = Analytics({
    app: 'small-scale-ecommerce',
    plugins: [
        googleAnalytics({
            trackingId: 'UA-221105984-1'
        }),
        awsPlugin()
    ],
    debug: true
})

// Checkout this link for a better explanation of the following code:
// https://getanalytics.io/tutorials/typesafe-analytics/
// https://youtu.be/NJxagi7K-D8
export interface EventMap {
    checkout: CheckoutEventProps,
    addToCart: AddToCartEventProps,
    identifyUser: UserIdentifyEventProps
}

const sendDataToApi = (method: string, path: string, data: any) => {
    let url = ''
    if (process.env.MODE === 'Development') {
        url = `http://localhost:3000/${path}`
    }

    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const trackEvent = <K extends keyof EventMap>(eventName: K, props: EventMap[K]): void => {
    analytics.track(eventName, props)
}

export const pageVisit = (): void => {
    analytics.page()
}

export const userIdentify = (params: UserIdentifyEventProps): void => {
    analytics.identify(params.userId, { email: params.email, name: params.username })
}

export default analytics