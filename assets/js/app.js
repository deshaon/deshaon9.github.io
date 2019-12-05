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
import {Presence} from "phoenix"
import * as monaco from "monaco-editor"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import socket from "./socket"

console.log('hello1')

// var editor = monaco.editor.create(document.getElementById('container'), {
//   value: [
//     'function x() {',
//     '\tconsole.log("Hello world!");',
//     '}'
//   ].join('\n'),
//   language: 'javascript',
//   theme: "vs-dark",
// });


// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundles that contain the web workers.
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './js/json.worker.js';
    }
    if (label === 'css') {
      return './js/css.worker.js';
    }
    if (label === 'html') {
      return './js/html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './js/ts.worker.js';
    }
    return './js/editor.worker.js';

    // if (label === 'json') {
    //     return './json.worker.bundle.js';
    //   }
    //   if (label === 'css') {
    //     return './css.worker.bundle.js';
    //   }
    //   if (label === 'html') {
    //     return './html.worker.bundle.js';
    //   }
    //   if (label === 'typescript' || label === 'javascript') {
    //     return './ts.worker.bundle.js';
    //   }
    //   return './editor.worker.bundle.js';
  }
}

monaco.editor.create(document.getElementById('container'), {
  value: [
    'function x() {',
    '\tconsole.log("Hello world!");',
    '}'
  ].join('\n'),
  language: 'javascript',
  theme: 'vs-dark'
});

let channel = socket.channel("room:lobby", {});
let presence = new Presence(channel)

function renderOnlineUsers(presenec) {
  let response = ""
  presence.list((id, {metas: [first, ...rest]}) => {
    let count = rest.length + 1
    response += `<br>${id} (count: ${count})</br>\n`
  })
  document.querySelector("main[role=main]").innerHTML = response
  console.log(response)
}
presence.onSync(() => renderOnlineUsers(presence))
channel.join()

console.log('hello2')