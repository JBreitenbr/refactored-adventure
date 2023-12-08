let canvas=d3.select("#canvas");

let w=+d3.select("#canvas").style("width").slice(0,-2);
let h=+d3.select("#canvas").style("height").slice(0,-2); 

let pad=(3/35)*w;

let xScale=d3.scaleLinear().domain([0,1]).range([pad,w-pad]);

let yScale = d3.scaleLinear().domain([0,1]).range([h-pad,pad]);

let yAxis=d3.axisLeft(yScale);
let xAxis=d3.axisBottom(xScale);

canvas.append('g').call(yAxis).attr('id','y-axis').attr('transform',"translate("+pad+",0)").style("font",`${(1/57)*h}px arial`);
canvas.append('g').call(xAxis).attr('id','x-axis').attr('transform',"translate(0,"+(h-pad)+")").style("font","10px arial");
let toolTip=d3.select("#tooltip");
  let mouseover = (i)=>{  toolTip.style("visibility","visible").html("Track: "+i[0]+"<br>" + "Artist: "+i[1]+"<br>"+"Release Year: "+i[4]+"<br>"+"Popularity (Spotify): "+i[2]+"<br>"+"Rank (Julia): "+i[24]+"<br>"+ "Energy: "+i[6]+"<br>"+"Valence: "+i[14]).style("font","10px arial").style("color","yellow").style("border","1px solid yellow").style("background-color", "#363636").style("left","250px").style("top","0px");
}
let colorObj={};
colorObj[1]=d3.scaleSequential().interpolator(d3.interpolatePurples);
colorObj[2]=d3.scaleSequential().interpolator(d3.interpolateBlues);
colorObj[3]=d3.scaleSequential().interpolator(d3.interpolateGreens);
colorObj[4]=d3.scaleSequential().interpolator(d3.interpolateOranges);
colorObj[5]=d3.scaleSequential().interpolator(d3.interpolateReds);
colorObj[6]=d3.scaleSequential().interpolator(d3.interpolateGreys);
colorObj[7]=d3.scaleSequential().interpolator(d3.interpolateYlOrBr);
for(let i=1; i<7;i++){
  colorObj[i].domain([0,100]);
}

canvas.selectAll('circle')
      .data(top100)
      .enter()
      .append('circle')
      .attr('cx',(item)=>xScale(item[6])).attr('cy',(item)=>yScale(item[14])).attr('r',(item)=>item[25]/3.8).attr("fill",(item)=>colorObj[item[27]](item[2])).attr("stroke","black").attr("stroke-width",1).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")})