'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get('https://chatapplication-i1j5.onrender.com/api/user', {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(response => {
            setUser(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-red-600 text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-600 text-center p-4">Error: {error.message}</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 mt-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-red-800 mb-4">Profile</h1>
            <div className="flex items-center space-x-4">
                {user.image ? (
                    <img
                        src={user.image}
                        alt="Profile"
                        className="w-24 h-24 object-cover rounded-full border-2 border-red-300"
                    />
                ) : (
                    <div className="w-24 h-24 bg-red-200 rounded-full flex items-center justify-center text-red-600">
                        No Image
                    </div>
                )}
                <div>
                    <p className="text-lg font-semibold text-red-700">First Name: <span className="font-normal">{user.fName}</span></p>
                    <p className="text-lg font-semibold text-red-700">Last Name: <span className="font-normal">{user.lName}</span></p>
                    <p className="text-lg font-semibold text-red-700">Username: <span className="font-normal">{user.username}</span></p>
                    <p className="text-lg font-semibold text-red-700">Email: <span className="font-normal">{user.email}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Profile;