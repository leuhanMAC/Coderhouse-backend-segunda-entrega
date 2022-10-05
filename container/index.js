const fs = require('fs');
const crypto = require('node:crypto');
class Container {
    constructor(fileName) {
        this.fileName = fileName;
        this.createIfNotExist();
    }

    async createIfNotExist() {
        try {
            await fs.promises.access(this.fileName)
        } catch (err) {
            await fs.promises.writeFile(this.fileName, '[]', 'utf8');
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.fileName, 'utf8'));
        } catch (err) {
            if (err.message.includes('ENOENT')) {
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(err);
            }
        }
    }

    async save(content) {
        try {
            const data = await this.getAll();
            content.id = crypto.randomUUID();
            content.timestamp = Date.now();
            data.push(content);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2), 'utf8');
        } catch (err) {
            if (err.message.includes('ENOENT')) {
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(err)
            }
        }
        return content
    }

    async updateById(content) {
        let wasFound = false;
        let product = content;

        try {

            const data = await this.getAll();

            const newData = data.map(item => {

                if (item.id === product.id) {

                    wasFound = true;

                    product = { ...item, ...product };
                    return product;
                }

                return item;
            });

            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2), 'utf8');
            return wasFound ? product : null;

        } catch (err) {
            if (err.message.includes('ENOENT')) {
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(err)
            }
        }
    }

    async getById(id) {
        try {
            const data = await this.getAll();
            return data.find(item => item.id === id);
        } catch (error) {
            if (err.message.includes('ENOENT')) {
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(err)
            }
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getAll();
            const newData = data.filter(item => item.id !== id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2), 'utf8');

            return data.find(item => item.id === id);

        } catch (error) {
            if (err.message.includes('ENOENT')) {
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(err)
            }
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, '[]', 'utf8');
        } catch (error) {
            if (err.message.includes('ENOENT')) {
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(err)
            }
        }
    }
}

module.exports = Container;