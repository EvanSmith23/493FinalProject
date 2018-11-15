import { Mongo } from 'meteor/mongo';
 
export const Books = new Mongo.Collection('books');
export const Users = new Mongo.Collection('users');