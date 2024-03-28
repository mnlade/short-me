import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { api } from '~/utils/api';


const Shortener: React.FC = () => {
    const [bigurl, setUrl] = useState('');

    const createShortUrlMutation = api.createLinkRouter.createShortUrl.useMutation()

    function createShortUrl() {
        createShortUrlMutation.mutate({
            url: bigurl
        
        });
    }
    return (
        <form
            className="flex w-[370px] m-2 items-center space-x-2"
            onSubmit={(e) => {
                e.preventDefault();
                createShortUrl();
                setUrl(''); // Clear the input value
            }}
        >
            <Input
                required
                id="bigurl"
                type="url"
                placeholder="Place your Url Here"
                value={bigurl} // Set the input value to the state value
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit">Short-It</Button>
        </form>
    );
};

export default Shortener;