import { Box, Card, CardBody, Grid, GridItem, Heading, SimpleGrid } from "@chakra-ui/react"
import Calendario from "../../componets/calendario/Calendario"
import { set } from "react-hook-form"

const Escritorio = () => {

    /* obtener mes actual en español */
    const mesActual = new Date().toLocaleString('es-ES', { month: 'long' })

    return (
        <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
            <GridItem colSpan={
                {
                    base: 6,
                    md: 6,
                    lg: 4,
                }
            }>
                <Card>
                    <CardBody>
                        <Calendario tipo="dayGridMonth" acciones={true} titulo={true} />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem colSpan={
                {
                    base: 6,
                    md: 6,
                    lg: 2,
                }
            }>
                {/* titulo de evento de este mes segun el mes que estemos con js*/}
                <Card>
                    <CardBody>
                        <Heading size="md" mb={3}>Eventos de {mesActual} </Heading>
                        <Calendario tipo="listMonth" />
                    </CardBody>
                </Card>
            </GridItem>
        </Grid>
    )
}

export default Escritorio