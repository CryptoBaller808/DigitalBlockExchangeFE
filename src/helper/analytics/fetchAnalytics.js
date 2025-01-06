// import { useEffect } from "react";
// import { gapi } from "gapi-script";

// const useGoogleAnalytics = () => {
//     const clientId = "467654547"; // Replace with your actual Client ID
//     const propertyId = "336864807"; // Replace with your property ID

//     useEffect(() => {
//         function initializeGapi() {
//             gapi.client.init({
//                 clientId: clientId,
//                 scope: "https://www.googleapis.com/auth/analytics.readonly",
//             });
//         }

//         gapi.load("client:auth2", initializeGapi);
//     }, [clientId]);

//     const signIn = async () => {
//         try {
//             return await gapi.auth2.getAuthInstance().signIn();
//         } catch (error) {
//             console.error("Error during sign-in:", error);
//         }
//     };

//     const fetchAnalyticsData = async () => {
//         try {
//             const response = await gapi.client.request({
//                 path: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
//                 method: "POST",
//                 body: {
//                     dimensions: [{ name: "city" }],
//                     metrics: [{ name: "activeUsers" }],
//                     dateRanges: [{ startDate: "2023-01-01", endDate: "2023-12-31" }],
//                 },
//             });

//             console.log("response.result", response.result);
//             return response.result;
//         } catch (error) {
//             console.error("Error fetching analytics data:", error);
//             throw error;
//         }
//     };

//     return { signIn, fetchAnalyticsData };
// };

// export default useGoogleAnalytics;


import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "467654547.apps.googleusercontent.com"; // Replace with your OAuth Client ID
const API_KEY = "YOUR_API_KEY"; // Replace with your API key
const DISCOVERY_DOC = "https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta";
const SCOPES = "https://www.googleapis.com/auth/analytics.readonly";
const propertyId= "336864807"
  
const useGoogleAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeGapi = () => {
      gapi.load("client:auth2", async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [DISCOVERY_DOC],
            scope: SCOPES,
          });

          const authInstance = gapi.auth2.getAuthInstance();
          if (!authInstance.isSignedIn.get()) {
            await authInstance.signIn();
          }

          fetchAnalyticsData();
        } catch (err) {
          setIsLoading(false);
          setError("Error initializing GAPI: " + err.message);
        }
      });
    };

    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        const response = await gapi.client.analyticsdata.properties.runReport({
          property: `properties/${propertyId}`, // Use your GA4 property ID
          dateRanges: [
            {
              startDate: "30daysAgo",
              endDate: "today",
            },
          ],
          dimensions: [{ name: "city" }],
          metrics: [{ name: "activeUsers" }],
        });
        setAnalyticsData(response.result);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Error fetching data: " + err.message);
      }
    };

    initializeGapi();
  }, [propertyId]);

  return { analyticsData, isLoading, error };
};

export default useGoogleAnalytics;

