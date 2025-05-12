// webflow control by callback 

const takeOrder = (customer,callback) => {
    console.log(`Take order for ${customer}`);
    callback(customer); 
}

const processOrder = (customer, callback) => {
    console.log(`Processing order for ${customer}`);
    console.log(`Order process for ${customer}`); 
    setTimeout(()=>{
        console.log(`cooking completed ${customer}`);
    },3000)
    callback(customer); 
}

const completeOrder = (customer) => {
    console.log(`complete order for ${customer}`); 
}

takeOrder('customer 1',(customer)=>{
    processOrder(customer, (customer)=>{
        completeOrder(customer); 
    })
})