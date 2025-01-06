import ReactGA from "react-ga";
import axios from "axios";

const initializeAnalytics = async () => {
  ReactGA.initialize("G-Y7JFCH1TE5"); // Replace with your Google Analytics Tracking ID

  // Track page view in Google Analytics
  ReactGA.pageview(window.location.pathname + window.location.search);

  try {
    // Wait for location data to resolve
    const location = await getLocationData();

    const pageViewData = {
      pageUrl: window.location.pathname + window.location.search, // Current page URL
      referrer: document.referrer || "unknown", // Referrer URL
      timestamp: new Date().toISOString(), // Timestamp of the visit
      location: location, // Location data
      userId: getUserId(), // User ID, if available
      ip: location.ip, // IP address from location data
    };

    console.log("Page View Data:", pageViewData); // Debugging

    // Optionally send page view data to the backend API
    // const response = await axios.post('/api/track', pageViewData);
    // console.log("Page view data saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving page view data:", error);
  }
};

const getLocationData = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const ipResponse = await axios.get("https://api.ipify.org?format=json");
            const userIp = ipResponse.data.ip;

            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              country: "Country Name", // Use an API to resolve country/city if needed
              city: "City Name",
              ip: userIp,
            });
          } catch (ipError) {
            console.error("Error fetching IP address:", ipError);
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              country: "Unknown",
              city: "Unknown",
              ip: "Unknown",
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject(new Error("Geolocation failed"));
        }
      );
    } else {
      console.error("Geolocation is not supported.");
      resolve({
        latitude: null,
        longitude: null,
        country: "Unknown",
        city: "Unknown",
        ip: "Unknown",
      });
    }
  });
};

const getUserId = () => {
  // Replace with your actual user ID retrieval logic
  return localStorage.getItem("userId") || null;
};

export default initializeAnalytics;
