import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddForm from '../components/AddForm'
import { Card, Typography, CardContent, Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 24,
    },
})

const MainPage = (props) => {
    const [articles, setArticles] = useState([])
    const [showCreatePage, setShowCreatePage] = useState(false)

    const fetchArticles = async () => {
        try {
            await axios.get('http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles').then((results) => {
                setArticles(results.data)
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        console.log(articles)
        if (articles.length === 0) {
            fetchArticles()
        }
    }, [articles])

    const handleShowCreatePage = () => setShowCreatePage(!showCreatePage)

    const classes = useStyles()

    return (
        <Container>
            <h1>Articles</h1>
            <Button variant="contained" onClick={handleShowCreatePage}>
                Add article {!showCreatePage ? '+' : '–'}
            </Button>
            <AddForm showCreatePage={showCreatePage} />
            {articles.length > 0 ? (
                articles.map((article) => (
                    <Link to={{ pathname: `/articles/${article._id}`, state: 'Hello' }}>
                        <Card className={classes.root} variant="outlined" key={article._id}>
                            <CardContent>
                                <Typography variant="h2" className={classes.title} color="textSecondary">
                                    {article.title}
                                </Typography>
                                <Typography component="h4" variant="h5">
                                    {article.description}
                                </Typography>
                                <Typography>Author: {article.author}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    )
}

export default MainPage
