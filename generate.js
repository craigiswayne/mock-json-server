const fs = require('fs-extra');

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
    // this.user     =  generateRandomString();
    // this.oldValue =  generateRandomString();
    // this.newValue =  Object;
    // this.approved =  randomBoolean();

    return {
        id:         randomInteger(),
        datetime:   new Date().toString(),
        type:       randomString(),
        user:       randomString(),
        oldValue:   randomString(),
        newValue:   randomString(),
        approved:   randomBoolean()
    }
}

const numberOfEntries = 57;
let counter = 0;
const results = [];
while(counter < numberOfEntries){
    results.push(classObj());
    counter++;
}

console.log('results');
console.log(results);

fs.writeJSONSync('./data/audit.json', results);
