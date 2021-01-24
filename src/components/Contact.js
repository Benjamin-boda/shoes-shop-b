import React, { useEffect, useState } from "react";

export const Contact = () => {
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [submit, setSubmit] = useState("")

    const inputChange = (e) => {
        setSubject(e.target.value)
    }

    const textChange = (e) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        const request = {
            title: subject,
            object: description
        }
        setSubmit(request)
    }, [subject, description])

    const onSubmit = () => {
        console.log(submit)
    }

    return (
        <div className="contact">
            <div className="contact__header">
                <h1 className="contact__title">Contact us</h1>
                <img className="contact__image" src={require("../images/conctact logo.jpg").default}/>
            </div>
            
            <form className="contact__form" onSubmit={onSubmit}>
                <input data-testid="input" className="contact__form__subject" onChange={inputChange} type="text" placeholder="Subject"/>
                <textarea data-testid="textarea" className="contact__form__description" onChange={textChange} maxLength="200" minLength="10" placeholder="Describe your problem in 200 caracters"/>
                <button className="contact__form__button">Submit</button>
            </form>
        </div>
    )
}