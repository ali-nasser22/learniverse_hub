"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "../../../../../model/user-model";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PersonalDetails({ user }: { user: IUser }) {
  const [infoState, setInfoState] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    designation: user?.designation,
    bio: user?.bio,
  });
  console.log(infoState);

  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white ">
      <h5 className="text-lg font-semibold mb-4">Personal Detail</h5>
      <form>
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
              defaultValue={user?.firstName}
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
              defaultValue={user?.lastName}
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
              defaultValue={user?.email}
            />
          </div>
          <div>
            <Label className="mb-2 block">Designation</Label>
            <Input
              name="designation"
              id="designation"
              type="text"
              defaultValue={user?.designation}
            />
          </div>
        </div>
        {/*end grid*/}
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Bio</Label>
            <Textarea id="bio" name="bio" defaultValue={user?.bio} />
          </div>
        </div>
        {/*end row*/}
        <Button className="mt-5" type="submit">
          Save Changes
        </Button>
      </form>
      {/*end form*/}
    </div>
  );
}
