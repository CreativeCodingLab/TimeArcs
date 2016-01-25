
var data3;

d3.json("data/cards-for-time-arcs.json", function(error, data_) {
    data3 = data_;

}) 
 
function saveTimeArcsData() {
  console.log("*********** saveTimeArcsData ******************");
  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "CardId\tYear\tConference\tTitle\tEvidence\tAuthor Names\n"
 
  data3.forEach(function(d, index){
      
     var a = d.card.extracted_information.participant_a.entity_text;
     var b = d.card.extracted_information.participant_b.entity_text;
     var e = "";
     if (d.card.evidence){
        for (var i=0;i<1;i++){
            e+= " "+d.card.evidence[i];
        }   
     }
     if (d.card._participant_b_ids.length>1){
      //  console.log("**** index="+index);
     }
     var type = d.card.extracted_information.interaction_type;
     var year = d.metadata.articleFront["article-meta"][0]["pub-date"][0].year;
     var title = d.metadata.articleFront["article-meta"][0]["title-group"][0]["article-title"][0];
        
    if (a!=undefined && b!=undefined){   
        var title2 = title+"";
        if (title2.indexOf("[object Object]") > -1){
            title2 = title["_"];
        }
        if (title2.indexOf("Interaction with") > -1)
            console.l
        dataString = d.card.pmc_id+"\t"+year+"\t"+type+"\t"+(title2+"").replace(/(\r\n|\n|\r)/gm,"")+"\t"+e+"\t"+a +";"+b;
        csvContent += dataString+ "\n";
    }
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "FriesCards.tsv");
  link.click(); // This will download the data file named "my_data.csv".
}