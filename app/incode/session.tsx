export default async function startOnboardingSession() {
  // call your backend or service to retreive the session token using your own app strategy
  // either using a server action or fetching an API
  //
  // const response = await fetch("..");
  // if (!response.ok) {
  //   const sessionData = await response.json();
  //   throw new Error(sessionData.error);
  // }
  // console.log(await response.json());
  // return await response.json() as any;

  // // Sample token to be retreived from your backend
  //
  // return {
  //   "interviewId": "..",
  //   "token": "..",
  //   "interviewCode": "LPDQI5",
  //   "flowType": "flow",
  //   "idCaptureTimeout": 16,
  //   "selfieCaptureTimeout": 16,
  //   "idCaptureRetries": 3,
  //   "selfieCaptureRetries": 3,
  //   "curpValidationRetries": 1,
  //   "clientId": "..",
  //   "env": "demo",
  //   "existingSession": false,
  //   "endScreenTitle": "Thank you for submitting your information",
  //   "endScreenText": "Agents will be in touch with you shortly",
  //   "optinEnabled": false,
  //   "optinCompanyName": "",
  //   "onboardingLinkExpirationMinutes": 15
  // }
}

