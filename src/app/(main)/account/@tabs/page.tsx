import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Profile() {
  return (
    <>
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white ">
        <h5 className="text-lg font-semibold mb-4">Personal Detail</h5>
        <form>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <Label className="mb-2 block">
                First Name <span className="text-red-600">*</span>
              </Label>
              <Input type="text" id="firstname" name="firstname" required />
            </div>
            <div>
              <Label className="mb-2 block">
                Last Name <span className="text-red-600">*</span>
              </Label>
              <Input type="text" id="lastname" name="lastname" required />
            </div>
            <div>
              <Label className="mb-2 block">
                Your Email <span className="text-red-600">*</span>
              </Label>
              <Input type="email" id="email" name="email" required />
            </div>
            <div>
              <Label className="mb-2 block">Occupation</Label>
              <Input name="occupation" id="occupation" type="text" />
            </div>
          </div>
          {/*end grid*/}
          <div className="grid grid-cols-1">
            <div className="mt-5">
              <Label className="mb-2 block">Description</Label>
              <Textarea id="comments" name="comments" />
            </div>
          </div>
          {/*end row*/}
          <Button className="mt-5" type="submit">
            Save Changes
          </Button>
        </form>
        {/*end form*/}
      </div>
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
            <form>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Label className="mb-2 block">Phone No.</Label>
                  <Input name="phone" id="phone" type="tel" />
                </div>
                <div>
                  <Label className="mb-2 block">Website</Label>
                  <Input name="website" id="website" type="url" />
                </div>
              </div>
              {/*end grid*/}
              <Button className="mt-5" type="submit">
                Add
              </Button>
            </form>
          </div>
          {/*end col*/}
          <div>
            <h5 className="text-lg font-semibold mb-4">Change password</h5>
            <form>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Label className="mb-2 block">Old password</Label>
                  <Input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2 block">New password</Label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Re-type New password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                  />
                </div>
              </div>
              {/*end grid*/}
              <Button className="mt-5" type="submit">
                Save password
              </Button>
            </form>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>
    </>
  );
}

export default Profile;
