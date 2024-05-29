'use client';
import { useEffect, useRef } from "react"


function UserConsent({ session, baseUrl }:UserConsentPropTypes) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    
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
        
        function captureAndContinue() {
            // Now that the user consented, we can ask for this data
            
            // Optional but valuable for fraud prevention, hurts conversion
            // incode.sendFingerprint(session);
            // incode.sendGeolocation(session);
            captureIdFrontSide();
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
                onSuccess: validateId,
                onError: console.log,
                showTutorial: true
            })
        }

        function validateId() {
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
        // Render the initial module for your flow
        incode.renderUserConsent(containerRef.current, {
          onSuccess: () =>{ captureAndContinue() },
          session: session,
        });

        isMounted.current = true;

    }, [session]);
    
    return <>
        <div ref={containerRef}></div>
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

export { UserConsent };
export type { SessionType };
