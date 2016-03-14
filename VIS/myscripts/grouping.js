function groupSimilarNodes(){
    if (document.getElementById("checkbox2").checked){
        nodeG.selectAll(".nodeText")
            .attr("font-size", "8px");

        //console.log("****** groupSimilarNodes *******");
        for (var i=0;i<pNodes.length;i++){
            pNodes[i].isProcessed = false;
        }
        // compute the list of similar nodes for each node
        console.log("Begin grouping ****");
        var array = [];
        for (var i=0;i<pNodes.length;i++){
            console.log(i+"/"+pNodes.length);
        
            var n1 = pNodes[i];
            if (!n1.isProcessed){
                //console.log("****** i="+i);
                n1.listOfSimilar = getSimilarNodes(n1);
                for (var j=0;j<n1.listOfSimilar.length;j++){
                    var n2 = n1.listOfSimilar[j];
                    n2.isProcessed = true;
                }   
                n1.isProcessed = true; 

                // Construct the list of leader
                array.push(n1);               
            }
        }  
        console.log("Begin sorting ****");
        array.sort(function (a, b) {
            if (a.y > b.y) {
                return 1;
            }
            if (a.y < b.y) {
                return -1;
            }
            return 0;
        });  

        // asign the Y position
        console.log("Begin asigning Y positions ****");
        var step = Math.min((height-20)/(pNodes.length+1),6);
        var currentY = 0;
        var gapY = step/5;
        for (var i=0;i<array.length;i++){
            var n1 = array[i];
            n1.y = currentY+step;
            // group name
            n1.groupName = n1.name;
            if (n1.listOfSimilar.length>0){   
                n1.groupName += "("+(n1.listOfSimilar.length+1)+")";    
            }
            for (var j=0;j<n1.listOfSimilar.length;j++){
                var n2 = n1.listOfSimilar[j];
                n2.y = n1.y+(j+1)*gapY;
            } 
            currentY = n1.y+ n1.listOfSimilar.length*gapY;     
        }  
        console.log("Begin transiting ****");
        updateTransition(2000,currentY+12);            
    }  
    else{
        detactTimeSeries();
    }
}

function isNodesSimilar(n1,n2) {
    for (var j=0;j<pNodes.length;j++){
        var n3 = pNodes[j];
        if (n3.name == n1.name || n3.name == n2.name) continue;
        if (relationship[n1.name+"__"+n3.name] && !relationship[n2.name+"__"+n3.name])
            return false;
        else if (!relationship[n1.name+"__"+n3.name] && relationship[n2.name+"__"+n3.name])
            return false;
    }    
    return true;
}    

function getSimilarNodes(n1) {
    var list = [];
    for (var i=0;i<pNodes.length;i++){
        var n2 = pNodes[i];
        if (!n2.isProcessed && n1.name != n2.name){  // Only compare Unprocessed nodes
            if (isNodesSimilar(n1,n2))
                list.push(n2);
        }
    }
    return list;
}    