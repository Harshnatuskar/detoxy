let tracking = false;
let startTime = null;
let endTime = null;

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({tracking: false, startTime: null, endTime: null}); 
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.toggle){
        tracking = !tracking;
        chrome.storage.sync.set({ tracking });
        sendResponse({ tracking });
        if(tracking){
            notifyUser("Tracking started");
        }
    } else if(request.checkTime){
        sendResponse({ tracking, startTime, endTime});
    } else if (request.setTimes){
        startTime = request.startTime;
        endTime = request.endTime;
        chrome.storage.sync.set({ startTime, endTime});
        notifyUser(`Tracking times set from ${startTime} to ${endTime}`);
    }
});

function notifyUser(message){
    chrome.notifications.create({
        type: "basic",
        iconUrl:"images/icon48.png",
        title:"Time Tracker",
        message: message
    })
}