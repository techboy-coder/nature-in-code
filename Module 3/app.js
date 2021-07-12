const BASES = ["A","T","G","C"]
const DNA_LEN = 100
const duplications = 100
function rand_base(){
    return BASES[Math.floor(Math.random() * BASES.length)]
}
var dna = new Array(DNA_LEN).fill(0).map(()=>{return rand_base()})
const original_dna = dna

for (let i = 0; i < 10; i++){
    console.log(i);
    // From here on!!
}