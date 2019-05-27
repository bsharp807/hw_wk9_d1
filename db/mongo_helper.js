ObjectID = require("mongodb").ObjectID;
const DB_NAME = "bank";
const HOST = "mongodb://localhost:27017";
const MongoClient = require("mongodb").MongoClient;

class MongoHelper {
  static create(coll, payload) {
    // Connect using the connection string
    return MongoClient.connect(
      HOST,
      { useNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.insertOne(payload);
    });
  }

  static get(coll) {
    return MongoClient.connect(
      HOST,
      { userNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.find().toArray();
    });
  }

  static delete(coll, payload) {
    return MongoClient.connect(
      HOST,
      { userNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.deleteOne({_id: ObjectID(payload)})
    })
  }

  static update(coll, id, payload) {
    return MongoClient.connect(
      HOST,
      { userNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      const param = payload.parameter;
      const value = payload.value;
      return collection.updateOne({_id: ObjectID(id)}, { $set: {[param]: value} })
    })
  }

  static updateAccount(coll, id, payload) {
    return MongoClient.connect(
      HOST,
      { userNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.updateOne({_id: ObjectID(id)}, { $push: {accounts: payload} })
    })
  }

  static getById(coll, payload) {
    return MongoClient.connect(
      HOST,
      { userNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.findOne({_id: ObjectID(payload)})
    })
  }


}

module.exports = MongoHelper;
