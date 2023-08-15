export const separadorDeMiles = (num) => {
    return (num)?.toLocaleString('de-DE')
}

/* onChange input separadorDeMiles */
export const onChangeSeparadorDeMiles = (e, setValor) => {
    console.log(separadorDeMiles(e.target.value))
    setValor(separadorDeMiles(e.target.value))
}