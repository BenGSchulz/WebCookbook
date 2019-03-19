use blogger

db.createCollection('articles');

db.articles.insert({
  authorName: 'Ben Schulz',
  email: 'bloggerBoi@blog.com',
  creationDate: '2.1.19',
  text: 'Hi my name is Blogger Boi'
});

db.articles.find();
//Result
//{
//     "_id" : ObjectId("5c54cbd5e204c99153918e80"),
//     "authorName" : "Ben Schulz",
//     "email" : "bloggerBoi@blog.com",
//     "creationDate" : "2.1.19",
//     "text" : "Hi my name is Blogger Boi"
// }
