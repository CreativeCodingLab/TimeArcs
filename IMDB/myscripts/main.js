//Constants for the SVG
var margin = {top: 0, right: 10, bottom: 5, left: 10};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;

//---End Insert------

//Append a SVG to the body of the html page. Assign this SVG as an object to svg

/*
var colorTitle = "#909";
var svg22 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", 120);
svg22.append("text")
    .attr("class", "textTitle")
    .attr("x", width/2-70)
    .attr("y", 60)
    .text("IEEE VIS co-authorship network of")
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
    .style("text-anchor", "middle")
    .style("fill", colorTitle);
svg22.append("text")
    .attr("class", "textTitle")
    .attr("x", width/2-70)
    .attr("y", 110)
    .text("the top 50 researchers between "+2006+" and 2014")
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
    .style("text-anchor", "middle")
    .style("fill", colorTitle);*/

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height); 

var topTermMode = 0;
//******************* Forced-directed layout    

//Set up the force layout
var force = d3.layout.force()
    .charge(-10)
    .linkDistance(0)
    .gravity(0.0)
    //.friction(0.5)
    .alpha(0.1)
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
        dsad

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

var minYear = 1990;
var maxYear = 2015;
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
//var xScale = d3.time.scale().range([0, (width-250)/numYear]);
var xStep = 140;
var yScale;
var linkScale;
//var searchTerm ="Munzner, T.";
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
     
var optArray = [];   // FOR search box
var numberInputTerms =0;
var listYear = [];

//d3.tsv("data/pcCombined3.tsv", function(error, data_) {
d3.tsv("data/VISpapers1990-2014.tsv", function(error, data_) {
//d3.tsv("data/imdb1.tsv", function(error, data_) {
//d3.tsv("data/imdb85_50.tsv", function(error, data_) {
//d3.tsv("data/PopCha.tsv", function(error, data_) {
    if (error) throw error;
    data = data_;
    
    terms = new Object();
    termMaxMax = 1;
    var cccc = 0;
    data.forEach(function(d) {
        var year = parseInt(d["Year"])-minYear;
        d.year = year;
        numberInputTerms++;
             
        var list = d["Author Names"].split(";");
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
    
    readTermsAndRelationships();
    computeNodes();
    computeLinks();
    
    drawLensingButton();

    force.linkStrength(function(l) {
        if (l.value)
            return (5+l.value*10);
        else 
            return 1;       
    });

    force.linkDistance(function(l) {
        if (searchTerm!=""){
            if (l.source.name == searchTerm || l.target.name == searchTerm){
                var order = isContainedInteger(listYear,l.m)
                return (30*order);  
            }    
            else
                return 0;    
        }
        else{
            if (l.count==1)
                return 1; 
            else if (l.count>1)
                return 0;
            else {
                return 10;     
            }          
        }
    });
   //throw new Error("Something went badly wrong!");
    
    
    /// The second force directed layout ***********
    /*
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
        selectedTime[0] = 1; linksList[0] = []; list5[0] ={};
        selectedTime[1] = 1; linksList[1] = []; list5[1] ={};
        selectedTime[2] = 1; linksList[2] = []; list5[2] ={};
        selectedTime[3] = 1; linksList[3] = []; list5[3] ={};
        selectedTime[4] = 1; linksList[4] = []; list5[4] ={};
        selectedTime[5] = 1; linksList[5] = []; list5[5] ={};
        selectedTime[6] = 1; linksList[6] = []; list5[6] ={};
        selectedTime[7] = 1; linksList[7] = []; list5[7] ={};
        selectedTime[8] = 1; linksList[8] = []; list5[8] ={};

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
            newl.type = l.type;
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
    }*/

    
    force.nodes(nodes)
        .links(links)
        .start(100,150,200);
   // runForceLayouts();
   
    force.on("tick", function () {
        update();
    });
    force.on("end", function () {
        detactTimeSeries();
    });

    
    setupSliderScale(svg);
    drawColorLegend();
    drawTimeLegend();
  
    

  console.log("*********** saveTimeArcsData ******************");
  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "CardId\tYear\tConference\tTitle\tEvidence\tAuthor Names\n"
 
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "aaaa.tsv");
  link.click(); // This will download the data file named "my_data.csv".

   console.log("*********** saveTimeArcsData2 ******************");
  


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
            var rating = parseFloat(d["Rating"]);
            var year = parseFloat(d["Year"]);
            var up = (year-minYear)/(maxYear-minYear);
           // if (rating>8.2){  //For IMDB ****************************************testing
                if (!searchTerm || searchTerm=="" ) {
                    return d;
                }
                else if (d[searchTerm])
                    return d;
         //   }
        });


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

        // IMDB
        removeList["Jone Doug (I)"] =1;
        removeList["Kaye, David (I)"] =1;
        removeList["Paulsen, Rob"] =1;
        removeList["Kenny, Tom (I)"] =1;
        removeList["Douglas, D.C."] =1;
        

        termArray = [];
        for (var att in terms) {
            var e =  {};
            e.term = att;
            if (removeList[e.term] || (searchTerm && searchTerm!="" && !selected[e.term])) // remove list **************
                continue;
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
        if (!searchTerm)
            numberInputTerms = termArray.length;
        
       console.log("Finish ordering terms: "+termArray.length) ; 
        
        
       
    // Compute relationship **********************************************************
        numNode2 = termArray.length;
        relationship ={};
        relationshipMaxMax =0;
       // rrr ={};
        ttt ={};
        data2.forEach(function(d) { 
            var year = d.year;
            var list = d["Author Names"].split(";");
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
                        ttt[term1+"__"+term2][year].push(d["Conference"]);
                   //     rrr[term1+"__"+term2][year][d["Conference"]+"**"+d["Title"].substring(0,10)] =[100];
                    }    
                    else{
                      //  if (!rrr[term1+"__"+term2][year][d["Conference"]+"**"+d["Title"].substring(0,10)]){
                            relationship[term1+"__"+term2][year]++;
                            ttt[term1+"__"+term2][year].push(d["Conference"]);
                        //    rrr[term1+"__"+term2][year][d["Conference"]+"**"+d["Title"].substring(0,10)]=100;
                        
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
        termArray.sort(function (a, b) {
          /*if (a.isConnected < b.isConnected) {
            return 1;
          }
          else if (a.isConnected > b.isConnected) {
            return -1;
          }
          else{*/
                if (a.max < b.max) 
                    return 1;
                else if (a.max > b.max) 
                    return -1;
                else 
                    return 0;
           // }
        });   
      
        numNode = Math.min(500, termArray.length);
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
                if (relationship[term1+"__"+term2] && relationship[term1+"__"+term2].max>=valueSlider){
                    var ordering =0;
                    for (var m=0; m<numYear;m++){
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

        console.log("pNodes.length="+pNodes.length);
        for (var i=pNodes.length-1; i>0;i--){
            if (pNodes[i].connect==undefined || pNodes[i].connect.length<1){
                 pNodes.splice(i, 1);
            }    
        }
        console.log("pNodes.length="+pNodes.length);

        var linearScale = d3.scale.linear()
            .range([0.3, 0.2])
            .domain([0, 500]);
        var hhh = Math.min(linearScale(numNode)*height/numNode,10);
        
        console.log("hhh="+hhh+" linearScale="+linearScale(numNode)+"    termMaxMax2="+termMaxMax2);
        yScale = d3.scale.linear()
            .range([0, hhh/200])
            .domain([0, termMaxMax2]);
        linkScale = d3.scale.linear()
            .range([0.2, 0.75])
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
               return getColor(d.type[0], 0);;     
            }
            else{
                return "#000";
            }
        })
        .style("stroke-width", function (d) {
            return d.value;
        });   
        
        svg.selectAll(".linkArc")
            .on('mouseover', mouseoveredLink)
            .on('mouseout', mouseoutedLink);

        
        svg.selectAll(".nodeG").remove();
        nodeG = svg.selectAll(".nodeG")
            .data(pNodes).enter().append("g")
            .attr("class", "nodeG")
         
        svg.selectAll(".nodeText").remove();
        
        /*
        nodeG.append("text")
            .attr("class", ".nodeText")  
            .text(function(d) { return d.name })           
            .attr("dy", ".35em")
            .style("fill","#000000")
            .style("fill-opacity",1)
            .style("text-anchor","end")
            .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 0.6")
            .style("font-weight", function(d) { return d.isSearchTerm ? "bold" : ""; })
            .attr("dy", ".21em")
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d) { 
                d.textSize = this.getComputedTextLength();    
                return d.isSearchTerm ? "10px" : "9px"; });
        */       
        


        svg.selectAll(".linePNodes").remove();
        linePNodes = svg.selectAll(".linePNodes")
            .data(pNodes).enter().append("line")//.transition().delay(durationTime).duration(durationTime)
            .attr("class", "linePNodes")
            .attr("x1", function(d) {return xStep+xScale(d.minY);})
            .attr("y1", function(d) {return d.y;})
            .attr("x2", function(d) {return xStep+xScale(d.maxY);})
            .attr("y2", function(d) {return d.y;})
            .style("stroke-width",0.2)
            .style("stroke-opacity",1)
            .style("stroke", "#000");  


        nodeG.on('mouseover', mouseovered)
               .on("mouseout", mouseouted); 
    

         // This is for linkDistance
        // console.log("gggg**************************"+searchTerm);
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
    valueSlider =1;
    handle.attr("cx", xScaleSlider(valueSlider));
    recompute();
}

function mouseoveredLink(l) {
    if (force.alpha()==0) {
        // mouseovered(l.source);
        var term1 = l.source.name;
        var term2 = l.target.name;

        var listCardId = [];
        var listTilte = [];
        var listType = [];
        var listBoth = {};
        data2.forEach(function(d) { 
            var year = d.year;
            if (year==l.m){
                var list = d["Author Names"].split(";");
                for (var i=0; i<list.length;i++){
                    if (term1==list[i]){
                        for (var j=0; j<list.length;j++){
                            if (term2==list[j]){
                                if (!listBoth[d.Title.substring(0,10)+"**"+d.Conference]){
                                    listCardId.push(d["CardId"]);
                                    listTilte.push(d.Title);
                                    listType.push(d.Conference);
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
        var yGap = 10;
        var totalSize = yGap*listTilte.length;
        for (var i=0; i<listTilte.length;i++){
            var y3 = (y1+y2)/2-totalSize/2+(i+0.5)*yGap;
            console.log("listCardId= "+listCardId);
            svg.append("text")
                .attr("class", "linkTilte")
                .attr("x", x3)
                .attr("y", y3)
                .text(listTilte[i])
                .attr("dy", ".21em")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .style("text-anchor", "left")
                //.style("fill", "#000000")
                .style("fill", function(d) { 
                    return getColor(listType[i], 0); 
                 })
                .style("text-shadow", "1px 1px 0 rgba(200, 200, 200, 0.6");
                //.style("font-weight", "bold");
        }
        svg.selectAll(".linkArc")
            .style("stroke-opacity", function(l2) {  
                if (l==l2)
                    return 1;
                else
                    return 0.1;
            });  
        nodeG.style("fill-opacity" , function(n) {  
            if (n.name== term1 || n.name== term2)
                return 1;
            else
              return 0.1;  
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
    }
}   
   

function mouseovered(d) {
    if (force.alpha()==0) {
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
            .style("stroke-opacity" , function(d2) {  
                if (d2.name==d.name){
                   return 1;
                }  
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

        svg.selectAll(".layerInfoVis")
            .style("fill-opacity" , function(n) {  
                if (list[n.name])
                    return 1;
                else
                  return 0.1;  
            });
        svg.selectAll(".layerVAST")
            .style("fill-opacity" , function(n) {  
                if (list[n.name])
                    return 1;
                else
                  return 0.1;  
            });
        svg.selectAll(".layerSciVis")
            .style("fill-opacity" , function(n) {  
                if (list[n.name])
                    return 1;
                else
                  return 0.1;  
            });   
    }                 
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
                d.x += (width/2-d.x)*0.01;
                     
            if  (d.parentNode>=0){
                d.y += (nodes[d.parentNode].y- d.y)*0.2;
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
        

        linkArcs.attr("d", linkArc);
        //  if (force.alpha()<0.02)
        //     force.stop();

        updateTimeLegend();       
    } 

    function updateTransition(durationTime){
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
           /*
           var current = d.isConnectedMaxYear
           for (var m=current-1; m>0;m--){
                if (list[d.name] && list[d.name][m]){
                    var xGap =  xScale(current-m);
                    if (xGap<d.textSize)
                        d.xConnected = xStep+xScale(m);
                    current = m;
                }
           }*/

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
           //console.log(d.textSize+" "+xScale());
           return "translate(" +d.xConnected + "," + d.y + ")"
        })
        
        //svg.selectAll(".linePNodes").remove();
        svg.selectAll(".linePNodes")
            //.data(pNodes).enter().append("line")
            .transition().duration(transTime)
            .attr("x1", function(d) {return xStep+xScale(d.minY);})
            .attr("y1", function(d) {return d.y;})
            .attr("x2", function(d) {return xStep+xScale(d.maxY);})
            .attr("y2", function(d) {return d.y;})
            .style("stroke-opacity", function(d){
               if (!isLensing)  return 1;
               else{
                if (listLensing[d.name])
                    return 1;
                else
                    return 0.5;
               }   
            }); 
       
        svg.selectAll(".nodeText").attr("x", function(d) {return xStep+d.x;})
                    .attr("y", function(d) {return d.y;});
   
        linkArcs.transition().duration(transTime)
            .attr("d", linkArc)
            .style("stroke-opacity", function(d){
               if (!isLensing)  return 1;
               else{
                if (listLensing[d.source.name] && listLensing[d.target.name])
                    return 1;
                else
                    return 0.1;
               }   
            });   

        updateTimeLegend();         
    }    

    function detactTimeSeries(){
        //console.log("DetactTimeSeries ************************************");
        computeY_Scale();
        updateTransition(2000);
}


