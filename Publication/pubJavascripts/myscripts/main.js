//Constants for the SVG
var margin = {top: 0, right: 0, bottom: 5, left: 15};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 200 - margin.top - margin.bottom;

//---End Insert------

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var svg2 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", 0);

var topTermMode = 0;

//Set up the force layout
//Set up the force layout
var force = d3.layout.force()
    .charge(-40)
    .linkDistance(40)
    .gravity(0.02)
    //.friction(0.5)
    .alpha(0.1)
    .size([width, height]);

/*
 var force = cola.d3adaptor()
    .linkDistance(30)
    .size([width, height]);
*/

var force2 = d3.layout.force()
    .charge(-80)
    .linkDistance(80)
    .gravity(0.08)
    .alpha(0.12)
    .size([width, height]);    

var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy; 
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        force.resume();
    }

    function releasenode(d) {
        d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        //force.resume();
    }


var data, data2;

var minYear = 2008;
var maxYear = 2017;
var numYear = (maxYear-minYear)+1;

var sourceList = {};
var numSource = {};
var maxCount = {}; // contain the max frequency for 4 categories

var nodes;
var numNode, numNode2;

var link;
var links;
var linkArcs;
var termArray, termArray, termArray;
var relationship;
var termMaxMax, termMaxMax2, termMaxMax3;
var terms;
var NodeG; 
var xScale = d3.time.scale().range([0, (width-100)/numYear]);
var xStep = 100;
var yScale;
var linkScale;
var searchTerm ="";


 var nodes2 = [];
 var links2 = [];
var nodes2List = {};
var links2List = {};
var linePNodes ={};
    

var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return xStep+xScale(d.yearId); })
        .y0(function(d) { return d.yNode-yScale(d.value); })
        .y1(function(d) {  return d.yNode +yScale(d.value); });
var areaInfoVis = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return xStep+xScale(d.yearId); })
        .y0(function(d) { return d.yNode-yScale(d.value); })
        .y1(function(d) {  return d.yNode -yScale(d.value)+2*yScale(d.InfoVis); });
var areaVAST = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return xStep+xScale(d.yearId); })
        .y0(function(d) { return d.yNode-yScale(d.value)+2*yScale(d.InfoVis); })
        .y1(function(d) {  return d.yNode -yScale(d.value)+2*yScale(d.InfoVis)+2*yScale(d.VAST); });
var areaSciVis = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return xStep+xScale(d.yearId); })
        .y0(function(d) { return d.yNode-yScale(d.value)+2*yScale(d.InfoVis)+2*yScale(d.VAST); })
        .y1(function(d) {  return d.yNode -yScale(d.value)+2*yScale(d.InfoVis)+2*yScale(d.VAST)+2*yScale(d.SciVis); });
     
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .style('top', "200px")
  .style('left', function(d) { return "200px";  })
  .offset(function(d) {
    var a =[-10,0];
    a[0] =-10;
    a[1] = 0;
    return a;
  })
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d + "</span>";
  })
svg.call(tip);

var optArray = [];   // FOR search box

var numberInputTerms =0;
var listYear = [];




d3.tsv("pubJavascripts/publication.tsv", function(error, data_) {
    if (error) throw error;
    data = data_;
    
    terms = new Object();
    termMaxMax = 1;
    var cccc = 0;
    data.forEach(function(d) {
        var year = parseInt(d["Time"])-minYear;
        console.log("Time="+year);
    
        d.year = year;
        //if (d.year<20) return; 
            
        numberInputTerms++;
             
        var list = d["Authors"].split(",");
        cccc++;
        for (var i=0; i<list.length;i++){
            var term = list[i];
            d[term] = 1;

            if (!terms[term]){
                terms[term] = new Object();
                terms[term].count = 1;
                terms[term].max = 0;
                terms[term].maxYear = -100;   // initialized negative
                terms[term].category = d.Conference;
                terms[term].InfoVis ={};
                terms[term].VAST ={};
                terms[term].SciVis ={};
            } 
            else
                terms[term].count++; 


            if (!terms[term][year]){
                terms[term][year] = 1;
            }    
            else{
                terms[term][year] ++;
                if (terms[term][year]>terms[term].max){
                    terms[term].max = terms[term][year];
                    terms[term].maxYear = year;
                    if (terms[term].max>termMaxMax)
                        termMaxMax = terms[term].max;
                }    
            }   

            if (d.Conference=="InfoVis" || d.Conference=="Comedy"){
                if (!terms[term].InfoVis[year]){
                    terms[term].InfoVis[year] = 1;
                }    
                else{
                    terms[term].InfoVis[year] ++;
                }  
            } 
            else if (d.Conference=="VAST"|| d.Conference=="Action"){
                if (!terms[term].VAST[year]){
                    terms[term].VAST[year] = 1;
                }    
                else{
                    terms[term].VAST[year] ++;
                }  
            }   
            else if (d.Conference=="SciVis" || d.Conference=="Drama"){
                if (!terms[term].SciVis[year]){
                    terms[term].SciVis[year] = 1;
                }    
                else{
                    terms[term].SciVis[year] ++;
                }  
            }   
        }        
    });
    console.log("DONE reading the input file = "+data.length)
      
    readTermsAndRelationships();
    computeNodes();
    computeLinks();
 
   //force.linkStrength(function(l) {
   //     return 0.1;       
   // });
    
    force.linkDistance(function(l) {
        return (10*(l.m-1));  
    });
    
    /// The second force directed layout ***********
    for (var i=0;i<nodes.length;i++){
        var nod = nodes[i];
        if (!nodes2List[nod.name] && nodes2List[nod.name]!=0){
            var newNod = {};
            newNod.name = nod.name;
            newNod.id = nodes2.length;
            nodes2List[newNod.name] = newNod.id;
            nodes2.push(newNod);
        }
    }

    var selectedTime= {};
    var linksList = {}; list5={};
        selectedTime[20] = 1; linksList[20] = []; list5[20] ={};
        selectedTime[21] = 1; linksList[21] = []; list5[21] ={};
        selectedTime[22] = 1; linksList[22] = []; list5[22] ={};
        selectedTime[23] = 1; linksList[23] = []; list5[23] ={};
        selectedTime[24] = 1; linksList[24] = []; list5[24] ={};

    for (var i=0;i<links.length;i++){
        var l = links[i];
        var name1 = nodes[l.source].name;
        var name2 = nodes[l.target].name;
        var node1 = nodes2List[name1];
        var node2 = nodes2List[name2];
        if (!links2List[name1+"_"+name2] && links2List[name1+"_"+name2]!=0){
            var newl = {};
            newl.source = node1;
            newl.target = node2;
            newl.count = l.count;
            if (!newl[l.m]) 
                newl[l.m] = l.count;
            else
                newl[l.m] += l.count;
            
            if (list5[l.m]){
                list5[l.m][name1] =1;
                list5[l.m][name2] =1;
            }    

            links2List[name1+"_"+name2] =  links2.length; 
            links2.push(newl); 
        }
        else{
            var oldl = links2[links2List[name1+"_"+name2]];
            if (!oldl[l.m]) 
                oldl[l.m] = l.count;
            else
                oldl[l.m] += l.count;

            if (list5[l.m]){
                list5[l.m][name1] =1;
                list5[l.m][name2] =1;
            }

            oldl.count += l.count;
        }  
    }


    force.nodes(nodes)
        .links(links)
        .start(100,150,200);

   // force2.nodes(nodes2)
   //     .links(links2)
   //     .start();    


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
        .attr("class", "nodeText2")  
        .text(function(d) { return d.name })           
        .attr("dy", ".35em")
        .style("fill","#000")
        .style("text-anchor","middle")
        .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
        .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
        .attr("dy", ".21em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px"); 





node2.append("title")
      .text(function(d) { return d.name; });

  force2.on("tick", function() {
    link2.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node2.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
  });






    force.on("tick", function () {
        update();
    });
    force.on("end", function () {
        detactTimeSeries();
    });

    
    

    setupSliderScale(svg);
    drawColorLegend();
    drawTimeLegend();
  

    for (var i = 0; i < termArray.length; i++) {
        optArray.push(termArray[i].term);
    }
    optArray = optArray.sort();
    $(function () {
        $("#search").autocomplete({
            source: optArray
        });
    }); 
});

    function recompute() {
        var bar = document.getElementById('progBar'),
            fallback = document.getElementById('downloadProgress'),
            loaded = 0;

        var load = function() {
            loaded += 1;
            bar.value = loaded;

            /* The below will be visible if the progress tag is not supported */
            $(fallback).empty().append("HTML5 progress tag not supported: ");
            $('#progUpdate').empty().append(loaded + "% loaded");

            if (loaded == 100) {
                clearInterval(beginLoad);
                $('#progUpdate').empty().append("Complete");
            }
        };

        var beginLoad = setInterval(function() {load();}, 10);
        setTimeout(alertFunc, 333);
        
        function alertFunc() {
            readTermsAndRelationships();
            computeNodes();
            computeLinks()
            force.nodes(nodes)
                .links(links)
                .start();
        }
    } 

    function readTermsAndRelationships() {
        data2 = data.filter(function (d, i) {
           // if (d.year<20) return; 
            if (!searchTerm || searchTerm=="" ) {
                return d;
            }
            else if (d[searchTerm])
                return d;
        });

        console.log("data2="+data2.length);
        var selected  ={}
        if (searchTerm && searchTerm!=""){
            data2.forEach(function(d) {
                 for (var term1 in d) {
                    if (!selected[term1])
                        selected[term1] = {};
                    else{
                        if (!selected[term1].isSelected)
                            selected[term1].isSelected = 1;
                        else
                            selected[term1].isSelected ++;
                    }    
               }
            } );
        }


        var removeList = {};   // remove list **************

         

        termArray = [];
        for (var att in terms) {
            var e =  {};
            e.term = att;
            if (removeList[e.term] || (searchTerm && searchTerm!="" && !selected[e.term])) // remove list **************
                continue;

            /*
            var maxNet = 0;
            var maxYear = -1;
            for (var y=1; y<numYear;y++){
                if (terms[att][y]){
                    var previous = 0;
                    if (terms[att][y-1])
                        previous = terms[att][y-1];
                    var net = (terms[att][y]+1)/(previous+1);
                    if (net>maxNet){
                        maxNet=net;
                        maxYear = y;
                    }    
                }
            }*/
            var maxmaxmax = 0
            for (var i=0;i<numYear;i++){
                if (terms[att][i])
                    maxmaxmax+=terms[att][i]
             }

            e.count = terms[att].count;
            e.max = maxmaxmax;////terms[att].max;
            e.maxYear = terms[att].maxYear;
            e.category = terms[att].category;   
            e.infoVis = terms[att].InfoVis;   
            e.VAST = terms[att].VAST;   
            e.SciVis = terms[att].SciVis;   

            
            if (e.term==searchTerm){
                e.isSearchTerm = 1;
            }
              
            termArray.push(e);
        }
//        console.log("  termArray.length="+termArray.length) ; 
       
        if (!searchTerm)
            numberInputTerms = termArray.length;
        
       console.log("Finish ordering term by maxNet") ; 
        
        
       
    // Compute relationship **********************************************************
        numNode2 = termArray.length;
        relationship ={};
        relationshipMaxMax =0;
       // rrr ={};
        ttt ={};
        data2.forEach(function(d) { 
            var year = d.year;
            var list = d["Authors"].split(",");
            for (var i=0; i<list.length;i++){
                var term1 = list[i];
                for (var j=0; j<list.length;j++){
                    var term2 = list[j];
                    if (!relationship[term1+"__"+term2]){
                        relationship[term1+"__"+term2] = new Object();
                     //   rrr[term1+"__"+term2] = new Object();
                        ttt[term1+"__"+term2] = new Object();
                        relationship[term1+"__"+term2].max = 1;
                        relationship[term1+"__"+term2].maxYear =year;
                    }    
                    if (!relationship[term1+"__"+term2][year]){
                        relationship[term1+"__"+term2][year] = 1;
                  //      rrr[term1+"__"+term2][year] = {};
                        ttt[term1+"__"+term2][year] = [];
                        ttt[term1+"__"+term2][year].push(d["Code"]);
                    }    
                    else{
                      //  if (!rrr[term1+"__"+term2][year][d["Conference"]+"**"+d["Title"].substring(0,10)]){
                            relationship[term1+"__"+term2][year]++;
                            ttt[term1+"__"+term2][year].push(d["Code"]);
                        
                            if (relationship[term1+"__"+term2][year]>relationship[term1+"__"+term2].max){
                                relationship[term1+"__"+term2].max = relationship[term1+"__"+term2][year];
                                relationship[term1+"__"+term2].maxYear =year; 
                                
                                if (relationship[term1+"__"+term2].max>relationshipMaxMax) // max over time
                                    relationshipMaxMax = relationship[term1+"__"+term2].max;
                            } 
                    //    } 
                    }

                }
            }
        });
        console.log("DONE computing realtionships relationshipMaxMax="+relationshipMaxMax);
    }
    

    function computeConnectivity(a, num) {
        for (var i=0; i<num;i++){
            a[i].isConnected=-100;
            a[i].isConnectedMaxYear= a[i].maxYear;
        }    
        
        for (var i=0; i<num;i++){
            var term1 =  a[i].term;
            for (var j=i+1; j<num;j++){
                var term2 =  a[j].term;
                if (relationship[term1+"__"+term2] && relationship[term1+"__"+term2].max>=valueSlider){
                    if (relationship[term1+"__"+term2].max> a[i].isConnected 
                        || (relationship[term1+"__"+term2].max == a[i].isConnected
                            && relationship[term1+"__"+term2].maxYear<a[i].isConnectedMaxYear)){
                        a[i].isConnected = relationship[term1+"__"+term2].max;
                        a[i].isConnectedMaxYear = relationship[term1+"__"+term2].maxYear;
                    }    
                    if (relationship[term1+"__"+term2].max> a[j].isConnected
                        || (relationship[term1+"__"+term2].max == a[j].isConnected
                            && relationship[term1+"__"+term2].maxYear<a[j].isConnectedMaxYear)){
                        a[j].isConnected = relationship[term1+"__"+term2].max;
                        a[j].isConnectedMaxYear = relationship[term1+"__"+term2].maxYear;
                    }   
                }
                else if (relationship[term2+"__"+term1] && relationship[term2+"__"+term1].max>=valueSlider){
                    if (relationship[term2+"__"+term1].max>a[i].isConnected
                        || (relationship[term2+"__"+term1].max == a[i].isConnected
                            && relationship[term2+"__"+term1].maxYear<a[i].isConnectedMaxYear)){
                        a[i].isConnected = relationship[term2+"__"+term1].max;
                        a[i].isConnectedMaxYear = relationship[term1+"__"+term2].maxYear;
                    }
                    if (relationship[term2+"__"+term1].max>a[j].isConnected
                        || (relationship[term2+"__"+term1].max == a[j].isConnected
                            && relationship[term2+"__"+term1].maxYear<a[j].isConnectedMaxYear)){
                        a[j].isConnected = relationship[term2+"__"+term1].max;
                        a[j].isConnectedMaxYear = relationship[term1+"__"+term2].maxYear;
                    }    
                }
            }
        }
    }

    function computeNodes() {
        numNode0 = Math.min(200, termArray.length);
        console.log("termArray="+termArray.length);
        computeConnectivity(termArray, numNode0);
        
        
        termArray.sort(function (a, b) {
         if (a.isConnected < b.isConnected) {
            return 1;
          }
          else if (a.isConnected > b.isConnected) {
            return -1;
          }
          else{
                if (a.max < b.max) {
                    return 1;
                }
                else if (a.max > b.max) {
                    return -1;
                }
                else 
                return 0;
            }
        });   
      
        numNode = Math.min(50, termArray.length);
        computeConnectivity(termArray, numNode);
        nodes = [];
        for (var i=0; i<numNode;i++){
            var nod = new Object();
            nod.id = i;
            nod.group = termArray[i].category;
            nod.name = termArray[i].term;
            nod.max = termArray[i].max;
            var maxMonthRelationship = termArray[i].maxYear;
            nod.isConnectedMaxYear = termArray[i].isConnectedMaxYear;
            nod.maxYear = termArray[i].isConnectedMaxYear;
            nod.year = termArray[i].isConnectedMaxYear;
            if (termArray[i].isSearchTerm){
                nod.isSearchTerm =1;
                if (!nod.year)
                    nod.year = termArray[i].maxYear;
                if (!nod.isConnectedMaxYear)
                    nod.isConnectedMaxYear = termArray[i].maxYear;
            }    
            
            if (!maxCount[nod.group] || nod.max>maxCount[nod.group])
                maxCount[nod.group] = nod.max;
            
            if (termArray[i].isConnected>0)  // Only allow connected items
                nodes.push(nod);
        }
        numNode = nodes.length;
        
        console.log("numNode="+numNode);
        

        // compute the yearly data      
        termMaxMax2 = 0;
        
        for (var i=0; i<numNode; i++){
            nodes[i].yearly = new Array(numYear);
            nodes[i].InfoVis = new Array(numYear);
            nodes[i].VAST = new Array(numYear);
            nodes[i].SciVis = new Array(numYear);
                
            for (var y=0; y<numYear; y++){
                nodes[i].yearly[y] = new Object();
                nodes[i].InfoVis[y] = new Object();
                nodes[i].VAST[y] = new Object();
                nodes[i].SciVis[y] = new Object();
                if (terms[nodes[i].name][y]){
                    nodes[i].yearly[y].value = terms[nodes[i].name][y];
                    if (nodes[i].yearly[y].value >termMaxMax2)
                         termMaxMax2 = nodes[i].yearly[y].value ;
                }
                else{
                    nodes[i].yearly[y].value = 0;
                }    
                if (terms[nodes[i].name].InfoVis[y]){
                    nodes[i].InfoVis[y].value = terms[nodes[i].name].InfoVis[y];
                }
                else{
                    nodes[i].InfoVis[y].value = 0;
                }
                if (terms[nodes[i].name].VAST[y]){
                    nodes[i].VAST[y].value = terms[nodes[i].name].VAST[y];
                }
                else{
                    nodes[i].VAST[y].value = 0;
                }
                if (terms[nodes[i].name].SciVis[y]){
                    nodes[i].SciVis[y].value = terms[nodes[i].name].SciVis[y];
                }
                else{
                    nodes[i].SciVis[y].value = 0;
                }

                nodes[i].yearly[y].yearId = y;
                nodes[i].yearly[y].yNode = nodes[i].y;
                nodes[i].yearly[y].InfoVis = nodes[i].InfoVis[y].value;
                nodes[i].yearly[y].VAST = nodes[i].VAST[y].value;
                nodes[i].yearly[y].SciVis = nodes[i].SciVis[y].value;
                
                nodes[i].InfoVis[y].yearId = y;
                nodes[i].InfoVis[y].yNode = nodes[i].y;
                nodes[i].VAST[y].yearId = y;
                nodes[i].VAST[y].yNode = nodes[i].y;
                nodes[i].SciVis[y].yearId = y;
                nodes[i].SciVis[y].yNode = nodes[i].y;
            }
        } 
        
        // Construct an array of only parent nodes
        pNodes = new Array(numNode);
        termMaxMax3 = 0;
        for (var i=0; i<numNode;i++){
            pNodes[i] = nodes[i];
            if (pNodes[i].max>termMaxMax3)
                termMaxMax3 = pNodes[i].max;
        }
       // drawStreamTerm(svg, pNodes, 100, 600);

    }    

    function computeLinks() {
        links = [];
        relationshipMaxMax2 =0;
        
        for (var i=0; i<numNode;i++){
            var term1 =  nodes[i].name;
            for (var j=i+1; j<numNode;j++){
                var term2 =  nodes[j].name;
                if (relationship[term1+"__"+term2] && (term1=="Tuan Dang" || term2=="Tuan Dang" )){
                    var ordering =0;
                    for (var m=1; m<numYear;m++){
                        if (relationship[term1+"__"+term2][m] && relationship[term1+"__"+term2][m]>=valueSlider){
                            var sourceNodeId = i;
                            var targetNodeId = j;
                            
                            if (!nodes[i].connect)
                                nodes[i].connect = new Array();
                            nodes[i].connect.push(j)
                            if (!nodes[j].connect)
                                nodes[j].connect = new Array();
                            nodes[j].connect.push(i)

                            if (m != nodes[i].maxYear){
                                if (isContainedChild(nodes[i].childNodes,m)>=0){  // already have the child node for that month
                                    sourceNodeId =  nodes[i].childNodes[isContainedChild(nodes[i].childNodes,m)];
                                }  
                                else{  
                                    var nod = new Object();
                                    nod.id = nodes.length;
                                    nod.group = nodes[i].group;
                                    nod.name = nodes[i].name;
                                    nod.max = nodes[i].max;
                                    nod.maxYear = nodes[i].maxYear;
                                    nod.year = m;
                                    
                                    nod.parentNode = i;   // this is the new property to define the parent node
                                    if (!nodes[i].childNodes)
                                         nodes[i].childNodes = new Array();
                                    nodes[i].childNodes.push(nod.id);
                                    
                                    sourceNodeId = nod.id;
                                    nodes.push(nod);
                                }
                            }
                            if (m != nodes[j].maxYear){
                                if (isContainedChild(nodes[j].childNodes,m)>=0){
                                    targetNodeId = nodes[j].childNodes[isContainedChild(nodes[j].childNodes,m)];
                                }
                                else{    
                                    var nod = new Object();
                                    nod.id = nodes.length;
                                    nod.group = nodes[j].group;
                                    nod.name = nodes[j].name;
                                    nod.max = nodes[j].max;
                                    nod.maxYear = nodes[j].maxYear;
                                    nod.year = m;
                                    
                                    nod.parentNode = j;   // this is the new property to define the parent node
                                     if (!nodes[j].childNodes)
                                         nodes[j].childNodes = new Array();
                                    nodes[j].childNodes.push(nod.id);
                                    
                                    targetNodeId = nod.id;
                                    nodes.push(nod);
                                }    
                            }
                            
                            var l = new Object();
                            l.source = sourceNodeId;
                            l.target = targetNodeId;
                            l.m = m; 
                            l.ordering = ordering; 
                            ordering++;
                            //l.value = linkScale(relationship[term1+"__"+term2][m]); 
                            links.push(l);
                            if (relationship[term1+"__"+term2][m] > relationshipMaxMax2)
                                relationshipMaxMax2 = relationship[term1+"__"+term2][m];
                        }
                    }
                }
            }
        }
        
        var linearScale = d3.scale.linear()
            .range([0.3, 0.2])
            .domain([0, 500]);
        var hhh = Math.min(linearScale(numNode)*height/numNode,10);
        
        console.log("hhh="+hhh+" linearScale="+linearScale(numNode)+"    termMaxMax2="+termMaxMax2);
        yScale = d3.scale.linear()
            .range([0, hhh/200])
            .domain([0, termMaxMax2]);
        linkScale = d3.scale.linear()
            .range([1.2, 4])
            .domain([1, Math.max(relationshipMaxMax2,2)]);  

        links.forEach(function(l) { 
            var term1 = nodes[l.source].name;
            var term2 = nodes[l.target].name;
            var month = l.m;
            l.count = relationship[term1+"__"+term2][month];
            l.type = ttt[term1+"__"+term2][month];
            l.value = linkScale(relationship[term1+"__"+term2][month]); 
        });  

        console.log("DONE links relationshipMaxMax2="+relationshipMaxMax2);

        //Create all the line svgs but without locations yet
        svg.selectAll(".linkArc").remove();
        linkArcs = svg.append("g").selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "linkArc")
        .style("stroke", function (d) {
            if (d.count==1){
               return getColor(d.type[0]);;     
            }
            else{
                return "#000";
            }
        })
        .style("stroke-opacity", 1)
        .style("stroke-width", function (d) {
            return d.value;
        })  ;   
        
         svg.selectAll(".linkArc")
            .on('mouseover', mouseoveredLink)
            .on('mouseout', mouseoutedLink);

        
        svg.selectAll(".nodeG").remove();
        nodeG = svg.selectAll(".nodeG")
            .data(pNodes).enter().append("g")
            .attr("class", "nodeG")
         
        nodeG.append("text")
            .attr("class", "nodeText")  
            .text(function(d) { return d.name })           
            .attr("dy", "3px")
            .style("fill","#000000")
            .style("text-anchor","end")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px");

    

        // Horizontal lines
        svg.selectAll(".linePNodes").remove();
        linePNodes = svg.selectAll(".linePNodes")
            .data(pNodes).enter().append("line")
            .attr("class", "linePNodes")
            .attr("x1", function(d) {return xStep+xScale(d.minY);})
            .attr("y1", function(d) {return d.y;})
            .attr("x2", function(d) {return xStep+xScale(d.maxY);})
            .attr("y2", function(d) {return d.y;})
            .style("stroke-dasharray", ("1, 1"))
            .style("stroke-width",0.4)
            .style("stroke", "#000"); 



         // This is for linkDistance
        listYear = [];
        links.forEach(function(l) { 
            if (searchTerm!=""){
                if (nodes[l.source].name == searchTerm || nodes[l.target].name == searchTerm){
                    if (isContainedInteger(listYear,l.m)<0)
                        listYear.push(l.m);
                }
            }    
        }); 
        listYear.sort(function (a, b) {
          if (a > b) {
            return 1;
          }
          else if (a < b) {
            return -1;
          }
          else
            return 0;
        });    
       // listYear.sort();       
    }    

$('#btnUpload').click(function() {
    var bar = document.getElementById('progBar'),
        fallback = document.getElementById('downloadProgress'),
        loaded = 0;

    var load = function() {
        loaded += 1;
        bar.value = loaded;

        /* The below will be visible if the progress tag is not supported */
        $(fallback).empty().append("HTML5 progress tag not supported: ");
        $('#progUpdate').empty().append(loaded + "% loaded");

        if (loaded == 100) {
            clearInterval(beginLoad);
            $('#progUpdate').empty().append("Upload Complete");
            console.log('Load was performed.');
        }
    };

    var beginLoad = setInterval(function() {load();}, 50);

});

function searchNode() {

    svg.selectAll(".linePNodes").remove();
        
    searchTerm = document.getElementById('search').value;
    console.log("searchTerm="+searchTerm);
    valueSlider =1;
    handle.attr("cx", xScaleSlider(valueSlider));
    recompute();
}

function mouseoveredLink(l) {  
    if (force.alpha()==0) {
        // mouseovered(l.source);

        var term1 = l.source.name;
        var term2 = l.target.name;
        var list = {};
        list[term1] = l.source;
        list[term2] = l.target;
        
        var listCardId = [];
        var listTilte = [];
        var listTilte = [];
        var listEvidence = [];
        var listType = [];
        var listBoth = {};

        data2.forEach(function(d) { 
            var year = d.year;
            if (year==l.m){
                var list = d["Authors"].split(",");
                for (var i=0; i<list.length;i++){
                    if (term1==list[i]){
                        for (var j=0; j<list.length;j++){
                            if (term2==list[j]){
                                if (!listBoth[d.Title.substring(0,10)+"**"+d.Conference]){
                                    listCardId.push(d["CardId"]);
                                    listEvidence.push(d.Title+".  "+d["Authors"]);
                                    listTilte.push(d.Evidence);
                                    listType.push(d["Id"]);
                                    listBoth[d.Title.substring(0,10)+"**"+d.Conference] =1;
                                }
                            }    
                        }
                    }
                }
            }
        });
        
        var x1 = l.source.x;
        var x2 = l.target.x;
        var y1 = l.source.y;
        var y2 = l.target.y;
        var x3 = xStep+(x1+x2)/2+Math.abs(y1-y2)/2+10;
        var yGap = 12;
        var totalSize = yGap*listTilte.length;

        var tipData = new Object();
        tipData.x = x3;
        tipData.y = (y1+y2)/2;
        tipData.a = listTilte;
        for (var i=0; i<listTilte.length;i++){
            var y3 = (y1+y2)/2-totalSize/2+(i+0.5)*yGap;
            svg.append("text")
                .attr("class", "linkTilte")
                .attr("x", x3)
                .attr("y", y3)
                .text(listEvidence[i]+ " "+listType[i])
                .attr("dy", ".21em")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .style("font-weight", "bold")
                .style("text-anchor", "left")
                .style("fill", function(d) { 
                    return getColor(listType[i], 0); 
                 })
                .style("text-shadow", "1px 1px 0 rgba(200, 200, 200, 0.6");
        }
    
        svg.selectAll(".linkArc")
            .style("stroke-opacity", function(l2) {  
                if (l==l2)
                    return 1;
                else
                    return 0.05;
            });  

        svg.selectAll(".linePNodes")
            .style("stroke-opacity", 0.1);     
            
        nodeG.style("fill-opacity" , function(n) {  
            if (n.name== term1 || n.name== term2)
                return 1;
            else
              return 0.05;  
            }); 

         nodeG.transition().duration(500).attr("transform", function(n) {
                if (n.name== term1 || n.name== term2){
                    var newX =xStep+xScale(l.m);
                    return "translate(" + newX + "," + n.y + ")"
                }
                else{
                    return "translate(" + n.xConnected + "," + n.y + ")"
                }
            })        
    }     
} 
function mouseoutedLink(l) {
    if (force.alpha()==0) {
        svg.selectAll(".linkTilte").remove();
        svg.selectAll(".linkArc")
            .style("stroke-opacity" , 1);    
        nodeG.style("fill-opacity" , 1);  
        nodeG.transition().duration(500).attr("transform", function(n) {
            return "translate(" +n.xConnected + "," + n.y + ")"
        })  
        svg.selectAll(".linePNodes")
            .style("stroke-opacity", 1);  
             
    }
}   


function mouseovered(d) {
    if (force.alpha>0) return;
        var list = new Object();
        list[d.name] = new Object();

        svg.selectAll(".linkArc")
            .style("stroke-opacity" , function(l) {  
                if (l.source.name==d.name){
                    if (!list[l.target.name]){
                        list[l.target.name] = new Object();
                        list[l.target.name].count=1; 
                        list[l.target.name].year=l.m;  
                        list[l.target.name].linkcount=l.count;    
                    }    
                    else{
                        list[l.target.name].count++; 
                        if (l.count>list[l.target.name].linkcount){
                            list[l.target.name].linkcount = l.count;
                            list[l.target.name].year=l.m;  
                        }
                    }    
                    return 1;
                }  
                else if (l.target.name==d.name){
                    if (!list[l.source.name]){
                        list[l.source.name] = new Object();
                        list[l.source.name].count=1; 
                        list[l.source.name].year=l.m;  
                        list[l.source.name].linkcount=l.count;  
                    }    
                    else{
                        list[l.source.name].count++; 
                        if (l.count>list[l.source.name].linkcount){
                            list[l.source.name].linkcount = l.count;
                            list[l.source.name].year=l.m;  
                        } 
                    }    
                    return 1;
                }    
                else
                  return 0.01;  
         });

        svg.selectAll(".linePNodes")
            .style("stroke-opacity" , function(n) {  
                if (d==n)
                   return 1;
                return 0.01;  
         });

        
    

        nodeG.style("fill-opacity" , function(n) {  
            if (list[n.name])
                return 1;
            else
              return 0.1;  
            })
            .style("font-weight", function(n) { return d.name==n.name ? "bold" : ""; })  
        ;

        nodeG.transition().duration(500).attr("transform", function(n) {
            if (list[n.name] && n.name!=d.name){
                var newX =xStep+xScale(list[n.name].year);
                return "translate(" + newX + "," + n.y + ")"
            }
            else{
                return "translate(" + n.xConnected + "," + n.y + ")"
            }
        })
}    




function mouseouted(d) {
    if (force.alpha()==0) {
        nodeG.style("fill-opacity" , 1);
        svg.selectAll(".layerInfoVis")
            .style("fill-opacity" ,1);
        svg.selectAll(".layerVAST")
            .style("fill-opacity" ,1);
        svg.selectAll(".layerSciVis")
            .style("fill-opacity" ,1);
        svg.selectAll(".linkArc")
            .style("stroke-opacity" , 1);    
        svg.selectAll(".linePNodes")
            .style("stroke-opacity" , 1);            

        nodeG.style("font-weight", "")  ;
        nodeG.transition().duration(500).attr("transform", function(n) {
            return "translate(" +n.xConnected + "," + n.y + ")"
            
        })   
    }      
}

    // check if a node for a month m already exist.
    function isContainedChild(a, m) {
        if (a){
            for (var i=0; i<a.length;i++){
                var index = a[i];
                if (nodes[index].year==m)
                    return i;
            }
        }
        return -1;
    }

     // check if a node for a month m already exist.
    function isContainedInteger(a, m) {
        if (a){
            for (var i=0; i<a.length;i++){
                if (a[i]==m)
                    return i;
            }
        }
        return -1;
    }

    function linkArc(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy)/2;
        // return "M" + (xStep+d.source.x) + "," + d.source.y + " Q" + ((xStep+d.source.x)+dr) + "," + d.target.y+ " " + (xStep+d.target.x) + "," + d.target.y;
     
        if (d.source.y<d.target.y )
            return "M" + (xStep+d.source.x) + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + (xStep+d.target.x) + "," + d.target.y;
        else
            return "M" + (xStep+d.target.x) + "," + d.target.y + "A" + dr + "," + dr + " 0 0,1 " + (xStep+d.source.x) + "," + d.source.y;
    }



    function update(){
        nodes.forEach(function(d) {
            //if (searchTerm!="")
            //    d.x += (width/2-d.x)*0.02;
            //else
                d.x += (width/2-d.x)*0.005;
                     
            if  (d.parentNode>=0){
                d.y += (nodes[d.parentNode].y- d.y)*0.1;
            } 
            else if (d.childNodes){
                var yy = 0;
                for (var i=0; i< d.childNodes.length;i++){
                    var child = d.childNodes[i];
                    yy += nodes[child].y;
                }
                if (d.childNodes.length>0){
                    yy = yy/d.childNodes.length; // average y coordinate
                    d.y += (yy-d.y)*0.5;
                }
            }
        });    
        //if (document.getElementById("checkbox1").checked){
             linkArcs.style("stroke-width", 0);
            
            // nodeG.transition().duration(500).attr("transform", function(d) {
            //    return "translate(" + 200 + "," + d.y + ")"
           // })
           // svg.selectAll(".nodeText").style("text-anchor","start")
           
           
            yScale = d3.scale.linear()
            .range([0, 2])
            .domain([0, termMaxMax2]);
            nodeG.attr("transform", function(d) {
                return "translate(" + (xStep+d.x) + "," + d.y + ")"
            })
            linkArcs.style("stroke-width", function (d) {
                return d.value;
            });
        /*}
        else{
        
            yScale = d3.scale.linear()
            .range([0, 0])
            .domain([0, termMaxMax2]);
        

            nodeG.attr("transform", function(d) {
                return "translate(" + (xStep+d.x) + "," + d.y + ")"
            })
            linkArcs.style("stroke-width", function (d) {
                return d.value;
            });
         }   */ 
         
        linkArcs.attr("d", linkArc);
      //  if (force.alpha()<0.02)
      //     force.stop();
    } 

    function updateTransition(durationTime, timeY){  // timeY is the position of time legend
        nodes.forEach(function(d) {
           d.x=xScale(d.year);
            if (d.parentNode>=0)
                d.y= nodes[d.parentNode].y;
        });    


        var list = new Object();
        links.forEach(function(l) {  
            var m = l.m
            if (!list[l.target.name])
                list[l.target.name] = new Object();
            if (!list[l.target.name][m])
                list[l.target.name][m] = 0;
            list[l.target.name][m]++;
            
            if (!list[l.source.name])
                list[l.source.name] = new Object();
            if (!list[l.source.name][m])
                list[l.source.name][m] = 0;
            list[l.source.name][m]++;
         });
       

        nodeG.transition().duration(durationTime).attr("transform", function(d) {
           d.xConnected= xStep+ xScale(d.isConnectedMaxYear);     

           var minY=0; 
           for (var m=0; m<=maxYear-minYear;m++){
                if (list[d.name] && list[d.name][m]){
                    minY = m;
                    break;
                }
           }
           var maxY=0; 
           for (var m=0; m<=maxYear-minYear;m++){
                if (list[d.name] && list[d.name][m]){
                    maxY = m;
                }
           }
            d.minY = minY;
            d.maxY = maxY;
            d.xConnected = xStep+xScale(minY);
           return "translate(" +d.xConnected + "," + d.y + ")"
        })
        
        svg.selectAll(".linePNodes").transition().duration(durationTime)
            .attr("x1", function(d) {return xStep+xScale(d.minY);})
            .attr("y1", function(d) {return d.y;})
            .attr("x2", function(d) {return xStep+xScale(d.maxY);})
            .attr("y2", function(d) {return d.y;}); 

       // svg.selectAll(".timeLegend").transition().duration(durationTime)
       //     .attr("y", timeY/3)
        
        
        svg.selectAll(".nodeText").transition().duration(durationTime)
            .text(function(d) { return d.name; })
            .attr("dy", "3px"); 

        
        svg.selectAll(".layer").transition().duration(durationTime)
          .attr("d", function(d) { 
            for (var m=numYear-1; m>=0; m--){
                d.yearly[m].yNode = d.y;     // Copy node y coordinate
               // if (d.yearly[m].value==0)
               //     d.yearly.splice(m,1);
            }
            
        return area(d.yearly); }) ;
        
        svg.selectAll(".layerInfoVis").transition().duration(durationTime)
            .attr("d", function(d) { 
                for (var m=numYear-1; m>=0; m--){
                    d.InfoVis[m].yNode = d.y; 
               //     if (d.InfoVis[m].value==0)
               //         d.InfoVis.splice(m,1);
                        
                }
                return areaInfoVis(d.yearly); 
            }) ;
        svg.selectAll(".layerVAST").transition().duration(durationTime)
            .attr("d", function(d) { 
                for (var m=numYear-1; m>=0; m--){
                    d.VAST[m].yNode = d.y;     // Copy node y coordinate
               //      if (d.VAST[m].value==0)
                //   d.VAST.splice(m,1);
                }
               
          
                return areaVAST(d.yearly); 
            }) ;    

        svg.selectAll(".layerSciVis").transition().duration(durationTime)
            .attr("d", function(d) { 
                for (var m=numYear-1; m>=0; m--){
                    d.SciVis[m].yNode = d.y;     // Copy node y coordinate
               //    if (d.SciVis[m].value==0)
               //     d.SciVis.splice(m,1);
                }
                return areaSciVis(d.yearly); 
            }) ;  
        linkArcs.transition().duration(durationTime).attr("d", linkArc);     
    }    

    function detactTimeSeries(){
       // console.log("DetactTimeSeries ************************************" +data);
        nodeG.selectAll(".nodeText")
            .attr("font-size", "12px");
        var termArray = [];
        for (var i=0; i< numNode; i++) {
            var e =  {};
            e.y = nodes[i].y;
            e.nodeId = i;
            termArray.push(e);
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

        var step = 15;
        var totalH = termArray.length*step;
        for (var i=0; i< termArray.length; i++) {
            nodes[termArray[i].nodeId].y = (height-totalH)/2+ i*step;
        }
        force.stop();

        updateTransition(2000, height-4);
    }




