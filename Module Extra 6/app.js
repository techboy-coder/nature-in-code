function main(){

    const N_CLONES = 45**2
    const N_GEN = 50000
    const infect_rate = 0.0002
    const initial_infection_rate = 0.001
    const transmission_rate = 0.7
    const vaccine_transmission_rate = 0.01
    const vaccine_taking_rate = 0.00003
    const double_days = 4
    const infected_time = 10
    const post_time=13
    const vaccine_shield_days = 360
    const D = 3
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
        if (Math.random() < initial_infection_rate){
            grid[i].type = "infected"
            grid[i].infected_time = 0
            grid[i].vaccine_days=0
            grid[i].double_days=0
        }else{
            grid[i].type = "neutral"
            grid[i].infected_time = 0
            grid[i].vaccine_days=0
            grid[i].double_days=0

        }
    }
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
        setTimeout(()=>{
            document.getElementById("day_count").innerHTML = `${i}/${N_GEN}`
            var visual = []
            var new_grid=[]
            for (let j = 0; j < grid.length; j++){
                while (true) {
                    var [x,y]=random_position(grid[j].x, grid[j].y)
                    var your_mate = grid.filter((el)=>{
                        return el.x == x && el.y == y;
                    })
                    if (your_mate[0]){
                        break
                    }
                }
                your_mate=your_mate[0]
                // console.log(JSON.stringify(your_mate));
                var you = grid[j]
                if (Math.random() < infect_rate && you.type == "neutral"){
                    you.type = "infected"
                }
                if (your_mate.type == "infected" && you.type=="neutral" && Math.random() < transmission_rate){
                    you.type = "infected"
                }
                // if (your_mate.type == "infected" && you.type=="infected"){
                //     you.type = "double"
                // }
                // TODo
                if (you.type=="double"){
                    you.double_days++
                    if (you.double_days==double_days){
                        you.type="unneutral"
                        you.double_days=0
                    }
                }
                if (your_mate.type == "infected" && you.type=="vaccine" && Math.random() < vaccine_transmission_rate){
                    you.type = "infected"
                }
                if (Math.random() < infect_rate && you.type == "unneutral"){
                    you.type = "infected"
                }
                if (your_mate.type == "infected" && you.type=="unneutral" && Math.random() < transmission_rate){
                    you.type = "infected"
                }
                if (you.type == "infected"){
                    you.infected_time++
                }
                if (you.type == "infected" && you.infected_time == infected_time){
                    you.type = "post"
                }
                if (you.type =="post"){
                    you.infected_time++

                    if (you.infected_time==infected_time+post_time){
                        you.type = "unneutral"
                        you.infected_time=0
                    }
                }
                if (Math.random() < vaccine_taking_rate){
                    you.type = "vaccine"
                    you.infected_time=0
                }
                if (you.type == "vaccine"){
                    you.vaccine_days++
                }
                if (you.vaccine_days == vaccine_shield_days){
                    you.type = "neutral"
                    you.vaccine_days=0
                    you.infected_time=0
                }
                new_grid.push(you)

            }
            grid=new_grid
            var visual = []
            for (let i = 0; i < gridx; i++){
                var row = []
                for (let j = 0; j < gridy; j++){
                    var el = grid.filter((el)=>{
                        return el.x == i && el.y == j
                    })[0]
                    
                    if (el.type=="neutral"){
                        row.push("neutral")
                    }
                    if (el.type=="infected"){
                        row.push("infected")
                    }
                    if (el.type=="post"){
                        row.push("post")
                    }
                    if (el.type=="unneutral"){
                        row.push("unneutral")
                    }
                    if (el.type=="vaccine"){
                        row.push("vaccine")
                    }
                    if (el.type=="double"){
                        row.push("double")
                    }

                }
                visual.push(row)
            };
            update_grid(visual)
        }, 1)
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