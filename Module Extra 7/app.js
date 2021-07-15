// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { width: 500, height: 200, fullscreen: true };
var two = new Two(params).appendTo(elem);



var frame_objects=[]
var all_connecters=[]
var all_tops=[]
var all_bottoms=[]
var len = 250
for (let i = 0; i < len; i++){
    var pos_x = -len+i*30 -40
    var x = Math.PI/2*i/3
    var dist = 60
    var up = Math.round(Math.sin(x)*dist)
    var down = -Math.round(Math.sin(x)*dist)
    var connecter = two.makeRectangle(pos_x,300,10,up*2)
    connecter.fill="lightgray"
    connecter.stroke="gray"
    connecter.linewidth=3
    var size1 = 10//(up/40 + 10)/1
    var size2 = 10//(down/40 + 10)/1
    var circle_bottom = two.makeCircle(pos_x, 300 + down, size2)
    circle_bottom.fill = "orange"
    circle_bottom.stroke = "#cc5500"
    circle_bottom.linewidth = 3
    var circle_top = two.makeCircle(pos_x, 300 + up, size1)
    circle_top.fill = "red"
    circle_top.stroke = "darkred"
    circle_top.linewidth = 3
    // frame_objects.push(connecter, circle_top, circle_bottom)
    all_connecters.push(connecter)
    all_tops.push(circle_top)
    all_bottoms.push(circle_bottom)
}
// var group = two.makeGroup(frame_objects)

connecters = two.makeGroup(all_connecters)
tops = two.makeGroup(all_tops)
bottoms = two.makeGroup(all_bottoms)
console.log(connecters.getBoundingClientRect());
var n = 1
var target=12
two.bind('update', function(frameCount) {
    if (frameCount%10==0){
        connecters.translation.x+=n%target?30:-target*30
        tops.translation.x+=n%target?30:-target*30
        bottoms.translation.x+=n%target?30:-target*30
        // console.log(n);
        n++
        if (n==target+1){
            n=1
        }
    }
}).play();  // Finally, start the animation loop

two.update();
