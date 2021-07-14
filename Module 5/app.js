const N_CLONES = 600
const a1_prob = 0.5
const a2_prob = 1 - a1_prob
const N_GEN = 100
const D = 5
const gridx = Math.round(Math.sqrt(N_CLONES)) * Math.round(Math.sqrt(N_CLONES))==N_CLONES?Math.round(Math.sqrt(N_CLONES)) : Math.round(Math.sqrt(N_CLONES))+1
const gridy = Math.round(Math.sqrt(N_CLONES)) * Math.round(Math.sqrt(N_CLONES))==N_CLONES?Math.round(Math.sqrt(N_CLONES)) : Math.round(Math.sqrt(N_CLONES))+1

var grid = [...Array(gridx*gridy).keys()]

let count = 0
for (let i = 0; i < gridx; i++){
    for (let j = 0; j < gridy; j++){
        grid[count] = {x: i, y: j}
        count++
    }
}

for (let i = 0; i < N_CLONES; i++){
    if (Math.random() < a1_prob){
        grid[i].v1 = 1
        if (Math.random() < a1_prob){
            grid[i].v2 = 1
        }else{
            grid[i].v2 = 2
        }
    }else{
        grid[i].v1 = 2
        if (Math.random() < a1_prob){
            grid[i].v2 = 1
        }else{
            grid[i].v2 = 2
        }
    }
}

//INIT Done

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move(x,y){
    return [x + getRandomInt(-D,D), y + getRandomInt(-D,D)]
}


var a1a1_data = []
var a1a2_data = []
var a2a2_data = []
var g;
for (let i = 0; i < N_GEN; i++){
    g = grid.map((item)=>{
        const [x,y]=move(item.x, item.y)
        item.x = x
        item.y = y
        return item
    })
    var new_grid = []
    for (let j = 0; j < N_CLONES; j++){
        var {x,y,v1,v2}=g[j]
        var possible_mates = g.filter((el)=>{
            return Math.abs(el.x - x)<=D && Math.abs(el.y - y)<=D
        })
        var the_mate = possible_mates[Math.floor(Math.random() * possible_mates.length)];
        var combinations = [[v1,the_mate.v1],[v1, the_mate.v2],[v2,the_mate.v1],[v2,the_mate.v2]][Math.floor(Math.random() * [[v1,the_mate.v1],[v1, the_mate.v2],[v2,the_mate.v1],[v2,the_mate.v2]].length)];
        var offspring = {x:x,y:y,v1: combinations[0], v2: combinations[1]}
        new_grid.push(offspring)
    }
    g = new_grid
    var a1a1 = g.filter((el)=>{
        return el.v1 == 1 && el.v2 == 1
    })
    var a1a2 = g.filter((el)=>{
        return (el.v1 == 1 && el.v2 == 2) || (el.v1 == 2 && el.v2 == 1)
    })
    var a2a2 = g.filter((el)=>{
        return el.v1 == 2 && el.v2 == 2
    })
    a1a1_data.push(a1a1.length)
    a1a2_data.push(a1a2.length)
    a2a2_data.push(a2a2.length)
}


console.log(a1a1_data,a1a2_data,a2a2_data);

// const ctx = document.getElementById('myChart').getContext('2d');

// const chart = new Chart(ctx, {
// type: 'line',
// data: {
//     labels: [...Array(N_GEN).keys()],
//     datasets: [{
//         label: 'Number of a1a1',
//         data: a1a1_data,
//         borderWidth: 1,
//         fill: false,
//         borderColor: 'red'
//     },
//     {
//         label: 'Number of a1a2',
//         data: a1a2_data,
//         borderWidth: 1,
//         fill: false,
//         borderColor: 'green'
//     },
//     {
//         label: 'Number of a2a2',
//         data: a2a2_data,
//         borderWidth: 1,
//         fill: false,
//         borderColor: 'blue'
//     },
    
//     ]
// },
// options: {
//     scales: {
//     yAxes: [{
//         ticks: {
//         beginAtZero: true
//         }
//     }],
//     y: {
//         display: true,
//         type: 'logarithmic',
//     }
//     }
// }
// });











































// var ctx = document.getElementById('myChart').getContext('2d');


// var a1_data = {
//     label: "A1",
//     data: arr_a1,
//     lineTension: 0.5,
//     fill: false,
//     borderColor: 'red',
//     borderWidth: 0.8
// }
// var a2_data = {
//     label: "A2",
//     data: arr_a2,
//     lineTension: 0.5,
//     fill: false,
//     borderColor: 'blue',
//     borderWidth: 1.5
// }

// const data = {
//     labels: [...Array(gen).keys()],
//     datasets: [a1_data, a2_data]
//   };


// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: data,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         bezierCurve: true
//     }
// });
// myChart.update() 
// }