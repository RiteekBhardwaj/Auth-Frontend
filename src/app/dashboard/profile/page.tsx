"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/lib/api/auth.api";

type User = {
  username: string;
  roles: string[];
};

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profile();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadProfile();
  }, [router]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.username}</p>
      <p>Roles: {user.roles.join(", ")}</p>
    </div>
  );
}
