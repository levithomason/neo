/**********************************************************************************************************
 * Utils
 **********************************************************************************************************/

// mouse down tracking
var mouseDown;
document.body.onmousedown = function() {
    mouseDown = true;
};
document.body.onmouseup = function() {
    mouseDown = false;
};


/**********************************************************************************************************
 * Helpers
 **********************************************************************************************************/

var helpers;

helpers = {
    'random': {
        'range': function(min, max, gutter) {
            gutter = (typeof gutter === "undefined") ? 0 : gutter;

            return Math.random() * ((max - gutter) - (min + gutter)) + min + gutter;
        }
    }
};


/**********************************************************************************************************
 * Ready
 **********************************************************************************************************/

$(document).ready(function() {

    /*
    Setup d3
     */
    var graph = d3.select('#stage').append('svg');
    var svg = graph[0][0];

    /*
     load all countries / citizens
     */
    var jsonPeople = $('.json.people').html();
    var jsonCountries = $('.json.countries').html();
    
    var people = $.parseJSON(jsonPeople);
    var countries = $.parseJSON(jsonCountries);

    var styleCountry = {
        'radius': 30
    };

    var stylePerson = {
        'radius': 15
    };

    /*
    Create country / person elements
     */
    var circle;
    var r;
    var x;
    var y;
    
    for (var country in countries) {
        r = styleCountry.radius;

        circle = graph.append('circle');

        x = helpers.random.range(0, 1, r / svg.clientWidth) * 100;
        y = helpers.random.range(0, 1, r / svg.clientHeight) * 100;

        circle
            .attr('class', 'node country')
            .attr('r', r)
            .attr('cx', x + "%")
            .attr('cy', y + "%");
    }
    
    for (var person in countries) {
        r = stylePerson.radius;

        circle = graph.append('circle');

        x = helpers.random.range(0, 1, r / svg.clientWidth) * 100;
        y = helpers.random.range(0, 1, r / svg.clientHeight) * 100;

        circle
            .attr('class', 'node person')
            .attr('r', r)
            .attr('cx', x + "%")
            .attr('cy', y + "%");
    }

    /*
     Click - add new item
     */
    $('#stage')
        .mousedown(function(e) {
            var offset = $(this).offset();

            var mouseX = e.clientX - offset.left;
            var mouseY = e.clientY - offset.top;

            var circle = graph.append("circle");

            circle
                .attr('class', 'new_cirlce dragging')
                .attr('r', 20)
                .attr('cx', mouseX)
                .attr('cy', mouseY)
                .style('fill', 'transparent')
                .style('stroke', '#749974')
                .style('stroke-width', '4px');
            
            console.log(circle[0][0]);
        })
        .mousemove(function(e) {
            var offset = $(this).offset();

            var mouseX = e.clientX - offset.left;
            var mouseY = e.clientY - offset.top;

            if (mouseDown) {
                d3.selectAll('.new_cirlce.dragging')
                    .attr('cx', mouseX)
                    .attr('cy', mouseY);
            }
        })
        .mouseup(function(e) {
            var offset = $(this).offset();

            var mouseX = e.clientX - offset.left;
            var mouseY = e.clientY - offset.top;

            d3.selectAll('.new_cirlce.dragging')
                .attr('class', 'new_circle')
                .attr('cx', mouseX)
                .attr('cy', mouseY)
                .style('fill', '#AAAAAA')
                .style('stroke', 'transparent')
                .style('stroke-width', '0');
        });

    /*
     force directed layout TODO: this is not working yet, check docs
     */
    var nodes = [];
    var links = [];

    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([graph.width, graph.height])
        .start();

    force.on("tick", function() {
        //console.log('its ticking!');
    });

});


///////////////////////////////// old stuff for reference //////////////////////////////////////

var generate_random = function() {
    var g = d3.select('#stage').append('svg');

    var dataset = [];

    for (var i=5; i<=20; i++) {
        dataset.push(Math.floor(Math.random()*100));
    }

    var max = d3.max(dataset);
    var min = d3.min(dataset);
    var loop = 0;

    graph.selectAll("circle")
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
