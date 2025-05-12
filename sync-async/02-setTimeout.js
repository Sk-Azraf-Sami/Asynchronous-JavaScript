const processOrder = (customer) => {
    console.log(`Processing order for ${customer}`);
    console.log(`Order process for ${customer}`); 
    setTimeout(()=>{
        console.log(`cooking completed ${customer}`);
    },3000)
}

console.log(`Take order for customer 1`); 
processOrder("customer 1");

console.log(`\nTake order for customer 2`)

