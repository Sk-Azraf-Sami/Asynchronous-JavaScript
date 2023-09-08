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
```
