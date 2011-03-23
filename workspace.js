var paper = Raphael("world", 800, 600);

var c = paper.circle(300, 50, 20).attr('fill', 'yellow');
c.aaa = 'c';

var c1 = paper.circle(100, 100, 20).attr('fill', 'red');
c1.aaa = 'c1';
var c2 = paper.circle(200, 200, 20).attr('fill', 'blue');
c2.aaa = 'c2';

var p1 = paper.path('M100 100L150 150').attr('stroke-width', '5');
var p2 = paper.path('M150 150L200 200').attr('stroke-width', '5');
p1.aaa = 'p1';
p2.aaa = 'p2';

var st1 = paper.set();
st1.push(p1, p2);

var st = paper.set();
st.push(c1, c2, st1);
st.click(function(e) {
    console.log(this.aaa);
});

//st1.remove();

c.click(function(e) {
    console.log(this.aaa);
});

//paper.joint(c1, c2);

function drawBBox(el) {
    var bbox = el.getBBox();
    return paper.rect(bbox.x, bbox.y, bbox.width, bbox.height).attr('stroke', 'red');
}

//var head = paper.path('M300 300L420 250L430 270z').attr('stroke-width', '2');
var head = paper.rect(300, 300, 200, 10).attr('stroke-width', '2');
head.rotate(-30);
var bbox = drawBBox(head);
//bbox.rotate(-20);

//paper.click(function() {
//    alert('paper clicked');
//});

console.log(JSON.stringify(head.getBBox()));

var p = paper.path('M150 150L200 200L300 300L300 350').attr('stroke-width', '5');

c.drag(
    function(dx, dy, x, y, evt) {
//        console.log(dx, dy, x, y);
        var pos = {};
        pos[this.type == 'rect' ? 'x' : 'cx'] = x;
        pos[this.type == 'rect' ? 'y' : 'cy'] = y;
        this.attr(pos);
    },
    function(x, y, evt) {
    },
    function(evt) {
        
    });

c.onDragOver(function() {
    console.log('over element');
});