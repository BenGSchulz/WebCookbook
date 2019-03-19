db.towns.find({name: /e+/, $or: [{famousFor: 'food'}, {famousFor: 'beer'}]});
