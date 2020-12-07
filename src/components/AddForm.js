import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const NewArticlePage = (props) => {
    const { showCreatePage } = props
    const { register, handleSubmit } = useForm()

    const postNewArticle = async (data) => {
        try {
            await axios
                .post('http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles', data)
                .then((results) => {
                    console.log(results)
                })
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        <>
            {showCreatePage ? (
                <div className="add-form">
                    <h2>New article</h2>
                    <form onSubmit={handleSubmit(postNewArticle)}>
                        <div className="form-control">
                            <label>Title</label> <br />
                            <input type="text" name="title" ref={register} />
                        </div>
                        <div className="form-control">
                            <label>Description</label> <br />
                            <input type="text" name="description" ref={register} />
                        </div>
                        <div className="form-control">
                            <label>Author</label> <br />
                            <input type="text" name="author" ref={register} />
                        </div>
                        <div className="form-control">
                            <label>Body</label> <br />
                            <textarea style={{ resize: 'none' }} type="text" name="body" ref={register} />
                        </div>
                        <div className="form-control">
                            <label></label>
                            <br />
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default NewArticlePage
