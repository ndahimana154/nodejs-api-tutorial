import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const initialUsers = {
    users: [
        {
            id: uuidv4(),
            firstname: "John",
            lastname: "Doe",
            age: 20,
        },
    ],
};
let users = initialUsers;
// Get all users
router.get("/", (req, res) => {
    res.send(users);
    console.log(users);
});
// Create a new user
router.post("/", (req, res) => {
    const { firstname, lastname, age } = req.body;
    const newUser = {
        id: uuidv4(),
        firstname,
        lastname,
        age,
    };
    users.users.push(newUser);
    console.log(users);
    res.send(`User with name ${newUser.firstname} is saved successfully.`);
});
// Get single User
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const foundUser = users.users.find((user) => user.id === id);
    if (foundUser) {
        res.send(foundUser);
    }
    else {
        res.status(404).send("User not found");
    }
});
// Delete a single user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    // Find the index of the user with the specified ID
    const index = users.users.findIndex((user) => user.id === id);
    if (index !== -1) {
        // Remove the user from the array using splice
        users.users.splice(index, 1);
        res.send(`User with ID ${id} has been deleted successfully.`);
    }
    else {
        res.status(404).send("User not found");
    }
    console.log(users);
});
// Update the User
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age } = req.body;
    // Find the index of the user with the specified ID
    const index = users.users.findIndex((user) => user.id === id);
    if (index !== -1) {
        // Update the user's firstname and lastname if found
        users.users[index].firstname = firstname;
        users.users[index].lastname = lastname;
        users.users[index].age = age;
        res.send(`User with ID ${id} has been updated successfully. ${users}`);
    }
    else {
        res.status(404).send(`User with ID ${id} not found.`);
    }
    console.log(users);
});
export default router;
