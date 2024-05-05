import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
    },
    {
        name: "Srikar Palmite",
        email: "srikar@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
    },
];

export default users;