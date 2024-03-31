import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
}

interface Users {
  users: User[];
}

const router: Router = express.Router();

const initialUsers: Users = {
  users: [
    {
      id: uuidv4(),
      firstname: "John",
      lastname: "Doe",
      age: 20,
    },
  ],
};

let users: Users = initialUsers;

// Get all users
router.get("/", (req: Request, res: Response) => {
  res.send(users);
  console.log(users);
});

// Create a new user
router.post("/", (req: Request, res: Response) => {
  const { firstname, lastname, age }: User = req.body;
  const newUser: User = {
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
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundUser: User | undefined = users.users.find(
    (user) => user.id === id
  );
  if (foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send("User not found");
  }
});

// Delete a single user
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // Find the index of the user with the specified ID
  const index: number = users.users.findIndex((user) => user.id === id);

  if (index !== -1) {
    // Remove the user from the array using splice
    users.users.splice(index, 1);
    res.send(`User with ID ${id} has been deleted successfully.`);
  } else {
    res.status(404).send("User not found");
  }

  console.log(users);
});
// Update the User
router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname,age } = req.body;

  // Find the index of the user with the specified ID
  const index: number = users.users.findIndex((user) => user.id === id);

  if (index !== -1) {
    // Update the user's firstname and lastname if found
    users.users[index].firstname = firstname;
    users.users[index].lastname = lastname;
    users.users[index].age = age
    res.send(`User with ID ${id} has been updated successfully. ${users}`);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }

  console.log(users);
});


export default router;
