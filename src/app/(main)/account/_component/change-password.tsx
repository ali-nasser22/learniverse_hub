"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "../../../../../model/user-model";
import { useState } from "react";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { updateUserDetails } from "@/app/actions/account";

export default function ChangePassword({ user }: { user: IUser }) {
  const [infoState, setInfoState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoState({ ...infoState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isPasswordMatch = await bcrypt.compare(
        infoState.oldPassword,
        user.password
      );
      if (!isPasswordMatch) {
        toast.error("Old password is incorrect");
        return;
      }
      if (infoState.newPassword !== infoState.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
      const hashedPassword = await bcrypt.hash(infoState.newPassword, 10);
      const response = await updateUserDetails(user.email, {
        password: hashedPassword,
      } as IUser);
      if (response.ok) {
        toast.success("Password changed successfully");
        setInfoState({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Failed to change password " + response.statusText);
      }
    } catch (error) {
      toast.error("Failed to change password " + error);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password</h5>
      <form onSubmit={handleSubmit} method="post">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password</Label>
            <Input
              type="password"
              id="oldPassword"
              name="oldPassword"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <Label className="mb-2 block">New password</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit">
          Save password
        </Button>
      </form>
    </div>
  );
}
