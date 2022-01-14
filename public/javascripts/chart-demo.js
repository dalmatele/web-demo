function ChartDemo(){    
    this.highChart();
}

ChartDemo.prototype.constructor = ChartDemo;

ChartDemo.prototype.init = function(){
    
};

ChartDemo.prototype.draw = function(){
    var elem = d3.select("#finance-chart");    
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    // Set ranges
    var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
    var y = d3.scaleLinear()
    .range([height, 0]);
    var svg = elem.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Get data
    d3.csv("/javascripts/data.csv").then(function(data) {        
        // Format        
        data.forEach(function(d) {
            d.amounts = +d.amounts;
        });
        x.domain(data.map(function(d){return d.name;}));
        y.domain([0, d3.max(data, function(d){return d.amounts;})]);
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d){return x(d.name);})
            .attr("width", x.bandwidth())
            .attr("y", function(d){return y(d.amounts);})
            .attr("height", function(d){return height - y(d.amounts);});
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        svg.append("g")
            .call(d3.axisLeft(y));
    });    
}

ChartDemo.prototype.draw2 = async function(){
    // const data = await d3.csv("/javascripts/data2.csv");
    // const data = await d3.csv("/javascripts/data2.csv", (d) => {
    //     return d;
    // });
    var elem = d3.select("#finance-chart-2"); 
    var data = [23, 13, 21, 14, 37, 15, 18, 34, 30];
    var svg = elem.append("svg")
                .attr("height", "100%")
                .attr("width", "100%");
    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("height", function(d, i){
            return d;
        })
        .attr("width", "40")
        .attr("x", function(d, i){
            return i * 60 + 25;
        })
        .attr("y", function(d, i){
            // return 50;
            return 50;
        });
    svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .text(function(d){return d;})
        .attr("x", function(d, i){
            return i * 60 + 36;
        })
        .attr("y", function(d, i){
            return 65;
        });
}

ChartDemo.prototype.highChart = async function(){
    var data = [];
    data.push([15, 30, 20, 10, 25]);
    data.push([10, 30, 25, 10, 25]);
    data.push([15, 25, 20, 15, 25]);
    data.push([15, 30, 24, 10, 21]);
    data.push([15, 27, 23, 18, 27]);
    data.push([11, 34, 20, 10, 25]);
    data.push([20, 30, 10, 20, 20]);
    data.push([17, 28, 19, 11, 25]);
    data.push([15, 30, 29, 1, 25]);
    data.push([7, 38, 20, 10, 25]);
    const chart = Highcharts.chart("highchart", {
        chart: {
            type: "bar"
        },
        // events: {
        //     load: function(){
        //         var series = this.series[0];
        //         setInterval(function(){
        //             var y = Math.random();
        //             series
        //         });
        //     }
        // },
        title: {
            text: "Hello world"
        },
        xAxis: {
            categories: ['Stock', "Coin", "Product", "Land", "Other"]
        },
        yAxis: {
            visible: false
        },
        legend: {
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF"
        },
        series: [
            {                
                data: data[0]
            }
        ],
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    inside: true,
                    position: "right",                    
                },
                pointPadding: 0,
                groupPadding: 0,
                colorByPoint: true
            },
            series: {
                dataLabels: {
                    format: "{y} %"
                }
            }
        }
    });
    $("#high-chart-button").on("click", function(){
        var data = [];
        for(var i = 0; i <= 5; i++){
            data.push({
                y: Math.floor(Math.random() * 100 + 1),
                // color: "blue"
            });
        }
        chart.series[0].setData(data);
        // chart.viewData();
    });
    $("#finance-slider").slider({
        range: false,
        animate: "slow",
        min: 0,
        max: 4.5,
        value: 0,//current position of slider
        step: 0.5,
        slide: function(event, ui){
            $("#amount").val(ui.value); 
            var index = ui.value / 0.5;
            console.log(index);
            chart.series[0].setData(data[index]);
            // chart.viewData();           
        }
    });    
    // setInterval(function(){
    //     // var data = [];        
    //     var i;
    //     for(i = 0; i <= 5; i++){
    //         // data.push({
    //         //     y: Math.random()
    //         // });
    //         chart.series[0].update(
    //             {
    //                 data: Math.random()
    //             },
    //             true
    //         );
    //     };        
    // }, 2000)
}

