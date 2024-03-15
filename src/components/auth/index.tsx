import Image from "next/image"
import * as React from "react"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function LogIn() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign in to Short-Me</CardTitle>
        <CardDescription>Start making short links</CardDescription>
      </CardHeader>
      <CardContent>    
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
            <Button>
                <span>Sign in with GitHub </span>
                <GitHubLogoIcon className="ml-2 h-6 w-6 " />
                
            </Button>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        
      </CardFooter>
    </Card>
  )
}
