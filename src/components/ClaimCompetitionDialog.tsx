"use client";

import { BadgeCheck } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Competition } from "@/types/competition";

interface ClaimCompetitionDialogProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ClaimCompetitionDialog({
	competition,
	isOpen,
	onClose,
}: ClaimCompetitionDialogProps) {
	const [email, setEmail] = useState("");
	const [proof, setProof] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!competition) return;
		// Placeholder: in production would POST to API for organizer verification
		toast.success("Klaim telah dikirim. Tim kami akan memverifikasi dan menghubungi Anda.");
		setEmail("");
		setProof("");
		onClose();
	};

	const handleClose = () => {
		setEmail("");
		setProof("");
		onClose();
	};

	if (!competition) return null;

	return (
		<Dialog onOpenChange={(open) => !open && handleClose()} open={isOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<BadgeCheck className="h-5 w-5" />
						Klaim sebagai Penyelenggara
					</DialogTitle>
					<DialogDescription>
						Klaim kompetisi "{competition.title}" jika Anda adalah penyelenggara resmi. Kami akan memverifikasi dan memberi Anda akses mengelola listing.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="claim-email">Email institusi / organisasi</Label>
						<Input
							className="h-9"
							id="claim-email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="email@organizer.com"
							required
							type="email"
							value={email}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="claim-proof">Bukti / keterangan (opsional)</Label>
						<Textarea
							className="min-h-[80px] resize-none"
							id="claim-proof"
							onChange={(e) => setProof(e.target.value)}
							placeholder="Link website resmi, surat resmi, atau keterangan lain..."
							value={proof}
						/>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={handleClose}>
							Batal
						</Button>
						<Button type="submit">Kirim Klaim</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
