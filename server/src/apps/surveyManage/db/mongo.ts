import { Collection, MongoClient, ObjectId } from 'mongodb'
import { getConfig } from '../config/index'

const config = getConfig()

class mongoService {
    isInit: boolean
    client: MongoClient
    constructor() {
        this.client = new MongoClient(config.mongo.url);
    }
    async getCollection({ collectionName }): Promise<Collection> {
        await this.client.connect()
        return this.client.db(config.mongo.dbName).collection(collectionName)
    }

    convertId2StringByDoc(doc: any): any {
        doc._id = doc._id.toString()
        return doc;
    }

    convertId2StringByList(list: Array<any>): Array<any> {
        return list.map(e => {
            return this.convertId2StringByDoc(e);
        })
    }

    getObjectIdByStr(str: string): ObjectId {
        return new ObjectId(str)
    }
}

export const mongo = new mongoService()