import { Incode } from "./incode/incode";
import startOnboardingSession from "./incode/session";

export default async function Home() {
  const session: any = await startOnboardingSession();
  const baseUrl: string = process.env.INCODE_SDK_URL || "";

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">  
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
           { <Incode
              session={session}
              baseUrl={baseUrl}>
              </Incode>
            }
        </div>
      </main>
    </>
  );
}
