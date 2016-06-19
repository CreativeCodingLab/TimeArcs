
//===============================================
var brush;
var slider;
var handle;
var xScaleSlider;
var xSlider = 3;
var ySlider = 125;
var valueSlider = 1;
var valueMax = 10;
function setupSliderScale(svg) {
  xScaleSlider = d3.scale.linear()
    .domain([0, valueMax])
    .range([xSlider, 120])
    ;

  //valueSlider = relationshipMaxMax2*0.1;
  brush = d3.svg.brush()
    .x(xScaleSlider)
    .extent([valueSlider, valueSlider])
    .on("brush", brushed)
    .on("brushend", brushend);

  
}

function brushed() {
  //console.log("Slider brushed ************** valueSlider="+valueSlider);
  valueSlider = brush.extent()[0];
  if (d3.event.sourceEvent) { // not a programmatic event
    valueSlider = Math.max(xScaleSlider.invert(d3.mouse(this)[0]),0.5);
    valueSlider = Math.min(valueSlider, valueMax);
    valueSlider = Math.round(valueSlider);
    brush.extent([valueSlider, valueSlider]);
  }
  handle.attr("cx", xScaleSlider(valueSlider));
  
}
function brushend() {
  // console.log("Slider brushed ************** valueSlider="+valueSlider);
  recompute();
}

