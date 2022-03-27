import { useState, useEffect } from 'react';
import { Abc } from './abc';
import './App.css'
import { Calendar } from './Calendar';
import { CalendarPoc } from './calendar-poc';

function App() {
  // const CLIENT_ID = "890572177399-1ah148l49gegdbn2mcira7udqi0p91ps.apps.googleusercontent.com"
  // const API_KEY = "AIzaSyAcqNIFfn_MFHZW6NcRSNqTV3_ZMrGGQYA"
  // const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  // const SCOPES = "https://www.googleapis.com/auth/calendar.events"
  // // const SCOPES =
  // // "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

  // const [events, setEvents] = useState(null);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.defer = true;
  //   script.src = "https://apis.google.com/js/api.js";

  //   document.body.appendChild(script);

  //   script.addEventListener("load", () => {
  //     if (window.gapi) handleClientLoad();
  //   });
  // }, []);

  // const handleClientLoad = () => {
  //   window.gapi.load("client:auth2", initClient);
  // }

  // const initClient = async () => {
  //   if (!localStorage.getItem("access_token")) {
  //     await openSignInPopup();
  //   } else {
  //     // Get events if access token is found without sign in popup
  //     // console.log(API_KEY)
  //     console.log(localStorage.getItem("access_token"))
  //     window.gapi.auth2.getAuthInstance().signIn().then(() => {
  //       window.gapi.client.calendar.events.list({
  //         'calendarId': 'primary',
  //         'timeMin': (new Date()).toISOString(),
  //         'showDeleted': false,
  //         'singleEvents': true,
  //         'maxResults': 10,
  //         'orderBy': 'startTime'
  //       }).then(response => {
  //         const events = response.result.items
  //         console.log('EVENTS: ', events)
  //       })
  //     }).catch((e) => console.log(e))
  //     // fetch(
  //     //   `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //     //     },
  //     //   }
  //     // )
  //     //   .then((res) => {
  //     //     // Check if unauthorized status code is return open sign in popup
  //     //     if (res.status !== 401) {
  //     //       return res.json();
  //     //     } else {
  //     //       localStorage.removeItem("access_token");

  //     //       openSignInPopup();
  //     //     }
  //     //   })
  //     //   .then((data) => {
  //     //     if (data?.items) {
  //     //       setEvents(formatEvents(data.items));
  //     //     }
  //     //   }).catch(e => console.log('error - ', e))
  //   }
  // };

  // const openSignInPopup = () => {
  //   window.gapi.auth2.authorize(
  //     {
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES,
  //     },
  //     (res) => {
  //       if (res) {
  //         if (res.access_token)
  //           localStorage.setItem("access_token", res.access_token);

  //         // Load calendar events after authentication
  //         // window.gapi.client.load("calendar", "v3", listUpcomingEvents);
  //       }
  //     }
  //   );
  // }

  // const listUpcomingEvents = () => {
  //   window.gapi.client.calendar.events
  //     .list({
  //       // Fetch events from user's primary calendar
  //       calendarId: "primary",
  //       showDeleted: true,
  //       singleEvents: true
  //     })
  //     .then(function (response) {
  //       let events = response.result.items;
  //       if (events.length > 0) {
  //         setEvents(formatEvents(events));
  //       }
  //     }).catch(e => console.log('error - ', e))
  // };

  // const formatEvents = (list) => {
  //   return list.map((item) => ({
  //     title: item.summary,
  //     start: item.start.dateTime || item.start.date,
  //     end: item.end.dateTime || item.end.date,
  //   }));
  // };

  // console.log(events)

  return (
    <div className="app">
      <h1>Google Calendar POC</h1>
      {/* <button id="authorize_button">Authorize</button>
      <button id="signout_button">Sign Out</button> */}
      {/* <Calendar /> */}
      {/* <CalendarPoc /> */}
      <Abc />
    </div>
  )
}

export default App