/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
    
d3.json('./data/revenues.json').then(data => {
  console.log(data)

  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", "600")
    .attr("height", "400")
    .attr("style", "border: solid 1px black; padding: 5px")

  const g = svg
    .append("g")
    .attr("stroke", "black")

  const yAxis = d3
    .scaleLinear()
    .domain(
      d3.extent(data, function(d) {
        return d.revenue;
      })
    )
    .range([0, 360]);

  const xAxis = d3
    .scaleBand()
    .domain(data.map(d => d.month))
    .range([0, 600]);
  
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "red")
    .attr("x", function(d, i) {
      return (i - 1) * 100;
    })
    .attr("y", "365")
    .attr("width", "100")
    .attr("height", function(d) {
      return yAxis(d.revenue);
    })
    .attr("transform", function(d) {
      return `translate(0, -${yAxis(d.revenue)})`;
    });

  const leftAxis = d3.axisLeft(yAxis);
  g.append("g")
    .attr("class", "leftAxis")
    .call(leftAxis)

  const bottomAxis = d3.axisBottom(xAxis);
  g.append("g")
    .attr("class", "bottomAxis")
    .attr("transform", `translate(0, 365)`)
    .call(bottomAxis);
  
});
