import React, { useState, useEffect } from 'react'
import LeaderboardData from "../utils/LeaderboardData"
import LeaderboardTable from './LeaderboardTable';

const Leaderboard = () => {
    const [users, setUsers] = useState(LeaderboardData)
    const [searchName, setSearchName] = useState("")
    const [sortedKeyDirection, setSortedKeyDirection] = useState({ key: "name", direction: "asc" })
    const [isAddNewUserClicked, setIsAddNewUserClicked] = useState(false)

    // Filter users after searching
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    // Increment or decrement points value
    const updatePointsValue = (userId, pointer) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                user.points = user.points + pointer;
            }
            return user;
        })
        if (sortedKeyDirection.key === "points") {
            sortedKeyDirection.direction === "asc" ?
                updatedUsers.sort((a, b) => a.points - b.points)
                : updatedUsers.sort((a, b) => b.points - a.points)
        }
        else {
            updatedUsers.sort((a, b) => b.points - a.points)
        }
        setUsers(updatedUsers);
    }

    // Delete existing users
    const deleteUser = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
    }

    // Sort by name or points by clicking on respective table header
    const handleSort = (sortKey) => {
        let direction = "asc";
        if (sortedKeyDirection.key === sortKey && sortedKeyDirection.direction === "asc") {
            direction = "desc";
        }
        const sortedUsers = users.sort((a, b) => {
            if (sortKey === "points") {
                return direction === "asc" ? a.points - b.points : b.points - a.points;
            }
            else {
                return direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
        })
        setUsers(sortedUsers);
        setSortedKeyDirection({ key: sortKey, direction })
    }

    // Add and Save new user
    const handleSaveUser = (userName, userAge, userAddress) => {
        if (!userName || !userAddress) {
            alert("Please fill in all fields.");
            return;
        }
        if (userAge <= 0 || userAge >= 80) {
            alert("Invalid age.");
            return;
        }

        const newUser = { id: users.length + 1, name: userName, age: userAge, address: userAddress, points: 0 };

        setIsAddNewUserClicked(false);
        setUsers([...users, newUser])
    }

    // Cancel adding new user
    const handleCancelAddUser = () => {
        setIsAddNewUserClicked(false);
    }

    useEffect(() => {
        // By default, sort users by name 
        const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);
    }, [])

    return (
        <div className='leaderboard-section'>
            <input className='search-input' type="text" placeholder='Search by name' value={searchName} onChange={(e) => setSearchName(e.target.value)} />

            <LeaderboardTable
                users={filteredUsers}
                updatePointsValue={updatePointsValue}
                deleteUser={deleteUser}
                handleSort={handleSort}
                sortedKeyDirection={sortedKeyDirection}
                isAddNewUserClicked={isAddNewUserClicked}
                handleSaveUser={handleSaveUser}
                handleCancelAddUser={handleCancelAddUser} />
            <button className='add-user-btn' onClick={() => setIsAddNewUserClicked(!isAddNewUserClicked)}>Add User</button>
        </div>
    )
}

export default Leaderboard
