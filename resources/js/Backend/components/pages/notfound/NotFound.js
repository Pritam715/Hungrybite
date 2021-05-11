import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>

            <p>Page Not Found</p>
            <Link to="/admin/login">
                Go Home
             </Link>
        </div>
    )
}
