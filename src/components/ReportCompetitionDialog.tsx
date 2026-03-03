"use client";

import { Flag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Competition } from "@/types/competition";

interface ReportCompetitionDialogProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
}

const REPORT_REASONS = [
	{ value: "spam", label: "Spam atau iklan" },
	{ value: "incorrect", label: "Informasi salah / menyesatkan" },
	{ value: "duplicate", label: "Duplikat" },
	{ value: "inappropriate", label: "Konten tidak pantas" },
	{ value: "other", label: "Lainnya" },
] as const;

export function ReportCompetitionDialog({
	competition,
	isOpen,
	onClose,
}: ReportCompetitionDialogProps) {
	const [reason, setReason] = useState<string>("");
	const [details, setDetails] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!competition) return;
		// Placeholder: in production would POST to API or send email
		toast.success("Laporan telah dikirim. Terima kasih atas masukan Anda.");
		setReason("");
		setDetails("");
		onClose();
	};

	const handleClose = () => {
		setReason("");
		setDetails("");
		onClose();
	};

	if (!competition) return null;

	return (
		<Dialog onOpenChange={(open) => !open && handleClose()} open={isOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Flag className="h-5 w-5" />
						Laporkan Kompetisi
					</DialogTitle>
					<DialogDescription>
						Laporkan listing ini jika terdapat masalah. Laporan akan ditinjau oleh tim kami.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="report-reason">Alasan</Label>
						<select
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							id="report-reason"
							onChange={(e) => setReason(e.target.value)}
							required
							value={reason}
						>
							<option value="">Pilih alasan...</option>
							{REPORT_REASONS.map((r) => (
								<option key={r.value} value={r.value}>
									{r.label}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="report-details">Detail (opsional)</Label>
						<Textarea
							className="min-h-[80px] resize-none"
							id="report-details"
							onChange={(e) => setDetails(e.target.value)}
							placeholder="Jelaskan lebih lanjut jika perlu..."
							value={details}
						/>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={handleClose}>
							Batal
						</Button>
						<Button type="submit">Kirim Laporan</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
