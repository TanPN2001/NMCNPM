import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListData from "./ListData";
import CategoryItem from "./CategoryItem";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#fffff"
    },
    list: {
        width: "100%",
        height: "100%",
        marginTop: "7%"
    }
})


export default function ListCategory({ categories, setChosenData }) {
    const classes = useStyles()
    return (
        <Container className={classes.list}>
            {categories ? (
                <>
                    <ListData
                        data={categories}
                        RenderComponent={CategoryItem}
                        title="Posts"
                        pageLimit={5}
                        dataLimit={5}
                        direction="column"
                        paginationStyle={{ paddingLeft: "20%", marginTop: "10px"  }}
                        setChosenData={setChosenData}
                        changeChosenData={true}
                    />
                </>
            ) : (
                <h1>Loading data ....</h1>
            )}
        </Container>
    )
}