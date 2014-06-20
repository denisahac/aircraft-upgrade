/* 
 * folder: helpers
 * fileName: validator.js
 * description: A helper class that stores shared methods
 * date: May 15, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 // isEmpty method
var isEmpty = function(object)
{
  var isEmpty = true;
  for(keys in object)
  {
     isEmpty = false;
     break; // exiting since we found that the object is not empty
  }
  return isEmpty;
};

// exports
// isEmpty
module.exports.isEmpty = isEmpty;