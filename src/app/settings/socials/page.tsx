"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsSocialsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Social Profiles</h3>
				<p className="text-sm text-muted-foreground">
					Add your social profiles to build your network.
				</p>
			</div>
			<Separator />

			<div className="space-y-8">
				<div className="grid gap-2">
					<Label htmlFor="twitter">X</Label>
					<Input id="twitter" placeholder="https://x.com/username" />
				</div>

				<div className="grid gap-2">
					<Label htmlFor="facebook">Facebook</Label>
					<Input id="facebook" placeholder="https://facebook.com/username" />
				</div>

                {/* Figma - styled specially as in screenshot */}
				<div className="grid gap-2">
					<Label htmlFor="figma">Figma</Label>
                    <div className="pt-1">
                        <Button variant="secondary" className="bg-[#1e1e1e] text-white hover:bg-[#2e2e2e]">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49999 7.50001V3.75001C7.49999 2.71447 6.66065 1.87501 5.62499 1.87501C4.58946 1.87501 3.74999 2.71447 3.74999 3.75001C3.74999 4.78554 4.58946 5.62501 5.62499 5.62501H7.49999ZM7.49999 7.50001V11.25C7.49999 12.2855 6.66065 13.125 5.62499 13.125C4.58946 13.125 3.74999 12.2855 3.74999 11.25C3.74999 10.2145 4.58946 9.37501 5.62499 9.37501H7.49999V7.50001ZM7.49999 7.50001H9.375C10.4105 7.50001 11.25 6.66054 11.25 5.62501C11.25 4.58947 10.4105 3.75001 9.375 3.75001C8.33946 3.75001 7.49999 4.58947 7.49999 5.62501V7.50001ZM5.62499 5.62501V9.37501C4.58946 9.37501 3.74999 8.53554 3.74999 7.50001C3.74999 6.46447 4.58946 5.62501 5.62499 5.62501Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            Connect to Figma
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Not shown on profile.
                    </p>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="instagram">Instagram</Label>
					<Input id="instagram" placeholder="https://instagram.com/username" />
				</div>
                
                <div className="grid gap-2">
					<Label htmlFor="threads">Threads</Label>
					<Input id="threads" placeholder="https://threads.net/username" />
				</div>

                <div className="grid gap-2">
					<Label htmlFor="github">GitHub</Label>
					<Input id="github" placeholder="https://github.com/username" />
				</div>

                <div className="grid gap-2">
					<Label htmlFor="linkedin">LinkedIn</Label>
					<Input id="linkedin" placeholder="https://linkedin.com/in/username" />
				</div>

				<div className="flex justify-start">
					<Button>Save changes</Button>
				</div>
			</div>
		</div>
	);
}
