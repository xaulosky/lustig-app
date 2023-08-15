/* onChange Rut format */
export const rutFormat = (e) => {
    
    let rut = e.target.value;
    if (rut.length === 2) {
        rut = rut + '.';
    } else if (rut.length === 6) {
        rut = rut + '.';
    } else if (rut.length === 10) {
        rut = rut + '-';
    }
    console.log(rut);
    return rut;
}
