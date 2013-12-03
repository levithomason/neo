///////////////////////////////// new stuff //////////////////////////////////////

$(document).ready(function() {

    var canvas = d3.select('#stage').append('svg');


    $('#stage').click(function(e) {
        var offset = $(this).offset();

        c = canvas.append("circle");

        c.attr('r', 100);
        c.attr('cx', e.clientX - offset.left);
        c.attr('cy', e.clientY - offset.top);
    });
});


///////////////////////////////// old stuff for reference //////////////////////////////////////

var generate_random = function() {
    var canvas = d3.select('#stage').append('svg');

    var dataset = [];

    for (var i=5; i<=20; i++) {
        dataset.push(Math.floor(Math.random()*100));
    }

    var max = d3.max(dataset);
    var min = d3.min(dataset);
    var loop = 0;

    canvas.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle");

    var circles = d3.selectAll("circle");
    console.log(circles);

    d3.selectAll("circle")
        .attr('r', function(d) {
            return d;
        })
        .attr('cx', function(d) {
            var ceiling = max / 0.8;
            var floor = 0;
            return (d / ceiling + floor) * 100 + "%";
        })
        .attr('cy', function(d) {
            var ceiling = max / 0.6;
            var floor = 0.1;
            return (1 - (d / ceiling + floor)) * 100 + "%";
        })
        .attr('fill', function(d) {
            return "#" + d + d + d;
        });
};
