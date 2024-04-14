import React, { useEffect, useState } from "react";
import FHIR from "fhirclient";

// This component causes the application to automatically redirect to EPIC MyChart Sign-in
const FhirSignInButton = () => {
  const [authorizeLink, setAuthorizeLink] = useState("");
  
  useEffect(() => {
    const createAuthorizeLink = async () => {
      const clientId = "98c8c513-fe6d-40be-8ec4-1fbd5d1d73a2"; // Replace with your client id
      const scope =
        "";
      const redirectUri = "http://localhost:3000/home"; // Replace with your redirect URI
      const serverUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"; // Replace if needed with your FHIR server URL

      try {
        const authorizeLink = await FHIR.oauth2.authorize({
          client_id: clientId,
          scope: scope,
          redirect_uri: redirectUri,
          iss: serverUrl, // Provide the server URL as the 'iss' parameter
        });

        setAuthorizeLink(authorizeLink);
      } catch (error) {
        console.error("Error creating authorize link:", error);
      }
    };

    createAuthorizeLink();
  }, []);

  const handleSignInClick = () => {
    window.location.href = authorizeLink;
  };

  return (
    <div>
      <button onClick={handleSignInClick}>Sign In</button>
    </div>
  );
};

export default FhirSignInButton;
