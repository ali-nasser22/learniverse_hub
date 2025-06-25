"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "../../../../../model/user-model";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateUserDetails } from "@/app/actions/account";

import { toast } from "sonner";

export default function PersonalDetails({ user }: { user: IUser }) {
  const [infoState, setInfoState] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    designation: user?.designation,
    bio: user?.bio,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoState({ ...infoState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateUserDetails(user.email, infoState as IUser);
      if (response.ok) {
        toast.success("User details updated successfully");
      } else {
        toast.error("Failed to update user details " + response.statusText);
      }
    } catch (error) {
      toast.error("Failed to update user details " + error);
    }
  };

  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white ">
      <h5 className="text-lg font-semibold mb-4">Personal Detail</h5>
      <form onSubmit={handleSubmit} method="post">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">
              First Name <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              required
              onChange={(e) => handleChange(e)}
              value={infoState.firstName}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Last Name <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              required
              onChange={(e) => handleChange(e)}
              value={infoState.lastName}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Your Email <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              disabled
              value={infoState.email}
            />
          </div>
          <div>
            <Label className="mb-2 block">Designation</Label>
            <Input
              name="designation"
              id="designation"
              type="text"
              onChange={(e) => handleChange(e)}
              value={infoState.designation}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={infoState.bio}
              onChange={(e) =>
                handleChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                )
              }
            />
          </div>
        </div>

        <Button className="mt-5" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
