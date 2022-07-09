const { writeFileSync, readFileSync, appendFile } = require('fs');

module.exports = class Error {
    constructor() {
        return this;
    }

    send (message) {
        console.error(message);
        try {
            const all = readFileSync('./errors.log.txt')
            writeFileSync('./errors.log.txt', all + '\n' + new Date() + ': '+ message);
        } catch {
            writeFileSync('./errors.log.txt',  new Date() + ': '+ message);
        }
        setTimeout(() => {
            process.exit(1);
        }, 5000);
    }
}