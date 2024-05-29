## Running the project

### Install

To install execute the following command in the terminal:
```bash
npm install
```

### Setup
Create your `.env.local` file based on the `env.example` file`.

First, run the development server:

```bash
npm run dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Integrating the Incode Web SDK with Next.js

This guide provides step-by-step instructions for integrating the Incode Web SDK with Next.js.

### Considerations

- The Incode Web SDK is primarily designed for client-side rendering. While most functionality is available, it's not optimized for server-side rendering.
- Currently, the Incode Web SDK package is not compatible with server-side rendering solutions. To use it, you must import it via a script.
- For security reasons, session tokens and data fetching should be handled on the backend to protect your API keys and sensitive data.

## Backend Server

A backend server that will generate the url is needed for this sample, luckily for you we already have sample server for PHP, NodeJS, Python, PHP and Java and .NET, please reffer to our documentation on subject: [Quick Start Sample Server](https://developer.incode.com/docs/quick-start-servers)

For this sample we have included a server API service at `pages/api/start.tsx` to let you run the sample without any extra requirements.


### Integration Steps

1. While working with Next.js and TypeScript, declare the `OnBoarding` element in the `window` or `GlobalThis` object to prevent any build issues while using the Incode Web SDK. As a recommendation, declare it at the top-level entry file to ensure the element is available across the app.

   ```typescript
   declare global {
    interface Window {
        OnBoarding: any;
    }
   }
   ```

2. Load the CDN library script using Next.js's `next/script` module, utilizing the "beforeInteractive" strategy to ensure the SDK is available.

   ```typescript
   // pages.tsx
   import Script from "next/script"; 

   export default function Home() {
    return (
        <>
            <Script
                id="incode-sdk"
                src="https://sdk.incode.com/sdk/onBoarding-1.70.0.js"
                strategy="beforeInteractive"
            /> 
        </>
    );
   }
   ```

3. Now that we have the Incode Web SDK loaded, initialize it to enable the SDK to start calling the different methods.

4. To seamlessly integrate the Incode Web SDK into your application, follow the instructions outlined in the [How to use Web SDK](https://developer.incode.com/docs/tutorial-creating-an-identity-validation-app#capture-and-validate-an-id-card) guide. By adhering to these steps, you'll gain access to the data capture tools, allowing you to seamlessly integrate them into your application based on your preferred architecture strategy.
