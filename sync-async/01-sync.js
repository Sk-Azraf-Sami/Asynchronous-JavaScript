const processOrder = (customer) => {
    console.log(`Processing order for ${customer}`);
    console.log(`Order process for ${customer}`); 
    const startTime = Date.now();
    while(Date.now()-startTime<=3000){
        //....
    }
    console.log(`cooking completed ${customer}`)
}

console.log(`Take order for customer 1`); 
processOrder("customer 1");

console.log(`\nTake order for customer 2`)

