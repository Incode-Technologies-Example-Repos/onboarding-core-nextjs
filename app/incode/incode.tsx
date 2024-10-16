'use client';
import { useEffect, useRef, useState } from "react"


function Incode({ session, baseUrl }:UserConsentPropTypes) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);
    const [isError, setIsError] = useState(false);
    console.log(session)  
    let incode: any; 

    useEffect(() => {
        if (window && window.OnBoarding) {
           // Initialize the SDK
          incode = window.OnBoarding.create({
              apiURL: baseUrl
          });
        }
        
        if (incode && isMounted.current) {
            return;
        }

        function handleError(error:any){
          setIsError(true);
          console.log(error);
        }
        function captureIdFrontSide() {
            incode.renderCamera("front", containerRef.current, {
                token: session,
                numberOfTries: 3,
                onSuccess: captureIdBackSide,
                onError: handleError,
                showTutorial: true
            })
        }

        function captureIdBackSide() {
            incode.renderCamera("back", containerRef.current, {
                token: session,
                numberOfTries: 3,
                onSuccess: processId,
                onError: handleError,
                showTutorial: true
            })
        }

        function processId() {
          return incode.processId({ token: session.token })
            .then(() => {
              captureSelfie();
            })
            .catch((error: any) => {
              handleError(error);
            });
        }
        
        function captureSelfie() {
          incode.renderCamera("selfie", containerRef.current, {
            token: session,
            numberOfTries: 3,
            onSuccess: finishOnboarding,
            onError: handleError,
            showTutorial: true,
          });
        }
        
        function finishOnboarding() {
            console.log("faceMatch")
          incode
            .getFinishStatus(null, { token: session.token })
            .then((response: any) => {
              setIsOnboardingFinished(true);
              console.log(response);
            })
            .catch((error: any) => {
              handleError(error);
            });
        }

        function saveDeviceData() {
          incode.sendGeolocation({ token: session.token });
          incode.sendFingerprint({ token: session.token });
          captureIdFrontSide();
        }
        
        saveDeviceData();

        isMounted.current = true;

    }, [session]);
    
    return <>
        {!session && (
          <p>Starting session...</p>
        )}
        <div ref={containerRef}></div>
        
        {isOnboardingFinished && (
            <h1>Onboarding Finished.</h1>
        )}
        {isError && (
            <h1>Error.</h1>
        )}
    </>;
}

type UserConsentPropTypes = {
    session: SessionType;
    baseUrl: string;
}

type SessionType = {
  token?: string,
  interviewId?: string,
  uuid?: string
};

export { Incode };
export type { SessionType };
