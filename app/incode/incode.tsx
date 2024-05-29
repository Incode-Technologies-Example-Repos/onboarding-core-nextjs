'use client';
import { useEffect, useRef } from "react"


function Incode({ session, baseUrl }:UserConsentPropTypes) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    let isOnboardingFinished = false;
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

        function captureIdFrontSide() {
            incode.renderCamera("front", containerRef.current, {
                token: session,
                numberOfTries: 3,
                onSuccess: captureIdBackSide,
                onError: console.log,
                showTutorial: true
            })
        }

        function captureIdBackSide() {
            incode.renderCamera("back", containerRef.current, {
                token: session,
                numberOfTries: 3,
                onSuccess: processId,
                onError: console.log,
                showTutorial: true
            })
        }

        function processId() {
          return incode.processId({ token: session.token })
            .then(() => {
              captureSelfie();
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
        
        function captureSelfie() {
          incode.renderCamera("selfie", containerRef.current, {
            token: session,
            numberOfTries: 3,
            onSuccess: finishOnboarding,
            onError: console.log,
            showTutorial: true,
          });
        }
        
        function finishOnboarding() {
            console.log("faceMatch")
          incode
            .getFinishStatus(null, { token: session.token })
            .then((response: any) => {
              console.log(response);
            })
            .catch((error: any) => {
              console.log(error);
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
        {
          !isOnboardingFinished && (
            <p>Onboarding Finished.</p>
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
