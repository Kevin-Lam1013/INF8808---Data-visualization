/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  var groups = d3.map(data, function (group) { return (group.Act) }).keys()

  scale.range([0, width]).domain(groups)
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  const countArr = []
  data.forEach((item) => {
    for (const i in item.Players) {
      countArr.push(item.Players[i].Count)
    }
  })

  const max = d3.max(countArr)

  scale.range([0, height]).domain([max, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  // TODO : Create the groups
  d3.select('#graph-g')
    .selectAll('.group')
    .data(data)
    .join('g')
    .attr('class', 'group')
    .attr('transform', item => 'translate(' + x(item.Act) + ')')
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  var width = xSubgroup.range()[1] / players.length

  d3.selectAll('g.group').each(function (group) {
    var actData = d3.select(this).datum()

    for (const [index, player] of players.entries()) {
      var target = actData.Players.find(x => x.Player === player)

      if (target) {
        var barHeight = target.Count / y.domain()[0] * y.range()[1]

        d3.select(this)
          .append('rect')
          .attr('x', width * index)
          .attr('y', height - barHeight)
          .attr('height', barHeight)
          .attr('width', width)
          .style('fill', color(player))
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .data([{ Act: actData.Act, Player: target }])
      }
    }
  })
}
