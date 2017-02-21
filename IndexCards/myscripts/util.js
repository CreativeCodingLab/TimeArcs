var diameter = 1000,
    radius = diameter / 2,
    innerRadius = radius - 120;

  // Add color legend
function drawColorLegend() {
      var xx = 6;
      var y1 = 20;
      var y2 = 34;
      var y3 = 48;
      var y4 = 62;
      var y5 = 76;
      var rr = 6;
      
      svg.append("circle")
        .attr("class", "nodeLegend")
        .attr("cx", xx)
        .attr("cy", y1)
        .attr("r", rr)
        .style("fill", "#00aa00");
      
      svg.append("text")
        .attr("class", "nodeLegend")
        .attr("x", xx+10)
        .attr("y", y1+2)
        .text("increases_activity")
       // .text("adds_modification")
       // .text("InfoVis")
       //.text("Comedy")
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .style("text-anchor", "left")
        .style("fill", "#00aa00");
   
      svg.append("circle")
        .attr("class", "nodeLegend")
        .attr("cx", xx)
        .attr("cy", y2)
        .attr("r", rr)
        .style("fill", "#cc0000");  

      svg.append("text")
        .attr("class", "nodeLegend")
        .attr("x", xx+10)
        .attr("y", y2+2)
        .text("decreases_activity")
        //.text("removes_modification")
        //.text("VAST")
        //.text("Action")
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .style("text-anchor", "left")
        .style("fill", "#cc0000");  

       svg.append("circle")
        .attr("class", "nodeLegend")
        .attr("cx", xx)
        .attr("cy", y3)
        .attr("r", rr)
        .style("fill", "#0000cc");  

      svg.append("text")
        .attr("class", "nodeLegend")
        .attr("x", xx+10)
        .attr("y", y3+2)
        .text("translocation")
       // .text("SciVis")
       // .text("Drama")
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .style("text-anchor", "left")
        .style("fill", "#0000cc");  


       svg.append("circle")
        .attr("class", "nodeLegend")
        .attr("cx", xx)
        .attr("cy", y4)
        .attr("r", rr)
        .style("fill", "#ca0");  

      svg.append("text")
        .attr("class", "nodeLegend")
        .attr("x", xx+10)
        .attr("y", y4+2)
        .text("binds")
       // .text("SciVis")
       // .text("Drama")
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .style("text-anchor", "left")
        .style("fill", "#ca0");  

     svg.append("circle")
        .attr("class", "nodeLegend")
        .attr("cx", xx)
        .attr("cy", y5)
        .attr("r", rr)
        .style("fill", "#f0f");  

      svg.append("text")
        .attr("class", "nodeLegend")
        .attr("x", xx+10)
        .attr("y", y5+2)
        .text("increases")
       // .text("SciVis")
       // .text("Drama")
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .style("text-anchor", "left")
        .style("fill", "#f0f");     
}

function removeColorLegend() {
 svg.selectAll(".nodeLegend").remove();
}
function drawTimeLegend() {
  for (var i=minYear; i<maxYear;i=i+1){
    var xx = xStep+xScale((i-minYear));
    svg.append("line")
      .style("stroke", "#00a")
      .style("stroke-dasharray", ("1, 2"))
      .style("stroke-opacity", 1)
      .style("stroke-width", 0.2)
      .attr("x1", function(d){ return xx; })
      .attr("x2", function(d){ return xx; })
      .attr("y1", function(d){ return 0; })
      .attr("y2", function(d){ return height; });
     svg.append("text")
      .attr("class", "timeLegend")
      .style("fill", "#000")   
      .style("text-anchor","start")
      .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
      .attr("x", xx)
      .attr("y", height-5)
      .attr("dy", ".21em")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .text(function(d) { return i });  
  }
}  

function getColor(category, count) {
  var minSat = 0;
  var maxSat = 200;
  var percent = count/(termMaxMax3);
  var sat = minSat+Math.round(percent*(maxSat-minSat));
  //console.log(category+" "+count+" termMaxMax3="+termMaxMax3+" sat="+sat);
  if (category=="InfoVis" || category=="Comedy" || category=="adds_modification" || category=="increases_activity")
    return "rgb("+sat+", "+180+", "+sat+")" ; // leaf node
  else if (category=="VAST" || category=="Action" || category=="removes_modification" || category=="decreases_activity")
    return "rgb("+230+", "+sat+", "+sat+")" ; // leaf node
  else if (category=="SciVis" || category=="Drama"|| category=="translocation")
    return "rgb("+sat+", "+sat+", "+230+")" ; // leaf node
  else if (category=="binds")
    return "rgb("+200+", "+150+", "+0+")" ; // leaf node
  else if (category=="increases")
    return "rgb("+255+", "+0+", "+255+")" ; // leaf node
  else{
    return "#000000";    
  }
}

function colorFaded(d) {
  var minSat = 80;
  var maxSat = 200;
  var step = (maxSat-minSat)/maxDepth;
  var sat = Math.round(maxSat-d.depth*step);
 
  //console.log("maxDepth = "+maxDepth+"  sat="+sat+" d.depth = "+d.depth+" step="+step);
  return d._children ? "rgb("+sat+", "+sat+", "+sat+")"  // collapsed package
    : d.children ? "rgb("+sat+", "+sat+", "+sat+")" // expanded package
    : "#aaaacc"; // leaf node
}


function getBranchingAngle1(radius3, numChild) {
  if (numChild<=2){
    return Math.pow(radius3,2);
  }  
  else
    return Math.pow(radius3,1);
 } 

function getRadius(d) {
 // console.log("scaleCircle = "+scaleCircle +" scaleRadius="+scaleRadius);
return d._children ? scaleCircle*Math.pow(d.childCount1, scaleRadius)// collapsed package
      : d.children ? scaleCircle*Math.pow(d.childCount1, scaleRadius) // expanded package
      : scaleCircle;
     // : 1; // leaf node
}


function childCount1(level, n) {
    count = 0;
    if(n.children && n.children.length > 0) {
      count += n.children.length;
      n.children.forEach(function(d) {
        count += childCount1(level + 1, d);
      });
      n.childCount1 = count;
    }
    else{
       n.childCount1 = 0;
    }
    return count;
};

function childCount2(level, n) {
    var arr = [];
    if(n.children && n.children.length > 0) {
      n.children.forEach(function(d) {
        arr.push(d);
      });
    }
    arr.sort(function(a,b) { return parseFloat(a.childCount1) - parseFloat(b.childCount1) } );
    var arr2 = [];
    arr.forEach(function(d, i) {
        d.order1 = i;
        arr2.splice(arr2.length/2,0, d);
    });
    arr2.forEach(function(d, i) {
        d.order2 = i;
        childCount2(level + 1, d);
        d.idDFS = nodeDFSCount++;   // this set DFS id for nodes
    });

};

d3.select(self.frameElement).style("height", diameter + "px");




// Toggle children on click.
function click(d) {
/*  if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  console.log("Clicking on = "+d.name+ " d.depth = "+d.depth);
  
 update();*/
}

/*
function collide(alpha) {
  var quadtree = d3.geom.quadtree(tree_nodes);
  return function(d) {
    quadtree.visit(function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== d) && (quad.point !== d.parent) && (quad.point.parent !== d)) {
         var rb = getRadius(d) + getRadius(quad.point),
        nx1 = d.x - rb,
        nx2 = d.x + rb,
        ny1 = d.y - rb,
        ny2 = d.y + rb;

        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
          if (l < rb) {
          l = (l - rb) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}
*/
