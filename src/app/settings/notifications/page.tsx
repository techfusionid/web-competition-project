"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsNotificationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="font-medium text-lg">Email Notifications</h3>
				<p className="text-muted-foreground text-sm">
					Manage your email notification preferences.
				</p>
			</div>
			<Separator />

			<div className="space-y-8">
				{/* Engagement & Marketing Section */}
				<div>
					<h4 className="mb-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">
						Engagement & Marketing
					</h4>
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<Checkbox className="mt-1" defaultChecked id="weekly_roundup" />
							<div className="grid gap-1.5 leading-none">
								<Label
									className="font-medium text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="weekly_roundup"
								>
									Weekly Roundup
								</Label>
							</div>
						</div>
					</div>
				</div>

				<Separator />

				{/* Personalization Section */}
				<div>
					<h4 className="mb-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">
						Personalization
					</h4>
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<Checkbox className="mt-1" defaultChecked id="interest_tags" />
							<div className="grid gap-1.5 leading-none">
								<Label
									className="font-medium text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="interest_tags"
								>
									Interest Categories (Tags)
								</Label>
							</div>
						</div>

						<div className="flex items-start space-x-3">
							<Checkbox className="mt-1" defaultChecked id="location_based" />
							<div className="grid gap-1.5 leading-none">
								<Label
									className="font-medium text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="location_based"
								>
									Location-based Recommendations
								</Label>
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-start pt-4">
					<Button>Save preferences</Button>
				</div>
			</div>
		</div>
	);
}
