function app(){

const ANIMALS = parseInt(document.getElementById("samples").value)
const gen = parseInt(document.getElementById("generations").value)
console.log(ANIMALS, gen);
const initial_a1_freq = parseFloat(document.getElementById("a1").value)
const initial_a2_freq = 1-initial_a1_freq

var a1_freq = initial_a1_freq
var a2_freq = 1 - a1_freq
var arr_a1 = []
var arr_a2 = []
for (var i = 0; i < gen; i++){
    let a1 = 0
    let a2 = 0
    for (let j = 0; j<ANIMALS*2;j++){
        if(Math.random()<a1_freq){
            a1++
        }else{
            a2++
        }
    }
    a1_freq=a1/(a1+a2)
    a2_freq = 1 - a1_freq
    arr_a1.push(a1_freq)
    arr_a2.push(a2_freq)
}


var ctx = document.getElementById('myChart').getContext('2d');


var a1_data = {
    label: "A1",
    data: arr_a1,
    lineTension: 0.5,
    fill: false,
    borderColor: 'red',
    borderWidth: 1.5
}
var a2_data = {
    label: "A2",
    data: arr_a2,
    lineTension: 0.5,
    fill: false,
    borderColor: 'blue',
    borderWidth: 1.5
}

const data = {
    labels: [...Array(gen).keys()],
    datasets: [a1_data, a2_data]
  };


var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        bezierCurve: true
    }
});
myChart.update() 
}