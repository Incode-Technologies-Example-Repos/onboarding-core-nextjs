import { Incode } from "./incode/incode";
import Script from "next/script";
import startOnboardingSession from "./incode/session";

// Declare the SDK object 
declare global {
  interface Window {
      OnBoarding:any;
  }
}

export default async function Home() {
  const session: any = await startOnboardingSession();
  const baseUrl: string = process.env.INCODE_SDK_URL || "";

  return (
    <>
        {
          /* Load the sdk library using "beforeInteractive" strategy */
          <Script
            id="incode-sdk"
            src={process.env.INCODE_WEB_SDK_URL}
            strategy="beforeInteractive"/>
        }
      <main className="flex min-h-screen flex-col items-center justify-between p-24">  
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
           { <Incode
              session={session}
              baseUrl={baseUrl}>
              </Incode>}
        </div>
      </main>
    </>
  );
}
