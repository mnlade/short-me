import React, { useState, useEffect } from "react";
import {
  MdModeEdit,
  MdDelete,
  MdContentCopy,
  MdVisibility,
  MdQrCode,
} from "react-icons/md";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { api } from "~/utils/api";
import { toast } from "./ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import QRCode from "qrcode.react";
import { Checkbox } from "./ui/checkbox";

interface DashCardProps {
  avatarSrc: string;
  username: string;
  shorturl: string;
  url: string;
  description: string;
  date: string;
  onAddDescription?: () => void;
  onDescriptionChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges?: () => void;
  onDeleteLink?: () => void;
  clickcounter: number;
  qrcodeimgstring: string;
}

const UserDashCard: React.FC<DashCardProps> = ({
  avatarSrc,
  username,
  shorturl,
  url,
  description: initialDescription,
  date,
  onDeleteLink,
  clickcounter,
  qrcodeimgstring,
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [newDescription, setNewDescription] = useState(initialDescription);
  const updateLinkDescriptionMutation =
    api.createLinkRouter.updateLinkDescription.useMutation();

  useEffect(() => {
    setDescription(initialDescription);
    setNewDescription(initialDescription);
  }, [initialDescription]);

  function updateLinkDescription() {
    updateLinkDescriptionMutation.mutate(
      {
        short: shorturl,
        newDescription: newDescription,
      },
      {
        onSuccess: () => {
          setDescription(newDescription);
        },
      },
    );
  }
  const deleteLinkMutation = api.createLinkRouter.deleteLink.useMutation();

  function deleteLink() {
    deleteLinkMutation.mutate(
      {
        short: shorturl,
      },
      {
        onSuccess: () => {
          if (onDeleteLink) {
            onDeleteLink(); // Call the onDeleteLink function when the mutation is successful
          }
        },
      },
    );
  }

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(
      `https://short-me-omega.vercel.app/l/${shorturl}`,
    );
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="m-2 grid h-[71x] w-[370px] grid-cols-5 gap-4 rounded-lg border bg-card text-card-foreground shadow-md">
      <div className="col-span-1 row-span-2 m-auto flex items-center justify-center">
        <Avatar>
          <AvatarImage alt="Icono" src={avatarSrc} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-4 row-span-2 flex flex-col p-3 pl-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a
              href={`https://short-me-omega.vercel.app/l/${shorturl}`}
              className="text-m overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold"
            >
              {shorturl}
            </a>
            <MdContentCopy
              onClick={() => {
                copyToClipboard();
                toast({
                  description: "Your link has been copied to the clipboard!",
                });
              }}
              className="ml-2 mr-2 cursor-pointer hover:scale-125"
            />{" "}
            <Popover>
              <PopoverTrigger asChild>
                <button>
                  <MdQrCode className="mr-2 cursor-pointer hover:scale-125" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-50">
                <header className="mb-2 font-semibold">
                  Edit your QR code
                </header>
                <Separator />

                <div className="my-3 flex flex-row items-center">
                  <p>Logo</p>
                  <Checkbox
                    className="ml-2"
                    onCheckedChange={(isChecked) => {
                      if (typeof isChecked === "boolean") {
                        setIsChecked(isChecked);
                      }
                    }}
                  />
                </div>
                {isChecked && (
                  <QRCode
                    value={`https://short-me-omega.vercel.app/l/${shorturl}`}
                    size={200}
                    fgColor="#000000"
                    imageSettings={{
                      src: qrcodeimgstring,
                      width: 50,
                      height: 50,
                      excavate: false,
                    }}
                    style={{ border: "10px solid #ffffff" }}
                  />
                )}
                {!isChecked && (
                  <QRCode
                    value={`https://short-me-omega.vercel.app/l/${shorturl}`}
                    size={200}
                    fgColor="#000000"
                    style={{ border: "10px solid #ffffff" }}
                  />
                )}
              </PopoverContent>
            </Popover>
            <div className="flex flex-row items-center">
              <MdVisibility className="mr-[2px]" />
              <p className="text-sm text-muted-foreground">{clickcounter}</p>
            </div>
          </div>
          <div className="flex items-start space-x-1">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <button>
                    <MdModeEdit className="h-4 w-4 hover:scale-125 " />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Description</DialogTitle>
                    <DialogDescription>
                      Make changes to the description here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={updateLinkDescription}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <MdDelete className="h-4 w-4 hover:scale-125 " />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Delete Link</DialogTitle>
                    <DialogDescription>
                      Are you sure u want to delete this link?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant={"destructive"}
                      type="submit"
                      onClick={deleteLink}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {url}
        </p>
      </div>
      <div className="col-span-5 row-span-1 -mt-4 flex flex-col">
        <Separator />
        <div className="col-span-5 row-span-2 h-[105px] overflow-y-auto whitespace-normal">
          {description ? (
            <p className="p-3 text-sm ">{description}</p>
          ) : (
            <p className="p-3 text-sm text-muted-foreground">
              (Click the edit button to add a description.)
            </p>
          )}
        </div>
        <div>
          <p className="p-3 text-right text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashCard;
