import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "../../../../../model/user-model";

export default function ContactInfo({ user }: { user: IUser }) {
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
      <form>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No.</Label>
            <Input
              name="phone"
              id="phone"
              type="tel"
              defaultValue={user?.phone}
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
