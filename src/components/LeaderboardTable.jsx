import React, { useState } from 'react'
import UserInfo from './UserInfo';

const LeaderboardTable = ({
    users, updatePointsValue, deleteUser, handleSort, sortedKeyDirection, isAddNewUserClicked, handleSaveUser, handleCancelAddUser }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userAge, setUserAge] = useState(0);
    const [userAddress, setUserAddress] = useState("");


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {/* Table Header */}
                        <th className='cursor-pointer' onClick={() => handleSort("name")} >
                            Name {sortedKeyDirection.key === "name" ? (sortedKeyDirection.direction === "asc" ? "🔺" : "🔻") : ""}
                        </th>
                        <th className='cursor-pointer' onClick={() => handleSort("points")}>
                            Points {sortedKeyDirection.key === "points" ? (sortedKeyDirection.direction === "asc" ? "🔺" : "🔻") : ""}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table Body */}
                    {users.length ? users.map((user) => {
                        return ([
                            <tr key={user.id}>
                                <td className='cursor-pointer' onClick={() => setSelectedUser(user)}>{user.name}</td>
                                <td>{user.points}</td>
                                <td className='action-column'>
                                    <button onClick={() => updatePointsValue(user.id, +1)}>+</button>
                                    <button onClick={() => updatePointsValue(user.id, -1)}>-</button>
                                    <button onClick={() => deleteUser(user.id)}>X</button>
                                </td>
                            </tr>,
                            // Show user info after lcicking on respective user name
                            selectedUser?.id === user.id && (
                                <tr key={user.id + selectedUser.id}>
                                    <td colSpan="3">
                                        <UserInfo user={user} />
                                    </td>
                                </tr>)
                        ])
                    }) :
                        // Show message if no user found
                        <tr>
                            <td colSpan="3">No User Found</td>
                        </tr>
                    }
                    {/* Add a new row for adding new user */}
                    {isAddNewUserClicked && (
                        <>
                            <tr>
                                <td><input type="text" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Name' /></td>
                                <td><input type="text" name="userAge" value={userAge} onChange={(e) => setUserAge(e.target.value)} placeholder='Age' /></td>
                                <td className='action-column'>
                                    <button onClick={() => handleSaveUser(userName, userAge, userAddress)}>Save</button>
                                    <button onClick={() => handleCancelAddUser()}>Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3"><input type="text" name="userAddress" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder="Address" /></td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LeaderboardTable
