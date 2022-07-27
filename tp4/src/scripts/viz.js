/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  // TODO : Position axis labels
  const padding = 55
  g.selectAll('.x.axis-text').attr('x', width / 2).attr('y', height + padding)
  g.selectAll('.y.axis-text').attr('x', -padding).attr('y', height / 2)
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, rScale, colorScale) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white
  d3.select('#graph-g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', d => rScale(d.Population))
    .style('fill', d => colorScale(d.Continent))
    .style('opacity', '70%')
    .style('stroke', 'white')
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  d3.select('#graph-g')
    .selectAll('circle')
    .on('mouseover', function (country, i) {
      tip.show(country, this)
      d3.select(this)
        .style('opacity', '100%')
    })
    .on('mouseout', function (country, i) {
      tip.hide(country, this)
      d3.select(this)
        .style('opacity', '70%')
    })
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCircles (xScale, yScale, transitionDuration) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively
  d3.select('#graph-g')
    .selectAll('circle')
    .transition()
    .duration(transitionDuration)
    .attr('cx', country => xScale(country.GDP))
    .attr('cy', country => yScale(country.CO2))
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
  // TODO : Set the title
  d3.select('#graph-g')
    .selectAll('.title')
    .text('Data for year : ' + year)
}
