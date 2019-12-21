// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = process.env.MONGODB_URL;
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    //========================================================== CREATE =========================================================================
    db.collection("users").insertOne(
      {
        name: "Shiva"
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }

        console.log(result.ops);
      }
    );

    db.collection("users").insertMany(
      [
        {
          name: "Shiva",
          age: 30
        },
        {
          name: "Vishrudh",
          age: 2
        }
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents");
        }
        console.log(result.ops);
      }
    );

    //====================================================== READ =========================================================================
    db.collection("users").findOne(
      { name: "Vishrudh", age: 2 },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(user);
      }
    );

    db.collection("users").findOne(
      { _id: new ObjectID("5dfb946820403b0bfc56a955") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(user);
      }
    );

    db.collection("users")
      .find({ age: 30 })
      .toArray((error, users) => {
        console.log(users);
      });

    db.collection("users")
      .find({ age: 30 })
      .count((error, count) => {
        console.log(count);
      });

    //======================================================== UPDATE =======================================================================
    //UPDATE : update deprecated use updateOne or updateMany
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("5dfb916ed342e928c4ea07d4")
        },
        {
          $set: {
              name: 'Mike'
          },
          $inc: {
            age: 1
          }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    db.collection("users")
      .updateMany(
        {
          age: 30
        },
        {
          $set: {
            age: 28
          }
        }
      )
      .then(result => {
        console.log(result.modifiedCount);
      })
      .catch(error => {
        console.log(error);
      });

    //========================================================= DELETE =========================================================================
    //DELETE : remove deprectated use deleteOne or deleteMany
    db.collection("users")
      .deleteMany({
        age: 34
      })
      .then(result => {
        console.log(result.deletedCount);
      })
      .catch(error => {
        console.log(error);
      });

    db.collection("users")
      .deleteOne({
        age: 34
      })
      .then(result => {
        console.log(result.deletedCount);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
