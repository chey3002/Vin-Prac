export function bordeSemaforizado (fecha_limite){
    // Crear dos objetos date
    var fecha1 = new Date()
    var fecha2 = new Date(Date.parse(fecha_limite));
    // Obtener los milisegundos de cada fecha
    var ms1 = fecha1.getTime();
    var ms2 = fecha2.getTime();
    // Restar las fechas y obtener la diferencia en milisegundos
    var dif = ms2 - ms1;
    // Definir los milisegundos que corresponden a una semana, 3 días y 1 día
    var semana = 7 * 24 * 60 * 60 * 1000; // 604800000
    var tresDias = 3 * 24 * 60 * 60 * 1000; // 259200000
    var unDia = 24 * 60 * 60 * 1000; //86400000
    let color = ""
    let tag=""
    // Comparar la diferencia con los valores definidos
    console.log(dif)

    if (dif > semana) {
        tag = "+Semana"
        color = "green"
    } else if (dif > tresDias) {
        tag = "+Tres días"
        color = "orange"
    } else {
        tag = "poco tiempo"
        color = "red"
    }
    return {
        color,
        tag
    };

}