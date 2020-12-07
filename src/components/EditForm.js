import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const NewArticlePage = (props) => {
    const { showEditForm, article } = props
    const { register, handleSubmit } = useForm()
    const history = useHistory()

    const { title, author, body, _id, description } = article

    const editArticle = async (data) => {
        try {
            await axios
                .put(`http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles/${_id}`, data)
                .then((results) => {
                    console.log(results)
                    history.push('/')
                })
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        <>
            {showEditForm ? (
                <div className="add-form">
                    <h2>Edit article</h2>
                    <form onSubmit={handleSubmit(editArticle)}>
                        <div className="form-control">
                            <label>Title</label>
                            <br />
                            <input defaultValue={title} type="text" name="title" ref={register} />
                        </div>
                        <div className="form-control">
                            <label>Description</label>
                            <br />
                            <input defaultValue={description} type="text" name="description" ref={register} />
                        </div>
                        <div className="form-control">
                            <label>Author</label> <br />
                            <input defaultValue={author} type="text" name="author" ref={register} />
                        </div>
                        <div className="form-control">
                            <label>Body</label>
                            <br />
                            <textarea
                                defaultValue={body}
                                style={{ resize: 'none' }}
                                type="text"
                                name="body"
                                ref={register}
                            />
                        </div>
                        <div className="form-control">
                            <label></label>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default NewArticlePage
