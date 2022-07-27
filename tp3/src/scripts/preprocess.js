import { range } from "./util"

/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  // TODO: Return the neihborhood names
  return [... new Set(data.map((value => value.Arrond_Nom)))]
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  // TODO : Filter the data by years
  
  return data.filter(value => {
    var year = (value.Date_Plantation).getFullYear()
    return (range(start,end).find(e => e === Number(year)))
  })
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  // TODO : Construct the required data table

  var map = new Map()
  data.forEach(value => {
    var Arrond_Nom = value.Arrond_Nom
    var Plantation_Year = value.Date_Plantation.getFullYear()
    if(map.get(Arrond_Nom) !== undefined){
      if(map.get(Arrond_Nom).get(Plantation_Year) !== undefined){
        var count = map.get(Arrond_Nom).get(Plantation_Year)
        map.get(Arrond_Nom).set(Plantation_Year,count +1)
      }else{
        map.get(Arrond_Nom).set(Plantation_Year,1)
      }
    }else{
      map.set(Arrond_Nom,new Map())
      map.get(Arrond_Nom).set(Plantation_Year,1)
    }
  })

  var returnArray = []

  map.forEach((v,k) => {
    v.forEach((vv,kk) => {
      returnArray.push({Arrond_Nom : k, Plantation_Year :kk, Counts : vv})
    })
  })

  return returnArray
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  // TODO : Find missing data and fill with 0

  var allNeighborhoods = [...neighborhoods]

  for(let i = 0; i < data.length; i++){
    if(allNeighborhoods.indexOf(data[i].Arrond_Nom) !== -1){
      var missingYears = [...lookForMissingYears(data,data[i].Arrond_Nom,i,start,end,range)]
      data = addMissingYears(data,missingYears,data[i].Arrond_Nom)
      allNeighborhoods.splice(allNeighborhoods.indexOf(data[i].Arrond_Nom),1)
    }
  }

  return data
}

function lookForMissingYears(data, neighborhood, index,start, end, range){
  var allYears = range(start,end)
  for(let i = index; i < data.length; i++){
    if(data[i].Arrond_Nom !== neighborhood){
      return allYears
    }
    if(allYears.find(e => e === data[i].Plantation_Year)){
      allYears.splice(allYears.indexOf(data[i].Plantation_Year),1)
    }
  }
}

function addMissingYears(data,missingYears,neighborhood){
  [...missingYears].forEach(v => {
    data.push({Arrond_Nom : neighborhood, Plantation_Year : v, Counts : 0})
  })
  return data
}
