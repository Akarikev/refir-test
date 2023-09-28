"use client";
import React, { useState, useEffect } from "react";
import Refir from "refir";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader } from "lucide-react";

export default function RefirComponent() {
  const [addUserName, setAddUserName] = useState("");
  const [addUserEmail, setAddUserEmail] = useState("");
  const [addUserLoader, setAddUserLoader] = useState(false);
  const [usersUid, setUsersUid] = useState(uuidv4());
  const [referralCode, setReferralCode] = useState("");
  const refir = new Refir();
  refir.configure({ apiKey: "I9BtOyeUoxFW51oVqC6DMPsyLxyM5c8X" });

  const user = {
    userId: usersUid,
    name: addUserName,
    email: addUserEmail,
  };

  const addRefirUser = async () => {
    setAddUserLoader(true);
    const success = await refir.addUser(user);

    if (success) {
      console.log("User added successfully.");
    } else {
      console.error("Failed to add user.");
    }

    setAddUserEmail(""); // Setting email to empty
    setAddUserName(""); // Setting name to empty

    setTimeout(() => {
      setAddUserLoader(false);
    }, 2000);
  };

  const getUserRefr = async () => {
    const userId = user.userId;
    setUsersUid(userId);
    const code = await refir.getUserById(userId);
    setReferralCode(code);
    console.log(code);

    if (referralCode) {
      console.log(`User's referral code: ${referralCode}`);
    } else {
      console.error("Failed to get user referral code.");
    }
  };

  useEffect(() => {
    getUserRefr();
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addRefirUser();
        }}
        className="flex flex-col "
      >
        <Input
          type={"text"}
          onChange={(e) => {
            setAddUserName(e.target.value);
          }}
          placeholder="name"
          className="m-2"
        />
        <Input
          type={"text"}
          onChange={(e) => {
            setAddUserEmail(e.target.value);
          }}
          placeholder="email"
          className="mb-2"
        />
        <Button type="submit">
          {addUserLoader ? <Loader /> : "Added" ? "Add User" : ""}
        </Button>
      </form>

      <Button onClick={getUserRefr} className="mt-3">
        Show Referral Code
      </Button>
      {referralCode ? <p>Users Referral Code: {referralCode}</p> : ""}
    </div>
  );
}
