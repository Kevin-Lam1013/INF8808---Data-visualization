/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain(color, data) {
  // Set the color domain
  const groups = d3
    .map(data.features, function (feature) {
      return feature.properties.TYPE_SITE_INTERVENTION;
    })
    .keys();
  color.domain(groups.sort());
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground(data, path, showMapLabel) {
  // TODO : Generate the map background and set the hover handlers
  d3.select("#map-g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", (position) => path(position))
    .attr("stroke", "#ffffff")
    .attr("fill", "#cdd1c4")
    .on("mouseout", () => d3.select("#marker-g").selectAll("text").remove())
    .on("mouseover", (feature) => showMapLabel(feature, path));
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel(d, path) {
  // TODO : Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  console.log(path);
  d3.select("#marker-g")
    .append("text")
    .attr(
      "transform",
      "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
    )
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(d.properties.NOM);
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers(data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.
  d3.select("#marker-g")
    .selectAll("circle")
    .data(data.features)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("class", "marker")
    .attr("stroke", "white")
    .attr("fill", (marker) => color(marker.properties.TYPE_SITE_INTERVENTION))
    .on("click", (marker) => panel.display(marker, color))
    .on("mouseout", function () {
      d3.select(this).attr("r", 5);
    })
    .on("mouseover", function () {
      d3.select(this).attr("r", 6);
    });
}
