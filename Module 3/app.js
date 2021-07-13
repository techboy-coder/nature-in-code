function app(){

    const BASES = ["A","T","G","C"]
    const DNA_LEN = parseInt(document.getElementById("len").value)
    const generations = parseInt(document.getElementById("generations").value)
    const num_clones = parseInt(document.getElementById("clones").value)
    const mutation_rate = parseFloat(document.getElementById("mutations").value)
    function rand_base(){
        return BASES[Math.floor(Math.random() * BASES.length)]
    }

    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === v) return true;
        }
        return false;
    };
    
    Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
    }

    function num_Unique(array){
        var u = array.map(JSON.stringify)
        return u.unique().length
    }

    var dna = new Array(DNA_LEN).fill(0).map(()=>{return rand_base()})
    const original_dna = dna

    const clones = new Array(num_clones).fill(original_dna)

    var unique_dna = []

    for (let i = 0; i < generations; i++){
        for (let j = 0; j < clones.length; j++){
            clones[j]=clones[j].map((base)=>{
                if (Math.random() < mutation_rate){
                    return rand_base()
                }
                return base
            })
        }
        unique_dna.push(num_Unique(clones))
    }


    var ctx = document.getElementById('myChart').getContext('2d');


    var unique_dna_data = {
        label: "Total Unique DNA's",
        data: unique_dna,
        lineTension: 0.5,
        fill: false,
        borderColor: 'red',
        borderWidth: 1.5
    }


    const data = {
        labels: [...Array(generations).keys()],
        datasets: [unique_dna_data]
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