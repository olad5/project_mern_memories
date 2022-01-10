/* seedScript.js */
// this file is used to the seed the mongodb database 

import {CONNECTION_URL} from './index.js'
import mongo from 'mongodb'
import casual from 'casual'


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);/// generates a random integer
}

function randomTag(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// for (let i = 0; i < 4; i++) {
//   let newEle = randomTag(['africa', 'europe', 'asia', 'middle east', 'south america', 'north america'])
//   console.log(newEle)
// }

async function seedDB() {
  const {MongoClient} = mongo
  const uri = CONNECTION_URL // Connection URL

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("myFirstDatabase").collection("postmessages");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    let randomTags = ['africa', 'europe', 'asia', 'bulgaria', 'russia', 'cuba', 'spain', 'china', 'nigeria', 'usa']
    let posts = [];

    for (let i = 0; i < 40; i++) {
      let post = {
        title: casual.title,
        message: casual.string,
        creator: casual.full_name,
        tags: [],
        selectedFile: `https://source.unsplash.com/random/200x200?sig:${i}`,// generates a random image
        likes: [],
        createdAt: new Date().toISOString()
      }


      for (let j = 0; j < 4; j++) {
        // let newEle = randomTag(['africa', 'europe', 'asia', 'middle east', 'south america', 'north america'])
        // post.tags.push(casual.word)//add tags 
        post.tags.push(randomTag(randomTags))//add tags 
        post.likes.push(casual.uuid)///add likes
      }

      posts.push(post); // make a bunch of posts
    }
    collection.insertMany(posts);// add them into the collection

    console.log("Database seeded! :)");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();

