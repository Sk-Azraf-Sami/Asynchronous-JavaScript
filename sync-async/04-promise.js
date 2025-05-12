const hasMeeting = false;


const meeting = () => {
    return new Promise((resolve, reject)=>{
        if(hasMeeting==false){
            const meetingDetails = {
                name: "Project Meeting", 
                place: "Google Meet",
                time: "10.00 AM"
            };
            resolve(meetingDetails); 
        }
        else{
            reject(new Error("Meeting already scheduled")); 
        }
    })
}

meeting()
    .then((res)=>{
        console.table(res);
    })
    .catch((err)=>{
        console.log(err.message); 
    })

/*
const meeting = new Promise((resolve, reject)=>{
    if(hasMeeting==false){
        const meetingDetails = {
            name: "Project Meeting", 
            place: "Google Meet",
            time: "10.00 AM"
        };
        resolve(meetingDetails); 
    }
    else{
        reject(new Error("Meeting already scheduled")); 
    }
})
*/


/*meeting
    .then((res)=>{
        console.table(res); 
    })
    .catch((err)=>{
        console.log(err.message); 
    })
*/
