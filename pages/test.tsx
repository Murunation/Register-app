import React, { useState } from "react";

interface UserType {
  name: string;
  age: number;
}
export default function Test() {
  const [users, setUsers] = useState<UserType[]>([]);
  function submitHandler(e: any) {
    e.preventDefault();
    console.log("Name: " + e.target.name.value);
    console.log("Age: " + e.target.age.value);
    const newUser = {
      name: e.target.name.value,
      age: e.target.age.value,
    };
    fetch("http://localhost:3030/User/add", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newUser),
    });
  }
  function getAllUserHandler() {
    fetch("http://localhost:3030/User/all")
      .then((response) => response.json())
      .then((res) => setUsers(res));
  }
  return (
    <div className="w-full h-screen bg-gray-300 ">
      <h1 className="m-4">Register User</h1>
      <form onSubmit={submitHandler}>
        <label className="p-5">
          {" "}
          Name:
          <input
            type="text"
            name="name"
            className="block border m-4 border-black"
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            className="block border m-4 border-black"
          />
        </label>
        <button type="submit" className="m-3 border border-black w-1/4">
          Submit
        </button>
      </form>
      <button
        className="w-1/4 h-[40px] bg-black text-white mx-3"
        onClick={getAllUserHandler}
      >
        Get All Users
      </button>
      <ul className="m-5">
        {users.map((user: UserType, index: number) => (
          <li key={index}>
            Name: {user.name}, Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
