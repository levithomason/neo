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


// graph element styles
var style = {
    'country': {
        'radius': 50
    },
    'people': {
        'radius': 30
    },
    'newCircle': {
        'radius': 40
    }
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
 * RESTful API Cypher Queries
 **********************************************************************************************************/

var cypher = {
    'all_nodes': {
        "query": "START n=node(*) RETURN n",
        "params": {
        }
    },
    'countries': {
        "query": "START category=node:Category(category='Country') MATCH category--country RETURN country",
        "params": {
        }
    },
    'people': {
        "query": "START category=node:Category(category='Person') MATCH category--person RETURN person",
        "params": {
        }
    },
    'all_relationships': {
        "query": "START r=relationship(*) RETURN r",
        "params": {
        }
    },
    'is_from': {
        "query": "START country=node(*) MATCH person-[r:IS_FROM]->country RETURN r",
        "params": {
        }
    }
};

var getPeople = function() {
    var people = {};

    var jqxhr_people = $.post("http://localhost:7474/db/data/cypher", cypher.people, function() {
        var json = $.parseJSON(jqxhr_people.responseText);
        var person;
        //console.log(json.data);

        for (var i in json.data) {
            person = json.data[i][0].data;
            person['id'] = json.data[i][0].self;

            people[person['name']] = person;
        }
        console.log('Got people:');
        console.log(people);
    });

    return people;

};

var getCountries = function() {
    var countries = {};

    var jqxhr_countries = $.post("http://localhost:7474/db/data/cypher", cypher.countries, function() {
        var json = $.parseJSON(jqxhr_countries.responseText);
        var country;
        //console.log(json.data);

        for (var i in json.data) {
            country = json.data[i][0].data;
            country['id'] = json.data[i][0].self;

            countries[country['name']] = country;
        }
        console.log('Got countries:');
        console.log(countries);

    });

    return countries;
};

var getRelationships = function() {
    var relationships = {};

    var jqxhr_relationships = $.post("http://localhost:7474/db/data/cypher", cypher.is_from, function() {
        var json = $.parseJSON(jqxhr_relationships.responseText);
        var relationship;

        //console.log(json.data);

        for (var i in json.data) {
            var r = json.data[i][0];

            relationship = {
                'id': r.self,
                'type': r.type,
                'start': r.start,
                'end': r.end
            };

            relationships['rel' + i] = relationship;
        }
        console.log('Got relationships:');
        console.log(relationships);
    });

    return relationships;
};


/**********************************************************************************************************
 * D3 Graph
 **********************************************************************************************************/
var d3Init = function() {
    return d3.select('#stage').append('svg');
};

var d3Draw = function() {
    console.log('getting data for draw');
    var people = getPeople();
    console.log(people);
    var countries = getCountries();
    console.log(countries);
    var relationships = getRelationships();
    console.log(relationships);

    if ($.isEmptyObject(countries) && $.isEmptyObject(people)) {
        $('#stage').append(
            '<div id="no_data_message"> python ./manage.py mkdata == some action :-)</div>'
        )

    } else {
        var group;
        var circle;
        var text;
        var r;
        var x;
        var y;

        for (var country in countries) {
            r = style.country.radius;

            group = graph.append('g');
            circle = group.append('circle');
            text = group.append('text');

            x = helpers.random.range(0, 1, r / svg.clientWidth) * 100;
            y = helpers.random.range(0, 1, r / svg.clientHeight) * 100;

            group
                .attr('class', 'group country');

            circle
                .attr('class', 'node country')
                .attr('r', r)
                .attr('cx', x + "%")
                .attr('cy', y + "%");

            text
                .attr('class', 'label country')
                .attr('dx', x + "%")
                .attr('dy', y + "%")
                .text(countries[country].name);
        }

        for (var person in people) {
            r = style.people.radius;

            group = graph.append('g');
            circle = group.append('circle');
            text = group.append('text');

            x = helpers.random.range(0, 1, r / svg.clientWidth) * 100;
            y = helpers.random.range(0, 1, r / svg.clientHeight) * 100;

            group
                .attr('class', 'group person');

            circle
                .attr('class', 'node person')
                .attr('r', r)
                .attr('cx', x + "%")
                .attr('cy', y + "%");

            text
                .attr('class', 'label person')
                .attr('dx', x + "%")
                .attr('dy', y + "%")
                .text(people[person].name);
        }
    }
};


/**********************************************************************************************************
 * Ready
 **********************************************************************************************************/

$(document).ready(function() {

    /***********************************************************************
     * Init D3
     ***********************************************************************/
    console.log('calling init');
    var graph = d3Init();
    var svg = graph[0][0];
    console.log('calling draw');
    d3Draw();


    /*
     Click - add new item
     */
    $('#stage')
        .mousedown(function(e) {
            // left click
            if (e.which === 1) {
                var offset = $(this).offset();

                var mouseX = e.clientX - offset.left;
                var mouseY = e.clientY - offset.top;

                var circle = graph.append("circle");

                circle
                    .attr('class', 'new_cirlce dragging')
                    .attr('r', style.newCircle.radius)
                    .attr('cx', mouseX)
                    .attr('cy', mouseY)
                    .style('fill', 'transparent')
                    .style('stroke', '#749974')
                    .style('stroke-width', '4px');
            }
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


/*********************************************************************************************
  old stuff for reference
==============================================================================================


// load all countries / citizens via dom element json
var jsonPeople = $('.json.people').html();
var jsonCountries = $('.json.countries').html();

var DOMPeopple = $.parseJSON(jsonPeople);
var DOMCountries = $.parseJSON(jsonCountries);


// Initial d3 testing
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
 *********************************************************************************************/