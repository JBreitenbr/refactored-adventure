let canvas=d3.select("#canvas");

let w=+d3.select("#canvas").style("width").slice(0,-2);
let h=+d3.select("#canvas").style("height").slice(0,-2); 

let pad=(3/35)*w;

let xScale=d3.scaleBand().domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13]).range([pad,w-pad]).padding(0);

let yScale = d3.scaleBand().domain(years).range([pad,h-pad]).padding(0);

let yAxis=d3.axisLeft(yScale).tickFormat(d3.format('d'));
/*
canvas.append('g').call(yAxis).attr('id','y-axis').attr('transform',"translate("+1.2*pad+",0)").style("font",`${(1/57)*h}px arial`);*/
let toolTip=d3.select("#tooltip");

let mouseover = (i)=>{
    toolTip.style("visibility","visible").html("Track: "+i[1]+"<br>" + "Artist: "+i[0]+"<br>"+"Release Year: "+i[2]+"<br>"+"Popularity (Spotify): "+i[3]+"<br>"+"Rank (Julia): "+i[7]).style("font","10px arial").style("color","yellow").style("border","1px solid yellow").style("background-color", "#363636").style("left","250px").style("top","0px");
}
let colorObj={};
colorObj[1]=d3.scaleSequential().interpolator(d3.interpolatePurples);
colorObj[2]=d3.scaleSequential().interpolator(d3.interpolateBlues);
colorObj[3]=d3.scaleSequential().interpolator(d3.interpolateGreens);
colorObj[4]=d3.scaleSequential().interpolator(d3.interpolateOranges);
colorObj[5]=d3.scaleSequential().interpolator(d3.interpolateReds);
colorObj[6]=d3.scaleSequential().interpolator(d3.interpolateYlOrBr);
for(let i=1; i<6;i++){
  colorObj[i].domain([0,100]);
}

let d=yScale(1965)-yScale(1964);
let c=yScale(2001);
for(let i=0; i<=26;i++){
canvas.append("text").text(years[i]).attr("x",7).attr("y",yScale(years[i])+0.73*d).style("font","12px arial").style("font-weight",500);
}
canvas.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 7)     // x position of the first end of the line
    .attr("y1", c)      // y position of the first end of the line
    .attr("x2", 300)     // x position of the second end of the line
    .attr("y2", c);
canvas.selectAll('circle')
      .data(spotiData)
      .enter()
      .append('circle')
      .attr('cx',(item)=>xScale(item[5])).attr('cy',(item)=>yScale(item[2])+0.5*d).attr('r',(item)=>item[4]/3.8).attr("fill",(item)=>colorObj[item[6]](item[3])).attr("stroke","black").attr("stroke-width",1).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")})


