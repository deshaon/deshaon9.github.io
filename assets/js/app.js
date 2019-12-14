// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"
// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"


// Import local files

import { Presence, Socket } from "phoenix"

//for displaying the list of users who are currently online
function displayUsers() {
    function renderOnlineUsers(presence) {
        let response = ""
        presence.list((user, { metas: [first, ...rest] }) => {
            let cursorColor = first["cursor_color"]
            response += `<p style="color:${cursorColor};">${user}</p>`
        })
        let userList = document.getElementById("userList")
        userList.innerHTML = response
    }
    presence.onSync(() =>
        renderOnlineUsers(presence)
    )
}


function generateColor() {
    // var letters = '0123456789ABCDEF'
    // var color = '#'
    // for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    //temporary assignments for user names 1,2,3 
    if (user == "1") return "red"
    else if (user == "2") return "green"
    else return "yellow"
}

//editor object created in index.html.eex
var cm = window.cm

//gets the user name as a paramaeter from the url
let user = document.getElementById("user").innerText

//for assigning a color to identify users
var userColor = generateColor()

let socket = new Socket("/socket", { params: { user: user, userColor: userColor } })
socket.connect()

let channel = socket.channel("room:lobby", {});

let presence = new Presence(channel)

displayUsers()

channel.join()

var markers = {}

//for deleting the cursor of the user who leaves the connection
presence.onLeave((id, current, leftPres) => {
    if (current.metas.length == 0) {
        markers[id].clear()
        delete markers[id]
    }
})

//for detecting cursor movement
cm.on("cursorActivity", (cm) => {
    var cursorPos = cm.getCursor();

    channel.push("updateCursor", {
        cursorPos: cursorPos,
        cursorColor: userColor
    });
});

//handles the cursor movement and creates a cursor mark on the editor
channel.on("updateCursor", function (payload) {
    console.log(markers)
    var cursor = document.createElement('span');
    if (user != payload.user_name) {
        cursor.style.borderLeftStyle = 'solid';
        cursor.style.borderLeftWidth = '1px';
        cursor.style.borderLeftColor = payload.cursorColor;
        cursor.style.height = `${(payload.cursorPos.bottom - payload.cursorPos.top)}px`;
        cursor.style.padding = 0;
        cursor.style.zIndex = 0;
        if (markers[payload.user_name] != undefined) {
            markers[payload.user_name].clear();
        }
        markers[payload.user_name] = cm.setBookmark(payload.cursorPos, { widget: cursor, handleMouseEvents: true });
    }
    if (markers[payload.user_name] != undefined && user == payload.user_name) {
        markers[payload.user_name].clear();
    }
})


cm.on("beforeChange", (cm, changeobj) => {
    console.log(changeobj);
    if (changeobj.origin != undefined) {
        channel.push('shout', {
            changeobj: changeobj,
            user: user
        });
    }
})

channel.on('shout', function (payload) {
    console.log(payload.changeobj);
    if (user != payload.user) {
        cm.replaceRange(payload.changeobj.text, payload.changeobj.from, payload.changeobj.to);
    }
})












