import React from 'react'
import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <section className='section'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Oops!</h1>
                        <p>Page Not Found</p>
                        <div>
                            <Link to="/" className="btn btn-primary">Visit Our Homepage</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Missing