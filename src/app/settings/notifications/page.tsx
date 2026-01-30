"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsNotificationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Email Notifications</h3>
				<p className="text-sm text-muted-foreground">
					Manage your email notification preferences.
				</p>
			</div>
			<Separator />

			<div className="space-y-8">
                {/* Engagement & Marketing Section */}
                <div>
                    <h4 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">Engagement & Marketing</h4>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox id="weekly_roundup" defaultChecked className="mt-1" />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="weekly_roundup" className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Weekly Roundup
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Separator />

                {/* Personalization Section */}
                <div>
                    <h4 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">Personalization</h4>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox id="interest_tags" defaultChecked className="mt-1" />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="interest_tags" className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Interest Categories (Tags)
                                </Label>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <Checkbox id="location_based" defaultChecked className="mt-1" />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="location_based" className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
