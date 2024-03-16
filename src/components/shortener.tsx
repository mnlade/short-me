import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { api } from '~/utils/api';


const Shortener: React.FC = () => {
    const [bigurl, setUrl] = useState('');

    const createShortUrlMutation = api.urlRouter.createShortUrl.useMutation()

    function createShortUrl() {
        createShortUrlMutation.mutate({
            url: bigurl
        
        });
    }
    return (
        
            <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={(e) => {
                        e.preventDefault();
                        createShortUrl();
                    }}>
            <Input required id= "bigurl" type="url" placeholder="Place your Url Here" onChange={(e) => setUrl(e.target.value)} />
            <Button type="submit">Short-It</Button>
            </form>
          
    );
};

export default Shortener;