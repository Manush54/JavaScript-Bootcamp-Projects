/** repository.js
 * Base class for Users and Products methods.
 * Common methods for CRUD operations of all repositories.
 */

const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
    constructor(filename) {
        if(!filename)
            throw new Error('Creating a repository requires a filename.')

        this.filename = filename
        try {
            fs.accessSync(this.filename)
        } catch (error) {
            fs.writeFileSync(this.filename, '[]')
        }
    }

    // Open the file called this.filename
    // Read its components
    // Parse the components
    // Return passed data
    async getAll() {
        return JSON.parse(
            await fs.promises.readFile( this.filename, {
                encoding : 'utf8'
            }))
    }

    async create(attrs) {
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);

        return attrs;
    }

    // Write to users.json file (Append)
    async writeAll(records) {
        await fs.promises.writeFile(
            this.filename, 
            JSON.stringify(records, null, 2)
        );
    }

    // Generate a random ID for a user using crypto library.
    randomId() {
        return crypto.randomBytes(4).toString('hex')
    }

    // Get a record by its id
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id)
    }

    // Delete a record based on its id.
    async delete(id) {
        const records = await this.getAll();
        
        // Filter all the records without the specified id.
        // i.e. Extract all the records except the one with the specified id.
        const filteredRecords = records.filter(record => record.id !== id)

        // Write the filtered records to the file again.
        await this.writeAll(filteredRecords)
    }

    // Update
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if(!record)
            throw new Error(`Record with id ${id} not found.`)
        
        Object.assign(record, attrs)
        await this.writeAll(records)
    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for(let record of records) {
            let found = true;

            // Using for..in because while iterating over an object we can also access keys.
            for (let key in filters) {
                if(record[key] !== filters[key])
                    found = false;
            }

            if(found) {
                return record;
            }
        }
    }
};