"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsProfilePage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="font-medium text-lg">Edit Profile</h3>
				<p className="text-muted-foreground text-sm">
					This is how others will see you on the site.
				</p>
			</div>
			<Separator />

			{/* Avatar Section */}
			<div className="flex items-center gap-x-6">
				<Avatar className="h-20 w-20">
					<AvatarImage alt="@agnesdevita" src="https://github.com/shadcn.png" />
					<AvatarFallback>AD</AvatarFallback>
				</Avatar>
				<div className="flex items-center gap-2">
					<Button size="sm" variant="outline">
						Upload new picture
					</Button>
					<Button className="bg-muted/50" size="sm" variant="ghost">
						Delete
					</Button>
				</div>
			</div>

			{/* Form */}
			<div className="space-y-8">
				<div className="grid gap-2">
					<Label htmlFor="name">
						Name <span className="text-red-500">*</span>
					</Label>
					<Input defaultValue="Agnes Devita Widjaja" id="name" />
				</div>

				<div className="grid gap-2">
					<Label htmlFor="location">Location</Label>
					<div className="relative">
						<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							className="pl-9"
							defaultValue="Indonesia"
							id="location"
							placeholder="Search location..."
						/>
					</div>
				</div>

				<div className="grid gap-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="bio">Bio</Label>
						<span className="text-muted-foreground text-xs">0/1024</span>
					</div>
					<Textarea
						className="min-h-[120px] resize-none"
						id="bio"
						placeholder="Brief description for your profile."
					/>
					<p className="text-muted-foreground text-xs">
						Brief description for your profile.
					</p>
				</div>

				<div className="flex justify-start">
					<Button>Save changes</Button>
				</div>
			</div>
		</div>
	);
}
