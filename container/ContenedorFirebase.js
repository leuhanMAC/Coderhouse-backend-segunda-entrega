import admin from "firebase-admin";
import config from '../config.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class FirestoreContainer {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
        this.name = collectionName;
    }

    async getAll() {
        try {
            const getCollection = await this.collection.get();

            return getCollection.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        } catch (error) {
            throw new Error(`Error al listar: ${error}`);
        }
    }

    async getById(id) {
        try {
            const getDocument = await this.collection.doc(id).get();
            if (!getDocument.exists) throw new Error('No ha sido encontrado.');

            const data = getDocument.data();
            return {
                ...data,
                id
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async save(elem) {
        try {
            const save = await this.collection.add(elem);
            return {
                ...elem,
                id: save.id
            }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`);
        }
    }

    async updateById(elem) {
        try {
            const updatedItem = await this.collection.doc(elem.id).set(elem);
            return updatedItem;
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const deletedItem = await this.collection.doc(id).delete();
            return deletedItem;
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            const firestore = admin.firestore();
            await firestore.recursiveDelete(firestore.collection(this.name));
            return {
                msg: 'All items have been deleted'
            }
        } catch (error) {
            throw new Error(`Error al borrar todos los items: ${error}`);
        }
    }
}

export default FirestoreContainer;