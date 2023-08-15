import { Box, Card, CardBody, Grid, GridItem, SimpleGrid } from "@chakra-ui/react"
import Calendario from "../../componets/calendario/Calendario"

const Escritorio = () => {

    return (
        <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
            <GridItem colSpan={
                {
                    base: 6,
                    md: 6,
                    lg: 2,
                }
            }>
                <Calendario />
            </GridItem>
            <GridItem colSpan={
                {
                    base: 6,
                    md: 6,
                    lg: 4,
                }
            }>
            </GridItem>




        </Grid>
    )
}

export default Escritorio