const fs = require('fs-extra');

function randomOption(options){
    const randomIndex = Math.max(Math.floor(Math.random() * options.length), options.length-1);
    return options[randomIndex];
}

function randomString(maxLength = 8, minLength = 5){
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < maxLength) {
      result += characters.charAt(Math.round(Math.random() * charactersLength));
      counter++;
    }
    return result;
}

const randomInteger = (max = 1000) => Math.round((Math.random()*max));

const randomBoolean = () => Math.round((Math.random()*10)) % 2 === 0;

function classObj(){
    // this.id       = randomInteger();
    // this.datetime =  new Date().toString();
    // this.user     =  randomString();
    // this.oldValue =  randomString();
    // this.newValue =  Object;
    // this.approved =  randomBoolean();

    // const classObj = {
    //     name: randomString(),
    //     value: randomInteger()
    // }

    const classObj = {
        "contractKey": randomInteger(),
        "contractTypeKey": randomInteger(),
        "licensorKey": randomInteger(),
        "licenseeKey": randomInteger(),
        "billingCurrencyKey": randomInteger(),
        "summary_BillingCurrencyKey": randomInteger(),
        "operatorBillingKey": randomInteger(),
        "contractCollectionKey": randomInteger(),
        "contractGroupName": randomString(),
        "contractName": randomString(),
        "navisionCode": randomString(),
        "addressLine1": randomString(),
        "addressLine2": randomString(),
        "addressLine3": randomString(),
        "addressLine4": randomString(),
        "addressLine5": randomString(),
        "addressLine6": randomString(),
        "vaT_Number": randomString(),
        "fromDate": new Date().toString(),
        "toDate": new Date().toString(),
        "rowIsCurrent": randomOption([0,1]),
        "loadedOn": new Date().toString()
    }

    return classObj;

    // return {
        // id:         randomInteger(),
        // datetime:   new Date().toString(),
        // type:       randomString(),
        // user:       randomString(),
        // oldValue:   randomString(),
        // newValue:   randomString(),
        // approved:   randomBoolean()
    // }
}

// Random number between 10 & 50
const numberOfEntries = Math.max(10, Math.round(Math.random()*50));
let counter = 0;
const results = [];
while(counter < numberOfEntries){
    results.push(classObj());
    counter++;
}


console.log(results);
console.log('total results', results.length)
fs.writeJSONSync('./data/contracts.json', results);
