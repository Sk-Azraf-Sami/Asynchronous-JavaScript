// webflow control by promise chain 

const takeOrder = (customer) => {
    return new Promise((resolve) => {
        console.log(`Take order for ${customer}`);
        resolve(customer);
    })
}

const processOrder = (customer) => {
    return new Promise((resolve) => {
        console.log(`Processing order for ${customer}`);
        console.log(`Order process for ${customer}`);
        setTimeout(() => {
            console.log(`cooking completed ${customer}`);
        }, 3000)
        resolve(customer);
    })
}

const completeOrder = (customer) => {
    console.log(`complete order for ${customer}`);
}

takeOrder('customer 1')
    .then(processOrder)
    .then(completeOrder)
    .catch((err)=>{
        console.log(err.message); 
    })