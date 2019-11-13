const path = require('path');
const fs = require('fs');

class CubeModel {
    constructor() {
        this.data = require('../config/database');
    }

    _write(newData, resolveData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData), (error) => {
                if (error) { reject (error); return; }
                this.data = newData;
                resolve(resolveData);
            });
        });
    }

    create(name, description, imageUrl, difficultyLevel) {
        return { name, description, imageUrl, difficultyLevel };
    }

    getOne(id) {
        return Promise.resolve(this.data.entities.find(({ id: i }) => i === id));
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }

    insert(newCube) {
        const newIndex = this.data.lastIndex + 1;
        newCube = { id: newIndex, ...newCube };
        const newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(newCube)
        };

        return this._write(newData, newCube);
    }

    update(cubeId, update) {
        const entityIndex = this.data.entities.findIndex(({ id }) => id === cubeId);
        const entity = this.data.entities[entityIndex];
        const updatedEntity = {... entity, ...update};

        const newData = {
            lastIndex: this.data.lastIndex,
            entities: [
                ...this.data.entities.slice(0, entityIndex),
                updatedEntity,
                ...this.data.entities.slice(entityIndex + 1)
            ]
        };

        return this._write(newData, updatedEntity);
    }

    delete(id) {
        const deleteEntityId = this.getOne(id);
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(({ id: i}) => i !== id)
        };

        return this._write(newData, deleteEntityId);
    }

    find(predicateFunction) {
        return Promise.resolve(this.data.entities.filter(predicateFunction));
    }
}

module.exports = new CubeModel();