"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "../../../../../model/user-model";
import { updateUserDetails } from "@/app/actions/account";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactInfo({ user }: { user: IUser }) {
  const [infoState, setInfoState] = useState({
    phone: user?.phone || "",
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
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
      <form onSubmit={handleSubmit} method="post">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No.</Label>
            <Input
              name="phone"
              id="phone"
              type="tel"
              value={infoState.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <Button className="mt-5" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
