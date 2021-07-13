const N_CLONES = 100
const a1_prob = 0.5
const a2_prob = 1 - a1_prob
const N_GEN = 10

const gridx = Math.round(Math.sqrt(N_CLONES)) * Math.round(Math.sqrt(N_CLONES))==N_CLONES?Math.round(Math.sqrt(N_CLONES)) : Math.round(Math.sqrt(N_CLONES))+1
const gridy = Math.round(Math.sqrt(N_CLONES)) * Math.round(Math.sqrt(N_CLONES))==N_CLONES?Math.round(Math.sqrt(N_CLONES)) : Math.round(Math.sqrt(N_CLONES))+1

var grid = [...Array(gridx*gridy).keys()]
console.log(JSON.stringify(grid));




























































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