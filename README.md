# Asynchronous-JavaScript

Javascript is a single thread language. It has synchronous blocking behaviour which makes it as a ugly language. But nowadays it becomes updated and now it has asynchronous behaviour. 

### Example of Synchronous behaviour: 
```javascript
const processOrder = (customer) => {
    console.log(`Processing order for customer 1`);
    var currentTime = new Date().getTime();
    
    //The loop continues to execute as long as currentTime + 3000 is greater than or equal to the current timestamp.
    //In other words, it keeps looping until approximately 3 seconds have passed since currentTime.
    while(currentTime + 3000 >= new Date().getTime());
    console.log(`Order processed for customer 1`);
}

console.log("Take order for customer 1");
processOrder();
console.log("Completed order for customer 1");

/*
Output:
Take order for customer 1
Processing order for customer 1
Order processed for customer 1
Completed order for customer 1
*/
```

### Solving above problem by using setTimeout() asynchronous function: 
```javascript
const processOrder = (customer) => {
    console.log(`Processing order for customer 1`);
    var currentTime = new Date().getTime();

    //here setTimeout is a asynchronous function
    // arrow function is its callback function 
    setTimeout(()=>{
        console.log(`Cooking completed`); 
    },3000); 
    
    console.log(`Order processed for customer 1`);
}

console.log("Take order for customer 1");
processOrder();
console.log("Completed order for customer 1");

/*
Output:
Take order for customer 1
Processing order for customer 1
Order processed for customer 1
Completed order for customer 1
Cooking completed
*/
```

In this provided code, you're using `setTimeout`, which involves several concepts related to JavaScript's asynchronous behavior: the call stack, the Web API, the callback queue, and the event loop.

Here's an explanation of how these components work together in this code:

1. **Call Stack**:
   - The call stack is a data structure that keeps track of the execution of function calls in this JavaScript code. When a function is called, it's pushed onto the stack, and when it returns, it's popped off the stack.

   In this code:
   - When you call `processOrder()`, it's added to the call stack.
   - `console.log("Take order for customer 1");` and `console.log("Completed order for customer 1");` are also added to the call stack as they are encountered in the code.

2. **Web API**:
   - The `setTimeout` function is part of the Web API in the browser environment. Web APIs provide functionality that is not directly handled by JavaScript itself, such as timers, making HTTP requests, and interacting with the DOM.

   In this code:
   - When you execute `setTimeout`, it sets a timer for 3000 milliseconds but doesn't block the call stack. Instead, it hands off the callback function (the one logging "Cooking completed") to the Web API.

3. **Callback Queue**:
   - When the timer in `setTimeout` expires (in this case, after 3000 milliseconds), the callback function is placed in the callback queue.

   In this code:
   - After approximately 3 seconds, "Cooking completed" is placed in the callback queue.

4. **Event Loop**:
   - The event loop is responsible for constantly checking the callback queue for completed tasks and moving them to the call stack when it's empty. This ensures that asynchronous code, like the callback in `setTimeout`, is executed when its conditions are met without blocking the main thread.

   In this code:
   - The event loop monitors the callback queue and, after the 3000ms timer expires, moves the "Cooking completed" callback function from the queue to the call stack. It's then executed.

Here's the sequence of events:

1. "Take order for customer 1" is logged.
2. `processOrder()` is called and added to the call stack.
3. `console.log("Processing order for customer 1");` is logged.
4. `setTimeout` is called and schedules the "Cooking completed" callback function to run after 3000 milliseconds but does not block the call stack.
5. `console.log("Order processed for customer 1");` is logged.
6. The call stack is empty.
7. The event loop detects that the callback queue contains the "Cooking completed" callback, so it moves it to the call stack.
8. "Cooking completed" is logged.

This demonstrates how JavaScript's asynchronous behavior and the event loop allow non-blocking execution of code, like the delayed callback in `setTimeout.

### Callback Function: 
But for above solution there is a problem of workflow control. We can control the workflow of code by implementation of callback function.

```javascript
const takeOrder = (customer,callback) => {
    console.log(`Take order for ${customer}`);
    callback(customer);
};

const processOrder = (customer,callback) => {
    console.log(`Process order for ${customer}`);
    setTimeout(() => {
        console.log(`Cooking completed`);
        console.log(`Order processed for ${customer}`);
        callback(customer); 
    }, 3000);
};

const completeOrder = (customer) => {
    console.log(`Completed order for ${customer}`);
};

// call function 
// takeOrder function call processOrder function 
// processOrder function call completeOrder function 
takeOrder('customer 1',(customer)=>{
    processOrder(customer,(customer) => {
        completeOrder(customer);
    });
}); 

/*
Output: 
Take order for customer 1
Process order for customer 1
Cooking completed
Order processed for customer 1
Completed order for customer 1
*/
```

**Is this process really asynchronous?**
```javascript
const takeOrder = (customer,callback) => {
    console.log(`Take order for ${customer}`);
    callback(customer);
};

const processOrder = (customer,callback) => {
    console.log(`Process order for ${customer}`);
    setTimeout(() => {
        console.log(`Cooking completed`);
        console.log(`Order processed for ${customer}`);
        callback(customer); 
    }, 3000);
};

const completeOrder = (customer) => {
    console.log(`Completed order for ${customer}`);
};

// call function 
// takeOrder function call processOrder function 
// processOrder function call completeOrder function 
takeOrder('customer 1',(customer)=>{
    processOrder(customer,(customer) => {
        completeOrder(customer);
    });
}); 

//This line will run middle of asynchronus execution 
console.log('Hello'); 

/*
Output: 
Take order for customer 1
Process order for customer 1
Hello
Cooking completed
Order processed for customer 1
Completed order for customer 1
*/
```
### Promises: 
By using promise, callback function become more readable and we can solve the 'callback hell' problem.
```javascript
const hasMeeting = false;
const meeting = new Promise((resolve, reject) => {
    if(hasMeeting == false){
        const meetingDetails = {
            name: "Project Meeting",
            location: "Google Meeet",
            time: "10:00 PM"
        };
        
        resolve(meetingDetails);
    }
    
    else{
        reject(new Error("Meeting already scheduled!!"));
    }
});

meeting
    .then((res) => {
        // resolve data
        console.log(JSON.stringify(res))
    })
    .catch((err) => {
        //rejected data
        console.log(err.message);
    })

/*
Output (if hasMeeting=false): 
{"name":"Project Meeting","location":"Google Meeet","time":"10:00 PM"}

*****************************************************************

Output (if hasMeeting=true: 
Meeting already scheduled!!

******************************************************************

*/

```

In 'promise' callback function is used which holds two function 'resolve' and 'reject'. Now above code is more readable than direct using of 'callback' function.

**Is it really asynchronous?**
```javascript
const hasMeeting = true;
const meeting = new Promise((resolve, reject) => {
    if(hasMeeting == false){
        const meetingDetails = {
            name: "Project Meeting",
            location: "Google Meeet",
            time: "10:00 PM"
        };
        
        resolve(meetingDetails);
    }
    
    else{
        reject(new Error("Meeting already scheduled!!"));
    }
});

meetinge 
    .then((res) => {
        // resolve data
        console.log(JSON.stringify(res))
    })
    .catch((err) => {
        //rejected data
        console.log(err.message);
    })

console.log("Hello");
/*
Output (if hasMeeting=false): 
Hello
{"name":"Project Meeting","location":"Google Meeet","time":"10:00 PM"}

*****************************************************************

Output (if hasMeeting=true: 
Hello
Meeting already scheduled!!

******************************************************************

*/

```
We don't assign any delay to the 'promise' but first `Hello` is printed! Then the promise will be executed. 

### Promise Chain: 
```javascript
const hasMeeting = false;
const meeting = new Promise((resolve, reject) => {
    if(hasMeeting == false){
        const meetingDetails = {
            name: "Project Meeting",
            location: "Google Meeet",
            time: "10:00 PM"
        };
        
        resolve(meetingDetails);
    }
    
    else{
        reject(new Error("Meeting already scheduled!!"));
    }
});

// 2nd promise 
const addToCalendar = (meetingDetails) => {
    return new Promise((resolve, reject) => {
        const calendar = `${meetingDetails.name} is scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
        resolve(calendar)
    })
}

// there is no reject 
// so we can create addToCalendar function like this also 
/*const addToCalendar = (meetingDetails) => {
     const calendar = `${meetingDetails.name} is scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
    return Promise.resolve(calendar)
}*/

// we can handle multiple then by using single catch 
meeting
    .then(addToCalendar)
    .then((res) => {
        // resolve data
        // now calendar in the resolve 
        // so, resolve that means calendar will be printed
        console.log(res)
    })
    .catch((err) => {
        //rejected data
        console.log(err.message);
    })

console.log("Hello");
/*
Hello
Project Meeting is scheduled on Google Meeet at 10:00 PM
*/

```

**In this example:**

```javascript
const promise1 = Promise.resolve(`Promise 1 resolved`);
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`Promise 2 resolved`)
    }, 2000);
});

promise1.then((res) => {
    console.log(res)
});

promise2.then((res) => {
    console.log(res)
})

/*
Output: 
Promise 1 resolved
Promise 2 resolved
*/
```
After 'promise1' is resolved, 'promise2' will be resolved after 2 seconds. <br>
But we can solve this problem by concurrently run these promises.

**Promise.all**

```javascript
const promise1 = Promise.resolve(`Promise 1 resolved`);
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`Promise 2 resolved`)
    }, 2000);
});

// creating array of two promises
Promise.all([promise1,promise2]).then((res) => {
    console.log(res)
})

/*
Output: 
[ 'Promise 1 resolved', 'Promise 2 resolved' ]
*/
```
After 2 seconds, both promise1 and promise2 run together. 

**Promise.race**
```javascript
const promise1 = Promise.resolve(`Promise 1 resolved`);
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`Promise 2 resolved`)
    }, 2000);
});

// creating array of two promises
// race between two promises
// two promise will be start executing at the same time
// one promise will be printed which win this race
Promise.race([promise1,promise2]).then((res) => {
    console.log(res)
})

/*
Output: 
Promise 1 resolved
*/
```
**Another Example**

```javascript
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`promise1 resolved`);
    }, 5000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`promise2 resolved`)
    }, 2000);
}); 

Promise.race([promise1, promise2]).then((res) => {
    console.log(res)
})

/*
Output: 
promise2 resolved
*/
```

But way of `promise` call is not so much programming friendly. 

### async-await 

```javascript
// this is synchronous function 
function test(){
    return `Hello`;
}
console.log(test()); 

// make test() function asynchronous
function test2(){
    return Promise.resolve(`Hello`);
}
console.log(test2());

// do the same thing by using 'async'
async function test3(){
    return `Hello`; 
}
console.log(test3());

/*
Output: 
Hello
Promise { 'Hello' }
Promise { 'Hello' }
*/
```
`await` can't use in normal function. <br>
Always use in `async` function. 

```javascript
const hasMeeting = false;
const meeting = new Promise((resolve, reject) => {
    if(hasMeeting == false){
        const meetingDetails = {
            name: "Project Meeting",
            location: "Google Meeet",
            time: "10:00 PM"
        };
        
        resolve(meetingDetails);
    }
    
    else{
        reject(new Error("Meeting already scheduled!!"));
    }
});

// 2nd promise 
const addToCalendar = (meetingDetails) => {
     const calendar = `${meetingDetails.name} is scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
    return Promise.resolve(calendar)
}

// we can handle multiple then by using single catch 
// don't need to use .then .catch
async function myMeeting(){
    try{
      const meetingInfo = await meeting;
      const calendarInfo = await addToCalendar(meetingInfo);
      console.log(calendarInfo);
    }
    catch(error) {
        console.log("Something is wrong here!", error.message);
    }
}

myMeeting();

console.log("Hello");
/*
Hello
Project Meeting is scheduled on Google Meeet at 10:00 PM
*/

```
