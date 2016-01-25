
var data;

d3.json("data/cards-for-time-arcs.json", function(error, data_) {
    data = data_;

}) 
 
function saveTimeArcsData() {
  console.log("*********** saveTimeArcsData ******************");
  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "CardId\tYear\tConference\tTitle\tAuthor Names\n"
  console.log("links2.length="+data.length);

  data.forEach(function(d, index){
      
     var a = d.card.extracted_information.participant_a.entity_text;
     var b = d.card.extracted_information.participant_b.entity_text;
     var e = "";
     if (d.card.evidence){
        for (var i=0;i<1;i++){
            e+= " "+d.card.evidence[i];
        }   
     }
     if (d.card._participant_b_ids.length>1){
        console.log("**** index="+index);
    
     }
     var type = d.card.extracted_information.interaction_type;
     var year = d.metadata.articleFront["article-meta"][0]["pub-date"][0].year;
        
     dataString = d.card.pmc_id+"\t"+year+"\t"+type+"\t"+e+"\t"+a +";"+b;
     csvContent += index < data.length ? dataString+ "\n" : dataString;
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "pc.tsv");
  link.click(); // This will download the data file named "my_data.csv".
}