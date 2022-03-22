# Analytics Web App - Incomplete
This app is meant to be used as a helper where you simply connect it to your own website and send data to it. The app should then receive the data and display it in a meaningful manner that can be used for analytics. The data to be sent should be in three categories which include:  
  1. User events e.g. button click.  
  2. Page events e.g. page visits.  
  3. User identification e.g. when a user logins in.  

It's recommended to use a library by the name of `analytics` on your own website to collect the data(button clicks and all) since it integrates very well with this project. However, the project can be altered to fit any type of data coming in. It's built with Nextjs and Typescript.

Checkout the `analytics` library here..https://getanalytics.io/

## Usage as of time or writing:
To run the app, simply do a  `git clone https://github.com/ryann254/Analytics-Web-App.git`, cd into the cloned project, then do a `yarn install`. Lastly type in `yarn dev` in your terminal to run the project.

When the project runs successfully, you'll see a page with a link to a Demo page and a created userId. First thing you need to do is to go into pages/EcommerceAnalytics.tsx and on line 32 change the string `user-id-131` to your name. Then go back to your browser and click E-commerce page link.

It should take you to a page with a Signin, Checkout and Add to Cart button, open up your console(Ctrl+Shift+J - Windows) then click the three buttons. You should see all the analytics logged on the console.

When you go back to the homepage, you should see your name as the created userId.

### Disclamer
If you click the Signin button multilple times, it'll give you an error of user already exists.

## Getting Started

Make sure you have yarn installed. Run `brew install yarn`.

- Step 1: Run `yarn install`
- Step 2: Create a .env.local file with the following details

```bash
# mongoDB URI
MONGODB_URI=mongodb://127.0.0.1:27017

# DB_NAME
DB_NAME=analytics-web-app
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
