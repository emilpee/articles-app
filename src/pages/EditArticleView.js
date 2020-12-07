import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Card, Typography, CardContent, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditForm from '../components/EditForm'
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 24,
    },
})

const EditArticleView = () => {
    const [article, setArticle] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const history = useHistory()
    const { id } = useParams()

    const fetchArticle = async () => {
        try {
            await axios
                .get(`http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles/${id}`)
                .then((results) => {
                    setArticle(results.data)
                })
        } catch (err) {
            throw new Error(err)
        }
    }

    const deleteArticle = async (data) => {
        try {
            await axios
                .delete(`http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles/${id}`, data)
                .then((results) => {
                    console.log(results)
                    history.push('/')
                })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        if (article === null) {
            fetchArticle()
        }
    }, [article])

    const handleShowEditForm = () => setShowEditForm(!showEditForm)

    const classes = useStyles()

    return (
        <div>
            {article !== null ? (
                <Card className={classes.root} variant="outlined" key={article._id}>
                    <CardContent>
                        <Typography variant="h2" className={classes.title} color="textSecondary">
                            {article.title}
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {article.description}
                        </Typography>
                        <Typography>Author: {article.author}</Typography>
                        <Typography>{article.body}</Typography>
                    </CardContent>
                    <Button onClick={handleShowEditForm} variant="contained" color="primary">
                        Edit
                    </Button>
                    <Button onClick={deleteArticle} variant="contained" color="secondary">
                        Delete
                    </Button>
                    {showEditForm ? <EditForm article={article} showEditForm={showEditForm} /> : null}
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default EditArticleView
