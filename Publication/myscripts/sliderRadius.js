
//===============================================
var brushRadius;
var sliderRadius;
var handleRadius;
var xScaleRadius;

var ySliderRadius = 70;

function setupSliderRadius(svg) {
  xScaleRadius = d3.scale.linear()
    .domain([0.1, 1])
    .range([xSlider, 180])
    .clamp(true);

  brushRadius = d3.svg.brush()
    .x(xScaleRadius)
    .extent([scaleRadius, scaleRadius])
    .on("brush", brushedRadius);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + ySliderRadius + ")")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .call(d3.svg.axis()
      .scale(xScaleRadius)
      .ticks(4)
      .orient("bottom")
      .tickFormat(function(d) { return d; })
      .tickSize(0)
      .tickPadding(5))
  .select(".domain")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

  svg.append("text")
    .attr("class", "sliderText")
    .attr("x", xSlider-5)
    .attr("y", ySliderRadius)
    .attr("dy", ".21em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .text("Scale Children")
    .style("text-anchor","end"); 

  sliderRadius = svg.append("g")
    .attr("class", "slider")
    .call(brushRadius);

  sliderRadius.selectAll(".extent,.resize")
    .remove();

  sliderRadius.select(".background")
    .attr("y",ySliderRadius-5)
    .attr("height", 10);

 handleRadius = sliderRadius.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0," + ySliderRadius + ")")
    .attr("r", 6);

  sliderRadius
    .call(brushRadius.event)
    .transition() // gratuitous intro!
    .duration(750)
    .call(brushRadius.event);
}

function brushedRadius() {
  var value = brushRadius.extent()[0];

  if (d3.event.sourceEvent) { // not a programmatic event
    value = xScaleRadius.invert(d3.mouse(this)[0]);
    brushRadius.extent([value, value]);
  }
  handleRadius.attr("cx", xScaleRadius(value));
  scaleRadius =value;
  
  //d3.select("body").style("background-color", d3.hsl(value*20, .8, .8));
 
  // scaleRate = height/(height-minY);
  //scaleCircle = 10-value;
  //handle.attr("cx", xScale(scaleCircle));
  //console.log("scaleCircle1 = "+scaleCircle);

  setupTree();
  update();
}
