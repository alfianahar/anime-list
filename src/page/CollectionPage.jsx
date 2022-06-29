import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const CollectionPage = () => {

    const [newName, setNewName] = useState('')
    const [newAge, setNewAge] = useState(0)

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")

    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, 'users', id)
        const newFields = { age: age + 1 }
        await updateDoc(userDoc, newFields)
    }

    const deletUser = async (id) => {
        const userDoc = doc(db, 'users', id)
        await deleteDoc(userDoc)
    }

    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <input
                placeholder='Name...'
                onChange={(e) => {
                    setNewName(e.target.value)
                }}
            />
            <input
                type='number'
                placeholder='Age...'
                onChange={(e) => {
                    setNewAge(e.target.value)
                }}
            />
            <button onClick={createUser}> Create User </button>
            {users.map((user) => {
                return (
                    <div>
                        {' '}
                        <h1>Name: {user.name}</h1>
                        <h1>Age: {user.age}</h1>
                        <button onClick={() => { updateUser(user.id, user.age) }}> Tambah Umur </button>
                        <button onClick={() => { deletUser(user.id) }}> Delete User </button>
                    </div>

                )
            })}
        </div>
    )
}

export default CollectionPage
