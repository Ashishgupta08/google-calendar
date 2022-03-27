import React, { useEffect, useState } from 'react';

export const Abc = () => {
    const CLIENT_ID = "890572177399-1ah148l49gegdbn2mcira7udqi0p91ps.apps.googleusercontent.com"
    const API_KEY = "AIzaSyAcqNIFfn_MFHZW6NcRSNqTV3_ZMrGGQYA"
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly"
    // const SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const [signIn, setSignIn] = useState(false);
    const [authorize, setAuthorize] = useState(false);
    const [msg, setMsg] = useState("");
    const [events, setEvents] = useState([])

    useEffect(() => {
        handleClientLoad()
    }, [])
    /**
       *  On load, called to load the auth2 library and API client library.
    */
    function handleClientLoad() {
        window.gapi.load('client:auth2', initClient);
    }

    /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
    */
    function initClient() {
        window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            // authorizeButton.onclick = handleAuthClick;
            // signoutButton.onclick = handleSignoutClick;
        }, function (error) {
            // appendPre(JSON.stringify(error, null, 2));
            setMsg(JSON.stringify(error, null, 2))
        });
    }

    /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            // authorizeButton.style.display = 'none';
            setAuthorize(false)

            // signoutButton.style.display = 'block';
            setSignIn(true)

            listUpcomingEvents();
        } else {
            // authorizeButton.style.display = 'block';
            setAuthorize(true)

            // signoutButton.style.display = 'none';
            setSignIn(false)
        }
    }

    /**
       *  Sign in the user upon button click.
       */
    function handleAuthClick(event) {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
        window.gapi.auth2.getAuthInstance().signOut();
        setEvents([])
    }

    /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
    function listUpcomingEvents() {
        window.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            // 'timeMin': (new Date()).toISOString(),
            'timeMin': '2022-03-01T00:00:00.000Z',
            'timeMax': '2022-03-31T23:59:00.000Z',
            'showDeleted': true,
            'singleEvents': true,
            // 'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (response) {
            var events = response.result.items;
            // appendPre('Upcoming events:');
            setMsg('Upcoming events:')
            // console.log((new Date()).toISOString())

            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    // appendPre(event.summary + ' (' + when + ')')
                    // console.log(event.summary + ' (' + when + ')')
                    setEvents(arr => [...arr, event])
                }
            } else {
                // appendPre('No upcoming events found.');
                setMsg('No upcoming events found.')
            }
        });
    }

    const myEvent = {
        'summary': 'Demo Event',
        'location': 'https://meet.google.com/vam-kdkq-ehb',
        'description': 'Creating demo event to google calendar',
        'start': {
            'dateTime': '2022-03-29T19:00:00.000Z',
            'timeZone': 'Asia/Kolkata'
        },
        'end': {
            'dateTime': '2022-03-29T21:00:00.000Z',
            'timeZone': 'Asia/Kolkata'
        },
        'attendees': [
            { 'email': 'marwadinehal@gmail.com' },
            { 'email': 'kvsharma1406@gmail.com' }
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
            ]
        }
    }

    function createEvent() {
        var request = window.gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': myEvent,
        })
        request.execute(event => {
            console.log(event)
            // window.open(event.htmlLink)
        })
    }

    return (
        <div>
            <p>Google Calendar API Quickstart</p>
            {/* <!--Add buttons to initiate auth sequence and sign out--> */}
            {
                authorize &&
                <button id="authorize_button" onClick={(e) => { handleAuthClick(e) }}>Authorize</button>
            }
            {
                signIn &&
                <button id="signout_button" onClick={(e) => { handleSignoutClick(e) }}>Sign Out</button>
            }
            {/* <button onClick={() => { createEvent() }}>Create Event</button> */}
            <pre id="content" style={{ whiteSpace: 'pre-wrap' }}>{msg}</pre>
            <ul>
                {
                    events.map((event, index) => {
                        // console.log(event)
                        return (<li key={event.id}>
                            <p>{index + 1}</p>
                            <p>Creator Mail - {event.creator?.email}</p>
                            <p>Description - {event.description}</p>
                            <p style={{ color: 'red' }}>Summary - {event.summary}</p>
                            <p>Start - {event.start?.dateTime}</p>
                            <p>Location - {event.location}</p>
                        </li>)
                    }
                    )
                }
            </ul>
        </div>
    );
}