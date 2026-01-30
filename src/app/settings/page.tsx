"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

export default function SettingsProfilePage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Edit Profile</h3>
				<p className="text-sm text-muted-foreground">
					This is how others will see you on the site.
				</p>
			</div>
			<Separator />
			
			{/* Avatar Section */}
			<div className="flex items-center gap-x-6">
				<Avatar className="h-20 w-20">
					<AvatarImage src="https://github.com/shadcn.png" alt="@agnesdevita" />
					<AvatarFallback>AD</AvatarFallback>
				</Avatar>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						Upload new picture
					</Button>
					<Button variant="ghost" size="sm" className="bg-muted/50">
						Delete
					</Button>
				</div>
			</div>

			{/* Form */}
			<div className="space-y-8">
				<div className="grid gap-2">
					<Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
					<Input id="name" defaultValue="Agnes Devita Widjaja" />
				</div>

				<div className="grid gap-2">
					<Label htmlFor="location">Location</Label>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							id="location"
							placeholder="Search location..."
							className="pl-9"
							defaultValue="Indonesia"
						/>
					</div>
				</div>

				<div className="grid gap-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="bio">Bio</Label>
						<span className="text-xs text-muted-foreground">0/1024</span>
					</div>
					<Textarea
						id="bio"
						placeholder="Brief description for your profile."
						className="min-h-[120px] resize-none"
					/>
					<p className="text-xs text-muted-foreground">
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
