var colorTitle = "#909";

var force2 = d3.layout.force()
    .charge(-90)
    .linkDistance(25)
    .gravity(0.1)
    .alpha(0.1)
    .size([width/3, width/3]);  
/*
var svg2 = d3.select("body").append("svg")
    .attr("width", 0)
    .attr("height", 0);

var svg22 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", 120);
svg22.append("text")
    .attr("class", "textTitle")
    .attr("x", width/2)
    .attr("y", 60)
    .text("IEEE VIS co-authorship network of")
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
    .style("text-anchor", "middle")
    .style("fill", colorTitle);
svg22.append("text")
    .attr("class", "textTitle")
    .attr("x", width/2)
    .attr("y", 110)
    .text("the top 50 researchers between "+2006+" and 2014")
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
    .style("text-anchor", "middle")
    .style("fill", colorTitle);


var svg3 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3);
svg3.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);    
d3.select("body").append("svg")
    .attr("width", 10)
    .attr("height", width/3+10);


 var svg4 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3);
svg4.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);    
d3.select("body").append("svg")
    .attr("width", 10)
    .attr("height", width/3+10);

var svg5 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3);
svg5.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);    

var svg6 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3);
svg6.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);    
d3.select("body").append("svg")
    .attr("width", 10)
    .attr("height", width/3+18);

var svg7 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3); 
svg7.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);    
d3.select("body").append("svg")
    .attr("width", 10)
    .attr("height", width/3+18);

var svg8 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3); 
svg8.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);    

var svg9 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3); 
svg9.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);  
d3.select("body").append("svg")
    .attr("width", 10)
    .attr("height", width/3+18);

var svg10 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3); 
svg10.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0);  
d3.select("body").append("svg")
    .attr("width", 10)
    .attr("height", width/3+18);

var svg11 = d3.select("body").append("svg")
    .style("background", "#f4f4f4")
    .attr("width", width/3)
    .attr("height", width/3); 
svg11.append("rect")
    .attr("width", width/3)
    .attr("height", width/3)
    .style("stroke","#00a")
    .style("fill-opacity",0); 

var svg111 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", 60);
*/
// Function **********************************************    
function runForceLayouts(){
     force2.nodes(nodes2)
        .links(links2)
        .start();    


  var link2 = svg2.selectAll(".link2")
      .data(links2)
    .enter().append("line")
      .attr("class", "link2")
      .style("stroke",function(d) {
        if (d.count==1){
            return "#fbb";
        }
        else{
            return "#f00";
        }

      })
      .style("stroke-width", function(d) { return 0.5+0.75*linkScale(d.count); });

  var node2 = svg2.selectAll(".nodeText2")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText2")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px"); 


var link3 = svg3.selectAll(".link3")
      .data(links2)
    .enter().append("line")
      .attr("class", "link3")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { 
        if (!d[0])  return 0;
        return 2*linkScale(d[0]); 
    });

  var link4 = svg4.selectAll(".link4")
      .data(links2)
    .enter().append("line")
      .attr("class", "link4")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[1])  return 0;
        return 2*linkScale(d[1]); });

      var link5 = svg5.selectAll(".link4")
        .data(links2)
   .enter().append("line")
      .attr("class", "link4")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[2])  return 0;
        return 2*linkScale(d[2]); });
      var link6 = svg6.selectAll(".link6")
       .data(links2)
    .enter().append("line")
      .attr("class", "link6")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[3])  return 0;
        return 2*linkScale(d[3]); });

      var link7 = svg7.selectAll(".link7")
       .data(links2)
    .enter().append("line")
      .attr("class", "link7")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[4])  return 0;
        return 2*linkScale(d[4]); });

     
      var link8 = svg8.selectAll(".link8")
       .data(links2)
    .enter().append("line")
      .attr("class", "link8")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[5])  return 0;
        return 2*linkScale(d[5]); });

     
      var link9 = svg9.selectAll(".link9")
       .data(links2)
    .enter().append("line")
      .attr("class", "link9")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[6])  return 0;
        return 2*linkScale(d[6]); });


      var link10 = svg10.selectAll(".link10")
       .data(links2)
    .enter().append("line")
      .attr("class", "link10")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[7])  return 0;
        return 2*linkScale(d[7]); });

      var link11 = svg11.selectAll(".link11")
       .data(links2)
    .enter().append("line")
      .attr("class", "link11")
      .style("stroke",function(d) {
        if (d.type.length==1){
           return getColor(d.type[0], 0);;     
        }
        else{
            return "#000";
        }
      })
      .style("stroke-width", function(d) { if (!d[8])  return 0;
        return 2*linkScale(d[8]); });




  var node3 = svg3.selectAll(".nodeText3")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText3")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[0][d.name])
                    return 1;
                return 0.2})
            
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px"); 

     var node4 = svg4.selectAll(".nodeText4")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText4")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[1][d.name])
                    return 1;
                return 0.2})
            
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px"); 
            

            var node5 = svg5.selectAll(".nodeText5")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText5")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[2][d.name])
                    return 1;
                return 0.2})
            
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px"); 

            var node6 = svg6.selectAll(".nodeText6")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText6")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[3][d.name])
                    return 1;
                return 0.2})
            
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px"); 

            var node7 = svg7.selectAll(".nodeText7")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText7")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[4][d.name])
                    return 1;
                return 0.2})
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px");  

             var node8 = svg8.selectAll(".nodeText8")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText8")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[5][d.name])
                    return 1;
                return 0.2})
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px");  


             var node9 = svg9.selectAll(".nodeText9")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText9")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[6][d.name])
                    return 1;
                return 0.2})
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px");  


             var node10 = svg10.selectAll(".nodeText10")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText10")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[7][d.name])
                    return 1;
                return 0.2})
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px");  

            var node11 = svg11.selectAll(".nodeText11")
    .data(nodes2)
    .enter().append("text")
      .attr("class", ".nodeText11")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000")
            .style("fill-opacity",function(d) { 
                if (list5[8][d.name])
                    return 1;
                return 0.2})
            .style("text-anchor","middle")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px");  


            
      svg3.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

        svg4.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+1)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

        svg5.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+2)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

        svg6.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+3)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

        svg7.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+4)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

         svg8.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+5)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

         svg9.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+6)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

         svg10.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+7)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);

        svg11.append("text")
        .attr("class", "nodeLegend")
        .attr("x", width/6)
        .attr("y", width/3-15)
        .text(minYear+8)
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .style("text-anchor", "middle")
        .style("fill", colorTitle);
   



 node2.append("title")
      .text(function(d) { return d.name; });

  force2.on("tick", function() {
    link2.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });


    link3.attr("x1", function(d) { 
        return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });  

         link4.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });  


         link5.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });  


         link6.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });  


         link7.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        link8.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        link9.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        link10.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });    

         link11.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });    

    node2.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });


     node3.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });   
         node4.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });   
         node5.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });   
         node6.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });   
         node7.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
         node8.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
         node9.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
         node10.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; }); 
         node11.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });   

  });
}

