import {_tasks} from './store/actions'
import moment from "moment/moment";
import {storeGoogle, store} from "./store/index";

// Client ID and API key from the Developer Console
const CLIENT_ID = '365383693887-vdo07nrbep44ctcpg2hgrn6dbqnnqbcs.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAef4uippRgAFbtPz4cfSBKupCt9gZ7KHM';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
export function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        if (store.getState().googleAuth) {
            console.log(store.getState().googleAuth)
        } else {
            listUpcomingEvents()
        }
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        store.dispatch({type: "GOOGLE_AUTH", value: false})
        storeGoogle.dispatch({type: "REMOVE_TASK"})
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
// function appendPre(message) {
//     var pre = document.getElementById('content');
//     var textContent = document.createTextNode(message + '\n');
//     pre.appendChild(textContent);
// }

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        let events = response.result.items;

        if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
                let obj = {
                    EVENT_START: moment(events[i].start.dateTime).format('YYYY-MM-DD'),
                    EVENT_NAME: events[i].summary,
                    EVENT_DESCRIPTION: "Null",
                    EVENT_COLOR: '#4cd600',
                    EVENT_TYPE: events[i].creator.email,
                    EVENT_END: moment(events[i].end.dateTime).format('YYYY-MM-DD'),
                    eventID: events[i].id
                }
                storeGoogle.dispatch(_tasks(obj))
            }
            store.dispatch({type: "GOOGLE_AUTH", value: true})
            console.log(store.getState().googleAuth)
        } else {
            alert('No upcoming events found.');
        }
    });
}