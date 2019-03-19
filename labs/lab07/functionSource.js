db.help
//function () {
//         print("DB methods:");
//         print("\tdb.adminCommand(nameOrDocument) - switches to 'admin' db, and runs command [ just calls db.runCommand(...) ]");
//         print("\tdb.auth(username, password)");
//         print("\tdb.cloneDatabase(fromhost)");
//         print("\tdb.commandHelp(name) returns the help for the command");
//         print("\tdb.copyDatabase(fromdb, todb, fromhost)");
//         print("\tdb.createCollection(name, { size : ..., capped : ..., max : ... } )");
//         print("\tdb.createUser(userDocument)");
//         print("\tdb.currentOp() displays currently executing operations in the db");
//         print("\tdb.dropDatabase()");
//         print("\tdb.eval() - deprecated");
//         print("\tdb.fsyncLock() flush data to disk and lock server for backups");
//         print("\tdb.fsyncUnlock() unlocks server following a db.fsyncLock()");
//         print("\tdb.getCollection(cname) same as db['cname'] or db.cname");
//         print("\tdb.getCollectionInfos([filter]) - returns a list that contains the names and options" + " of the db's collections");
//         print("\tdb.getCollectionNames()");
//         print("\tdb.getLastError() - just returns the err msg string");
//         print("\tdb.getLastErrorObj() - return full status object");
//         print("\tdb.getLogComponents()");
//         print("\tdb.getMongo() get the server connection object");
//         print("\tdb.getMongo().setSlaveOk() allow queries on a replication slave server");
//         print("\tdb.getName()");
//         print("\tdb.getPrevError()");
//         print("\tdb.getProfilingLevel() - deprecated");
//         print("\tdb.getProfilingStatus() - returns if profiling is on and slow threshold");
//         print("\tdb.getReplicationInfo()");
//         print("\tdb.getSiblingDB(name) get the db at the same server as this one");
//         print("\tdb.getWriteConcern() - returns the write concern used for any operations on this db, inherited from server object if set");
//         print("\tdb.hostInfo() get details about the server's host");
//         print("\tdb.isMaster() check replica primary status");
//         print("\tdb.killOp(opid) kills the current operation in the db");
//         print("\tdb.listCommands() lists all the db commands");
//         print("\tdb.loadServerScripts() loads all the scripts in db.system.js");
//         print("\tdb.logout()");
//         print("\tdb.printCollectionStats()");
//         print("\tdb.printReplicationInfo()");
//         print("\tdb.printShardingStatus()");
//         print("\tdb.printSlaveReplicationInfo()");
//         print("\tdb.dropUser(username)");
//         print("\tdb.repairDatabase()");
//         print("\tdb.resetError()");
//         print("\tdb.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into { cmdObj : 1 }");
//         print("\tdb.serverStatus()");
//         print("\tdb.setLogLevel(level,<component>)");
//         print("\tdb.setProfilingLevel(level,<slowms>) 0=off 1=slow 2=all");
//         print("\tdb.setWriteConcern( <write concern doc> ) - sets the write concern for writes to the db");
//         print("\tdb.unsetWriteConcern( <write concern doc> ) - unsets the write concern for writes to the db");
//         print("\tdb.setVerboseShell(flag) display extra information in shell output");
//         print("\tdb.shutdownServer()");
//         print("\tdb.stats()");
//         print("\tdb.version() current version of the server");
//
//         return __magicNoPrint;
//     }

db.book.findOne
//function (query, fields, options, readConcern) {
//     var cursor = this.find(query, fields, -1 /* limit */, 0 /* skip*/, 0 /* batchSize */, options);
//
//     if (readConcern) {
//         cursor = cursor.readConcern(readConcern);
//     }
//
//     if (!cursor.hasNext())
//         return null;
//     var ret = cursor.next();
//     if (cursor.hasNext())
//         throw Error("findOne has more than 1 result!");
//     if (ret.$err)
//         throw _getErrorWithCode(ret, "error " + tojson(ret));
//     return ret;
// }

db.stats
//function (scale) {
//         return this.runCommand({dbstats: 1, scale: scale});
//     }

