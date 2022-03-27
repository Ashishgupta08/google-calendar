import React, { useEffect } from 'react';

export const Calendar = () => {

    const CLIENT_ID = '890572177399-1ah148l49gegdbn2mcira7udqi0p91ps.apps.googleusercontent.com'
    const API_KEY = 'AIzaSyAcqNIFfn_MFHZW6NcRSNqTV3_ZMrGGQYA'

    function authenticate() {
        return window.gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/calendar" })
            .then(function () { console.log("Sign-in successful"); },
                function (err) { console.error("Error signing in", err); });
    }
    function loadClient() {
        window.gapi.client.setApiKey(API_KEY);
        return window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
            .then(function () { console.log("window.gapi client loaded for API"); },
                function (err) { console.error("Error loading window.gapi client for API", err); });
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute() {
        return window.gapi.client.calendar.acl.list({
            "calendarId": "primary"
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
                function (err) { console.error("Execute error", err); });
    }
    // window.gapi.load("client:auth2", function () {
    //     window.gapi.auth2.init({ client_id: CLIENT_ID });
    // });

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://apis.google.com/js/api.js";

        document.body.appendChild(script);

        script.addEventListener("load", () => {
            if (window.gapi) handleClientLoad();
        });
    }, []);

    const handleClientLoad = () => {
        window.gapi.load({ client_id: CLIENT_ID });
    }

        return (
            <div>
                <button onClick={() => { authenticate().then(loadClient) }}>authorize and load</button>
                <button onClick={() => { execute() }}>execute</button>
            </div>
        );
    }