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

const utils = {
    recursiveSearch
}

export default utils;