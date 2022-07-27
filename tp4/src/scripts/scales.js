/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  // TODO : Set scale
  const allPopulation = []
  for (const i in data) {
    data[i].forEach((country) => {
      allPopulation.push(country.Population)
    })
  }

  return d3.scaleLinear().domain([d3.min(allPopulation), d3.max(allPopulation)]).range([5, 20])
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  // TODO : Set scale
  const continents = new Set()
  for (const i in data) {
    data[i].forEach((country) => {
      continents.add(country.Continent)
    })
  }

  return d3.scaleOrdinal().domain([...continents].sort()).range(d3.schemeCategory10)
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  // TODO : Set scale
  const allGDP = []
  for (const i in data) {
    data[i].forEach((country) => {
      allGDP.push(country.GDP)
    })
  }

  return d3.scaleLog().domain([d3.min(allGDP), d3.max(allGDP)]).range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  // TODO : Set scale
  const allCO2 = []
  for (const i in data) {
    data[i].forEach((country) => {
      allCO2.push(country.CO2)
    })
  }

  return d3.scaleLog().domain([d3.min(allCO2), d3.max(allCO2)]).range([height, 0])
}
