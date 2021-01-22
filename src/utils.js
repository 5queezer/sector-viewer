/**
 * Deep Search on all keys that match a given name
 * @param {*} obj 
 * @param {*} searchKey 
 * @param {*} results 
 * @returns
 */
export function recursiveSearch (obj, searchKey, results = []) {
    const r = results;
    Object.keys(obj).forEach(key => {
       const value = obj[key];
       if(key === searchKey && typeof value !== 'object'){
          r.push(value);
       }else if(typeof value === 'object'){
          recursiveSearch(value, searchKey, r);
       }
    });
    return r;
 };

 /**
  * Formats a label to a human readable format
  * e.g. 'value0' to 'Value 0'
  * @param {*} string 
  */
export function formatLabel (string) {
   // format 'value0' etc. string nicely
   const matches = string.match(/(\w+)(\d+)/)
   const label = matches[1].charAt(0).toUpperCase() + 
      matches[1].slice(1) + ' ' + matches[2];
   return label;
}

const utils = {
    recursiveSearch,
    formatLabel
}

export default utils;