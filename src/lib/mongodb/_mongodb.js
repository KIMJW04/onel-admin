import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // 개발 환경에서의 MongoClient 재사용을 위해 global 객체를 사용
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // 생산 환경에서의 새로운 MongoClient 생성
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
