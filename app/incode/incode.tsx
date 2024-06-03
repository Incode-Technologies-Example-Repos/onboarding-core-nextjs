'use client';
import { useEffect, useRef } from "react";
import { create } from "@incodetech/welcome";


function Incode({ session, baseUrl }:UserConsentPropTypes) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    let isOnboardingFinished = false;
    console.log(session)  
    let incode: any; 

    useEffect(() => {
        incode = create({
              apiURL: baseUrl
        });
        console.log(incode)
        
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

        function captureDocument() {
          incode.renderCamera("document", containerRef.current, {
              onSuccess: (evt: any) => {
                console.log(evt);
                finishOnboarding();
              },
              onError: console.log,
              token: session,
              showTutorial: true,
              onLog: console.log,
              numberOfTries: 3,
              nativeCamera:true
          });
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
            onSuccess: captureDocument,
            onError: console.log,
            showTutorial: true,
          });
        }
        
        function finishOnboarding() {
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
          console.log('incode:', incode)
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
