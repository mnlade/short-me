import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete, MdContentCopy } from "react-icons/md";
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
}

const UserDashCard: React.FC<DashCardProps> = ({
  avatarSrc,
  username,
  shorturl,
  url,
  description: initialDescription,
  date,
  onDeleteLink,
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
              className="ml-2 cursor-pointer hover:scale-125"
            />{" "}
          </div>
          <div className="flex items-start space-x-1">
            {description && (
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <MdModeEdit className="-mt-2 h-4 w-4 hover:scale-125 " />
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
            )}
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
            <p className="p-3 text-sm text-muted-foreground">{description}</p>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-3 mt-2" variant="outline">
                  Add a new Description
                </Button>
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
