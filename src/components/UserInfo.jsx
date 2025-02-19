import React from 'react'

const UserInfo = ({ user }) => {
    return (
        <div>
            <ul>
                <li>Name - {user.name}</li>
                <li>Age - {user.age}</li>
                <li>Points - {user.points}</li>
                <li>Address - {user.address}</li>
            </ul>
        </div>
    )
}

export default UserInfo
