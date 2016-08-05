import Parse from 'Parse';

Parse.initialize("7xgsMcYyCcL1QhZOJl6jXRVypEe56rKj5VzGdAHY", "htxD0G2O2mHrQL0Imxd6wunQqvDvV1Q2V5Aot57C");
// Returns a promise
export const save = (bytes, name) => {
  var file = new Parse.File(name, bytes, "text/plain");
  return file.save(bytes).then( response => response._url );
}