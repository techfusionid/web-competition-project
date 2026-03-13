"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { Competition } from "@/types/competition";

interface ReportCompetitionDialogProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ReportCompetitionDialog({
	competition,
	isOpen,
	onClose,
}: ReportCompetitionDialogProps) {
	const [details, setDetails] = useState("");

	const handleSubmit = () => {
		if (!details.trim()) {
			toast.error("Please provide information about your report.");
			return;
		}
		// Placeholder: in production would POST to API or send email
		toast.success("Report submitted. Thank you for your feedback.");
		setDetails("");
		onClose();
	};

	const handleClose = () => {
		setDetails("");
		onClose();
	};

	if (!competition) {
		return null;
	}

	return (
		<Dialog onOpenChange={(open) => !open && handleClose()} open={isOpen}>
			<DialogContent className="w-full max-w-[320px] rounded-2xl p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<svg
							className="h-5 w-5 text-muted-foreground"
							fill="none"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								clipRule="evenodd"
								d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.937 1.25 22.75 6.06293 22.75 12C22.75 17.937 17.937 22.75 12 22.75C10.1437 22.75 8.39536 22.2788 6.87016 21.4493L2.63727 22.2373C2.39422 22.2826 2.14448 22.2051 1.96967 22.0303C1.79485 21.8555 1.71742 21.6058 1.76267 21.3627L2.55076 17.1298C1.72113 15.6046 1.25 13.8563 1.25 12ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12.5672 16.501C12.8445 16.1933 12.8198 15.7191 12.512 15.4418C12.2043 15.1646 11.73 15.1893 11.4528 15.497L11.4428 15.5081C11.1655 15.8159 11.1902 16.2901 11.498 16.5673C11.8057 16.8446 12.28 16.8199 12.5572 16.5121L12.5672 16.501Z"
								fill="currentColor"
								fillRule="evenodd"
							/>
						</svg>
						<h2 className="font-semibold text-xl">Report Event</h2>
					</div>

					<p className="text-md text-muted-foreground">
						Please share more information about why you are reporting this
						event.
					</p>

					<Textarea
						className="min-h-[120px] w-full resize-none"
						onChange={(e) => setDetails(e.target.value)}
						placeholder="Any information you can share will be very helpful."
						value={details}
					/>

					<div className="flex w-full justify-end pt-2">
						<Button className="w-full" onClick={handleSubmit} size="sm">
							Submit Report
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
