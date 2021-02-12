import React from 'react'
import { baseTitle } from '../../baseUtils'

export default function NotFound() {

    document.title = `${baseTitle} - 404`

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh' }}>
            <h1 className='fw-bold'>404 error ...!</h1>
            <p>The page you are looking for is not found</p>
            <a className='btn btn-primary' href='/'>Back to Home</a>
        </div>
    )
}
