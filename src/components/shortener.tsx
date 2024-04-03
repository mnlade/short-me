import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { api } from "~/utils/api";

const Shortener: React.FC = () => {
    const [bigurl, setUrl] = useState("");
    const [userdescription, setDescription] = useState("");

    const createShortUrlWithDescriptionMutation =
        api.createLinkRouter.createShortUrlWithDescription.useMutation();

    function createShortUrlWithDescription() {
        createShortUrlWithDescriptionMutation.mutate({
            url: bigurl,
            description: userdescription,
        });
    }
    return (
        <div>
            <div className="flex items-center justify-between sm:mx-2 md:mx-20 lg:mx-80">
                <h2 className=" text-left text-2xl font-bold">
                    It`s a <span className=" text-sky-500">good</span> day to{" "}
                    <span className=" text-sky-500">create</span> a new{" "}
                    <span className=" text-sky-500">link!</span>
                </h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="mr-2 font-bold ">
                            Add a new link
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="">
                                <form
                                    className="flex flex-col"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        createShortUrlWithDescription();
                                        setUrl("");
                                        setDescription(""); // Clear the input value
                                    }}
                                >
                                    <h4 className="mb-2 font-medium leading-none">
                                        Place ur Url here
                                    </h4>

                                    <Input
                                        className="mb-2"
                                        required
                                        id="bigurl"
                                        type="url"
                                        placeholder="Https://example.com"
                                        value={bigurl} // Set the input value to the state value
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                    <h4 className="mb-2 font-medium leading-none">
                                        Description{" "}
                                        <span className="text-sm text-muted-foreground">
                                            (Optional)
                                        </span>
                                    </h4>
                                    <Input
                                        className="mb-8"
                                        id="userdescription"
                                        type="text"
                                        placeholder="Introduce your description here"
                                        value={userdescription}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Button className="mb-2" type="submit">Short-It</Button>
                                </form>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Shortener;
                  