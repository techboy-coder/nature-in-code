function main(){

    const N_CLONES = 100
    const a1_prob = 0.5
    const a2_prob = 1 - a1_prob
    const N_GEN = 1
    const D = 1
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
    console.log(JSON.stringify(grid));
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function random_position(x,y){
        return [x + getRandomInt(-D,D), y + getRandomInt(-D,D)]
    }
    draw_grid(new Array(gridx).fill(new Array(gridy)))

    //INIT Done
    for (let i = 0; i <N_GEN; i++){
        var visual = []
        var new_grid=[]
        for (let j = 0; j < grid.length; j++){
            var [x,y]=random_position(grid[j].x, grid[j].y)
            var your_mate = grid.filter((el)=>{
                return el.x == x && el.y == y;
            })
            var {v1,v2}=grid[j]
            var pos=[[v1,your_mate[0].v1],[v1, your_mate[0].v2],[v2,your_mate[0].v1],[v2,your_mate[0].v2]]
            var combinations = pos[Math.floor(Math.random() * pos.length)]
            var offspring = {x:grid[j].x,y:grid[j].y,v1: combinations[0], v2: combinations[1]}
            new_grid.push(offspring)
        }
        grid=new_grid
        
    }


}
main()
// console.log(JSON.stringify(visual));
// draw_grid(visual)


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