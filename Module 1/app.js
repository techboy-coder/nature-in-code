function model(v1,v2){
    return {
        v1v1: v1*v1,
        v2v2: v2*v2,
        v1v2: v1*v2*2
    }
}

document.getElementById('input').onsubmit = function() { 
    var v1 = parseFloat(document.getElementById("v1").value)
    var v2 = parseFloat(document.getElementById("v2").value)
    var tot = v1+v2
    if(tot!=1){
        document.getElementById("error").innerHTML = "v1 + v2 should be equal to 1"
        document.getElementById("v1v1").innerHTML = ""
        document.getElementById("v1v2").innerHTML = ""
        document.getElementById("v2v2").innerHTML = ""
        document.getElementById("tot").innerHTML = ""
        return false
    }else{
        document.getElementById("error").innerHTML = ""
        document.getElementById("tot").innerHTML = "Total = 1"
    }
    const output = model(v1,v2)
    console.log(output);
    document.getElementById("v1v1").innerHTML = "Ideal Prob: " + Math.round(output.v1v1*100)/100;
    document.getElementById("v2v2").innerHTML = "Ideal Prob: " + Math.round(output.v2v2*100)/100;
    document.getElementById("v1v2").innerHTML = "Ideal Prob: " + Math.round(output.v1v2*100)/100;
    console.log("Running");
    var _lpv1v2 = 1 - v1-v2

    var av1 = []
    var av2 = []
    var av1v2 = []
    var gen = []

    for (let i = 0; i < 10; i++) {
        
        v1 = v1*v1+((_lpv1v2*_lpv1v2)/4)
        v2 = v2 * v2
        _lpv1v2 = 1 - v1-v2

        av1.push(v1)
        av2.push(v2)
        av1v2.push(_lpv1v2)
        gen.push(i+1)

    }
    console.log(av1, av2, av1v2);
    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: gen,
        datasets: [{
            label: '# of v1',
            data: av1,
            borderWidth: 1,
            fill: false,
            borderColor: 'red'
        },
        {
            label: '# of v2',
            data: av2,
            borderWidth: 1,
            fill: false,
            borderColor: 'green'
        },
        {
            label: '# of v1v2',
            data: av1v2,
            borderWidth: 1,
            fill: false,
            borderColor: 'blue'
        },
        
        ]
    },
    options: {
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true
            }
        }],
        y: {
            display: true,
            type: 'logarithmic',
        }
        }
    }
    });
    return false
};

