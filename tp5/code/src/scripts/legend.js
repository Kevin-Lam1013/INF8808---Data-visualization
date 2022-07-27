import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
  g.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(60, 140)')
    .style('font-size', '12')

  var circleSize = 300
  var legend = d3Legend.legendColor()
    .title('Légende')
    .scale(colorScale)
    .shape('path', d3.symbol().type(d3.symbolCircle).size(circleSize)())

  g.select('.legend')
    .call(legend)
}
