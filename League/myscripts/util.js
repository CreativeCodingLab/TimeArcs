var diameter = 1000,
    radius = diameter / 2,
    innerRadius = radius - 120;

var typeList = ["Field A","Field B"]  
function drawColorLegend() {
  var x1 = [xStep*0.32,xStep*0.27];
  var y1 = [35,45+xStep*0.6];

   svg.selectAll(".textLegend").data(typeList).enter()
    .append("text")
      .attr("class", "textLegend")
      .attr("x", function(l,i){
        return x1[i]+11;
      })
      .attr("y", function(l,i){
        var yyy = y1[i];
        return yyy+13;
      })
      .text(function (d) {
        return d;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .style("text-anchor", "left")
      .style("font-weight", "bold")
      .style("fill", function (d) {
        return getColor(d);
      }); 

  svg.append("line")
    .attr("class", "nodeLineLegend")  
    .attr("x1", function(d) { return xStep; })
    .attr("y1", function(d) { return 8; })
    .attr("x2", function(d) { return xStep+xScale(30); })
    .attr("y2", function(d) { return 8; })
    .style("stroke-width",5)
    .style("stroke-opacity",0.28)
    .style("stroke", "#000");   
  
  svg.append("text")
      .attr("class", "textLegend")
      .attr("x", xStep+xScale(30)+2)
      .attr("y", 13)
      .text("Playing time")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .style("text-anchor", "left")
      .style("fill", "#555");         
}


function removeColorLegend() {
 svg.selectAll(".nodeLegend").remove();
}
function drawTimeLegend() {
  for (var i=minYear; i<maxYear;i=i+60){
    var xx = xStep+xScale((i-minYear));
    svg.append("line")
      .style("stroke", "#00a")
      .style("stroke-dasharray", ("1, 2"))
      .style("stroke-opacity", 1)
      .style("stroke-width", 0.2)
      .attr("x1", function(d){ return xx; })
      .attr("x2", function(d){ return xx; })
      .attr("y1", function(d){ return 0; })
      .attr("y2", function(d){ return height/3; });
     svg.append("text")
      .attr("class", "timeLegend")
      .style("fill", "#000")   
      .style("text-anchor","start")
      .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
      .attr("x", xx)
      .attr("y", height/3-5)
      .attr("dy", ".21em")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .style("font-weight", "bold")  
      .text(function(d) { 
        var time = i/60 ;
        if (time<12)
          return time+"am";
        if (time==12)
          return time+"pm";
        else
          return (time-12)+"pm";   
      });  
  }
   svg.append("text")
      .attr("class", "text222")
      .attr("x", xStep)
      .attr("y", height/3+20)
      .text("Sunday, June 19th, 2016")
      .attr("font-family", "sans-serif")
      .attr("font-size", "13px")
      .style("text-anchor", "left")
      .style("fill", "#555")
      .style("font-weight", "bold"); 
}  

function getColor(category) {
  var sat = 200;
  if (category=="Field A")
    return "#d00"
  else if (category=="Field B")
    return "#00f"
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
