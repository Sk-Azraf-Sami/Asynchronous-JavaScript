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
