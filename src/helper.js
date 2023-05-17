export function sortAscendByReleaseDate(movies) {
    movies.sort(function (a, b) {
      return new Date(a.release_date) - new Date(b.release_date);
    });
    return movies;
  }
  export function sortDescendByReleaseDate(movies) {
    movies.sort((a, b) => {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
        return 0;
      });
      return movies;
  }
  export function sortAscendByTitle(movies){
    return movies.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
    
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
    
        return 0;
      });
  }
  export function sortDescendByTitle(movies){
    return movies.sort((a, b) => b.title.localeCompare(a.title))
  }

  export function sortDescendByRating(movies){
    return movies.sort((a, b) => b.vote_average - a.vote_average);
  }
  export function sortAscendByRating(movies){
    return movies.sort((a, b) => a.vote_average - b.vote_average);
  }
  export function getLangList(movies) {
    const langSet = new Set();
  
    // Add all unique languages to the Set
    for (let i = 0; i < movies.length; i++) {
      langSet.add(movies[i].original_language.toUpperCase());
    }
  
    // Convert the Set to an array and sort it alphabetically
    const langList = Array.from(langSet).sort();
  
    // If 'en' exists in the array, move it to the beginning
    const enIndex = langList.indexOf('EN');
    if (enIndex > 0) {
      langList.unshift(langList.splice(enIndex, 1)[0]);
    }
  
    return langList;
  }
  export function extractYear(string){
    const yearString = string.substring(0,4)
    return parseInt(yearString)
  }
  export function getHighestValue(obj, group){
    let groupObj = obj.filter(obj => obj.name === group)
    let highestValue = 0
    for (let i=0; i<groupObj.length; i++){
      if(groupObj[i].value > highestValue){
        highestValue = groupObj[i].value
      }
    }
    return highestValue
  }
  export function getfilteredLangList(obj){
    let langObj = obj.filter(obj => obj.name === "lang")
    let filteredLangList = []
    for (let i=0; i<langObj.length; i++){
      filteredLangList.push(langObj[i].value.toLowerCase())
    }
    return filteredLangList
  }