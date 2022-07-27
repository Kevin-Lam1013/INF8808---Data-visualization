/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents
  const formattedData = [
    { key: 'Country : ', value: d['Country Name'] },
    { key: 'Population : ', value: d.Population },
    { key: 'GDP : ', value: parseFloat(d.GDP).toFixed(2) + ' $ (USD)' },
    { key: 'CO2 emissions : ', value: parseFloat(d.CO2).toFixed(2) + ' metric tonnes' }
  ]

  const content = d3.create()
  formattedData.forEach(info => {
    content.append('div')
      .text(info.key)
      .append('span')
      .text(info.value)
      .attr('class', 'tooltip-value')
  })

  return content.html()
}
