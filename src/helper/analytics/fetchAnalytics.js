import { useEffect } from "react";
import { gapi } from "gapi-script";

const useGoogleAnalytics = () => {
    const clientId = "467654547"; // Replace with your actual Client ID
    const propertyId = "336864807"; // Replace with your property ID

    useEffect(() => {
        function initializeGapi() {
            gapi.client.init({
                clientId: clientId,
                scope: "https://www.googleapis.com/auth/analytics.readonly",
            });
        }

        gapi.load("client:auth2", initializeGapi);
    }, [clientId]);

    const signIn = async () => {
        try {
            return await gapi.auth2.getAuthInstance().signIn();
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const fetchAnalyticsData = async () => {
        try {
            const response = await gapi.client.request({
                path: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
                method: "POST",
                body: {
                    dimensions: [{ name: "city" }],
                    metrics: [{ name: "activeUsers" }],
                    dateRanges: [{ startDate: "2023-01-01", endDate: "2023-12-31" }],
                },
            });

            console.log("response.result", response.result);
            return response.result;
        } catch (error) {
            console.error("Error fetching analytics data:", error);
            throw error;
        }
    };

    return { signIn, fetchAnalyticsData };
};

export default useGoogleAnalytics;
