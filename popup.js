document.addEventListener("DOMContentLoaded",()=>{
    const statusElement= document.getElementById("status");
    const toggleButton = document.getElementById("toggleButton");
    const startTimeInput = document.getElementById("startTime");
    const endTimeInput = document.getElementById("endTime");

    chrome.storage.sync.get(["tracking","startTime","endTime"], (result)=>{
        const {tracking, startTime, endTime} = result;
        updateUI(tracking,startTime,endTime);
    });

    toggleButton.addEventListener("click",()=>{
        chrome.runtime.sendMessage({toggle:true},(response)=>{
            updateUI(response.tracking, null, null);
        });
    });

    startTimeInput.addEventListener("change",()=>{
        const startTime = startTimeInput.value;
        const endTime =  endTimeInput.value;
        chrome.runtime.sendMessage({setTimes: true, startTime, endTime});
    });

    endTimeInput.addEventListener("change",()=>{
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;
        chrome.runtime.sendMessage({ setTimes: true, startTime, endTime });
    });

    function updateUI(tracking, startTime, endTime){
        if(tracking){
            statusElement.textContent = "Tracking";
            toggleButton.textContent ="Stop Tracking";
        } else{
            statusElement.textContent = "Not Tracking";
            toggleButton.textContent = "Start Tracking";
        }
        
        if(startTime && endTime){
            startTimeInput.value = startTime;
            endTimeInput.value = endTime;
        }
    }
});