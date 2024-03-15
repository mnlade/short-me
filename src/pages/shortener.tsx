import {type NextPage} from 'next';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';


const Shortener:NextPage = () => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#101010] to-[#090a12]'>
            <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="url" placeholder="Place your Url Here" />
            <Button type="submit">Short-It</Button>
            </div>
        </div>
    )
}

export default Shortener;
