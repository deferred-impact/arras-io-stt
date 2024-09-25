// ==UserScript==
// @name         arras.io STT
// @namespace    http://tampermonkey.net/
// @version      2024-09-24
// @description  shitposting through talking
// @author       deferred_impact
// @match        https://arras.io/
// @match        https://scenexe2.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arras.io
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    let activeElementOverride = null;
    {
        let activeElement = Object.getOwnPropertyDescriptor(Document.prototype, "activeElement");
        let get = activeElement.get
        activeElement.get = function() {
            return activeElementOverride ?? get.apply(this, arguments);
        }
        Object.defineProperty(Document.prototype, "activeElement", activeElement);
    }

    function wrapAddEventListener(constructor) {
        constructor.prototype._addEventListener = Element.prototype.addEventListener;
        constructor.prototype.addEventListener = function () {
            let args = [...arguments]
            let temp = args[1];
            let type = args[0];
            if (!type.includes("key")) {
                return this._addEventListener(...arguments);
            }
            args[1] = function () {
                let args2 = [...arguments];
                let ev = args2[0];
                console.log(ev);
                args2[0] = {
                    code: ev.code,
                    key: ev.key,
                    ctrlKey: ev.ctrlKey,
                    metaKey: ev.metaKey,
                    shiftKey: ev.shiftKey,
                    altKey: ev.altKey,
                    repeat: ev.repeat,
                    isComposing: ev.isComposing,
                    location: ev.location,
                    target: ev.target,
                    keyCode: ev.keyCode,
                    preventDefault: ev.preventDefault.bind(ev),
                    isTrusted: true,
                }
                Object.setPrototypeOf(args2[0], Event.prototype);
                console.log(args2[0]);
                return temp(...args2);
            }
            return this._addEventListener(...args);
        }
    }
    wrapAddEventListener(Window);
    wrapAddEventListener(Document);
    wrapAddEventListener(Element);

    window.simulateKey = function (code, key, elem, type, keyCode, modifiers) {
        var evtName = (typeof(type) === "string") ? "key" + type : "keydown";
        var modifier = (typeof(modifiers) === "object") ? modifier : {};

        var event = document.createEvent("HTMLEvents");
        event.initEvent(evtName, true, false);
        event.code = code;
        event.keyCode = keyCode;
        event.key = key

        for (var i in modifiers) {
            event[i] = modifiers[i];
        }

        elem.dispatchEvent(event);
    }

    window.reverseKeyMap = {};
    (async () => {
        let map = await navigator.keyboard.getLayoutMap();
        for (let k of map.keys()) {
            window.reverseKeyMap[map.get(k)] = k;
        }
    })();

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    window.say = async (text) => {
        console.log("say", text)
        let input = document.querySelector("#chat"); // scenexe.io
        if (input == null) {
            // arras.io
            window.simulateKey("Enter", "Enter", window, "down")
            while(input == null) {
                await timeout(16);
                input = document.querySelector("body > input");
            }
            input.disabled=true;
        }
        input.value = text;
        await timeout(16);
        text = input.value;
        activeElementOverride = input;
        window.simulateKey("Enter", "Enter", input, "down", 13);
        activeElementOverride = null;
        return text;
    }

    (async () => {
        await timeout(1000);
        const exampleSocket = new WebSocket("ws://localhost:23023/")
        exampleSocket.onmessage = msg => window.say(msg.data)
    })();
})();