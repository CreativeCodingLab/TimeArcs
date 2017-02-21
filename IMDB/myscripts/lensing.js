
var isLensing = false;
var transTime =500;
function drawTimeLegend() {
  var listX=[];
  for (var i=minYear; i<maxYear;i++){
    var xx = xStep+xScale(i-minYear);
    var obj = {};
    obj.x = xx;
    obj.year = i;
    listX.push(obj);    
  }

  svg.selectAll(".timeLegendLine").data(listX)
    .enter().append("line")
      .attr("class", "timeLegendLine")
      .style("stroke", "#000") 
      .style("stroke-dasharray", "1, 2")
      .style("stroke-opacity", 1)
      .style("stroke-width", 0.2)
      .attr("x1", function(d){ return d.x; })
      .attr("x2", function(d){ return d.x; })
      .attr("y1", function(d){ return 0; })
      .attr("y2", function(d){ return height; });
  svg.selectAll(".timeLegendText").data(listX)
    .enter().append("text")
      .attr("class", "timeLegendText")
      .style("fill", "#000000")   
      .style("text-anchor","start")
      .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
      .attr("x", function(d){ return d.x; })
      .attr("y", height-7)
      .attr("dy", ".21em")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .text(function(d,i) { 
        return d.year;  
      });     
}

function updateTimeLegend() {
  var listX=[];
  for (var i=minYear; i<maxYear;i++){
    var xx = xStep+xScale(i-minYear);
    var obj = {};
    obj.x = xx;
    obj.year = i;
    listX.push(obj);    
  }

  svg.selectAll(".timeLegendLine").data(listX).transition().duration(transTime)
      .style("stroke-dasharray",  function(d,i){ 
        if (!isLensing)
          return "1, 2";
        else  
          return i%5==0 ? "2, 1" : "1, 3"})
      .style("stroke-opacity", function(d,i){
        if (i%5==0)
          return 1;
        else {
          if (isLensing && lMonth-lensingMul<=i && i<=lMonth+lensingMul)
              return 1;
          else 
            return 0; 
        }
      }) 
      .attr("x1", function(d){return d.x; })
      .attr("x2", function(d){ return d.x; });
  svg.selectAll(".timeLegendText").data(listX).transition().duration(transTime)
      .style("fill-opacity", function(d,i){
        if (i%5==0)
          return 1;
        else {
          if (isLensing && lMonth-lensingMul<=i && i<=lMonth+lensingMul)
              return 1;
          else 
            return 0; 
        }
      }) 
      .attr("x", function(d,i){ 
        return d.x; });  
}

var buttonLensingWidth =80;
var buttonheight =15;
var roundConner = 4;
var colorHighlight = "#fc8";
var buttonColor = "#ddd";

function drawLensingButton(){  
  svg.append('rect')
    .attr("class", "lensingRect")
    .attr("x", 1)
    .attr("y", 170)
    .attr("rx", roundConner)
    .attr("ry", roundConner)
    .attr("width", buttonLensingWidth)
    .attr("height", buttonheight)
    .style("stroke", "#000")
    .style("stroke-width", 0.1)
    .style("fill", buttonColor)
    .on('mouseover', function(d2){
      svg.selectAll(".lensingRect")
          .style("fill", colorHighlight);
    })
    .on('mouseout', function(d2){
      svg.selectAll(".lensingRect")
          .style("fill", buttonColor);
    })
    .on('click', turnLensing);         
  svg.append('text')
    .attr("class", "lensingText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("x", buttonLensingWidth/2)
    .attr("y", 181)
    .text("Lensing")
    .style("text-anchor", "middle")
    .style("fill", "#000")
    .on('mouseover', function(d2){
        svg.selectAll(".lensingRect")
          .style("fill", colorHighlight);
    })
    .on('mouseout', function(d2){
        svg.selectAll(".lensingRect")
          .style("fill", buttonColor);
    })
    .on('click', turnLensing);
}
function turnLensing() {
  isLensing = !isLensing;
  svg.selectAll('.lensingRect')
    .style("stroke-width", function(){
      return isLensing ? 1 : 0.1;
    });
  svg.selectAll('.lensingText')
    .style("font-weight", function() { 
      return isLensing ? "bold" : "";
    });
   svg.append('rect')
    .attr("class", "lensingRect")
    .style("fill-opacity", 0)
    .attr("x", xStep)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .on('mousemove', function(){
      coordinate = d3.mouse(this);
      // Compute lensing on Y
      computeY_Scale();

      lMonth = Math.floor((coordinate[0]-xStep)/XGAP_);
      lY = Math.floor(coordinate[1]/(height/numNode));
      updateTransition(transTime);  
      updateTimeLegend();
    });
    computeY_Scale();
    updateTransition(transTime);     
    updateTimeLegend(); 
}  

var lensingMul = 5;
var lMonth = 0;
var lY = 10;
var coordinate = [0,0];
var XGAP_ = (width-xStep-100)/(maxYear-minYear); // gap between months on xAxis
var listLensing = {};
function xScale(m){
    if (isLensing){
        var numLens = 5;
        var maxM = Math.max(0, lMonth-numLens-1);
        var numMonthInLense = (lMonth+numLens-maxM+1);
        
        //compute the new xGap
        var total= maxYear-minYear+numMonthInLense*(lensingMul-1);
        var xGap = (XGAP_*(maxYear-minYear))/total;
        
        if (m<lMonth-numLens)
            return m*xGap;
        else if (m>lMonth+numLens){
            return maxM*xGap+ numMonthInLense*xGap*lensingMul + (m-(lMonth+numLens+1))*xGap;
        }   
        else{
            return maxM*xGap+(m-maxM)*xGap*lensingMul;
        }  
    }
    else{
       return m*XGAP_; 
    }           
}


function computeY_Scale() { 
    var termArray = [];
    for (var i=0; i< numNode; i++) {
        if (nodes[i].connect && nodes[i].connect.length>0){
            var e =  {};
            e.y = nodes[i].y;
            e.nodeId = i;
            termArray.push(e);
        }
    }
    termArray.sort(function (a, b) {
      if (a.y > b.y) {
        return 1;
      }
      if (a.y < b.y) {
        return -1;
      }
      return 0;
    });  

    listLensing = {};
    svg.selectAll(".nodeText").remove();
    if (isLensing){
        console.log("lY="+lY);
        var numLens = 20;
        var yLensing = 7;
        var yGap = (height-(numLens*2+1)*yLensing)/numNode;
        
        for (var i=0; i< termArray.length; i++) {
            var yy;
            if (i<lY-numLens)
                yy=i*yGap;
            else if (i>lY+numLens){
                yy=(i-(numLens*2+1))*yGap+ (numLens*2+1)*yLensing;
            }   
            else{
                yy=(lY-numLens)*yGap + (i-(lY-numLens))*yLensing;
                listLensing[nodes[termArray[i].nodeId].name] = nodes[termArray[i].nodeId];
            } 
            nodes[termArray[i].nodeId].y = yy;
        }

        var nodesLensing = pNodes.filter(function (d) {
            if (listLensing[d.name]) {
                return d;
            }
        });
        svg.selectAll(".nodeText").data(nodesLensing).enter()
            .append("text")
            .attr("class", "nodeText")  
            .text(function(d) { return d.name })           
            .attr("x", function(d) { return d.x })
            .attr("y", function(d) { return d.y })
            .attr("dy", ".35em")
            .style("fill","#000000")
            //.style("fill-opacity",1)
            .style("text-anchor","end")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d) { 
                return d.isSearchTerm ? "9px" : "8px"; });
    }   
    else{ 
        var step = Math.min((height-22)/(termArray.length),13);
        for (var i=0; i< termArray.length; i++) {
            nodes[termArray[i].nodeId].y = 10+i*step;
        }
        force.stop();
    } 

    

   
}
