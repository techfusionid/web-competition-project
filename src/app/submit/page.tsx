"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CATEGORIES, LEVELS } from "@/types/competition";
import { toast } from "sonner";

const formSchema = z.object({
	title: z
		.string()
		.trim()
		.min(5, "Judul minimal 5 karakter")
		.max(100, "Judul maksimal 100 karakter"),
	organizer: z
		.string()
		.trim()
		.min(3, "Penyelenggara minimal 3 karakter")
		.max(100, "Penyelenggara maksimal 100 karakter"),
	description: z
		.string()
		.trim()
		.min(20, "Deskripsi minimal 20 karakter")
		.max(1000, "Deskripsi maksimal 1000 karakter"),
	category: z.string().min(1, "Pilih kategori"),
	level: z.string().min(1, "Pilih tingkat"),
	format: z.enum(["online", "offline", "hybrid"]),
	participationType: z.enum(["individual", "team"]),
	registrationStart: z.date({
		required_error: "Pilih tanggal mulai pendaftaran",
	}),
	registrationEnd: z.date({
		required_error: "Pilih tanggal akhir pendaftaran",
	}),
	registrationUrl: z.string().trim().url("URL tidak valid"),
	prize: z.string().trim().min(1, "Masukkan hadiah"),
});

type FormData = z.infer<typeof formSchema>;

export default function SubmitPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			organizer: "",
			description: "",
			category: "",
			level: "",
			format: "online",
			participationType: "individual",
			registrationUrl: "",
			prize: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log("Submitted:", data);
		toast.success(
			"Kompetisi berhasil disubmit! Tim kami akan mereview dalam 1-2 hari kerja.",
		);
		form.reset();
		setIsSubmitting(false);
	};

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Header />
			<main className="flex-1 py-8 md:py-12">
				<div className="container">
					<div className="mx-auto max-w-2xl">
						<div className="mb-8 text-center">
							<h1 className="text-2xl font-semibold text-foreground md:text-3xl">
								Submit Kompetisi
							</h1>
							<p className="mt-2 text-sm text-muted-foreground">
								Bantu mahasiswa dan pelajar Indonesia menemukan kompetisi
								terbaru
							</p>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama Kompetisi</FormLabel>
											<FormControl>
												<Input placeholder="Contoh: Gemastik XVII" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="organizer"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Penyelenggara</FormLabel>
											<FormControl>
												<Input
													placeholder="Contoh: Kemendikbudristek"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Deskripsi</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Jelaskan tentang kompetisi ini..."
													className="min-h-[100px] resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid gap-4 sm:grid-cols-2">
									<FormField
										control={form.control}
										name="category"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kategori</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Pilih kategori" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{CATEGORIES.map((cat) => (
															<SelectItem key={cat} value={cat}>
																{cat}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="level"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tingkat</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Pilih tingkat" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{LEVELS.map((lvl) => (
															<SelectItem key={lvl.value} value={lvl.value}>
																{lvl.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<FormField
										control={form.control}
										name="format"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Format</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Pilih format" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="online">Online</SelectItem>
														<SelectItem value="offline">Offline</SelectItem>
														<SelectItem value="hybrid">Hybrid</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="participationType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tipe Partisipasi</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Pilih tipe" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="individual">
															Individual
														</SelectItem>
														<SelectItem value="team">Tim</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<FormField
										control={form.control}
										name="registrationStart"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Mulai Pendaftaran</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																className={cn(
																	"w-full justify-start text-left font-normal",
																	!field.value && "text-muted-foreground",
																)}
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field.value ? (
																	format(field.value, "d MMM yyyy", {
																		locale: id,
																	})
																) : (
																	<span>Pilih tanggal</span>
																)}
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															initialFocus
															className={cn("p-3 pointer-events-auto")}
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="registrationEnd"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Akhir Pendaftaran</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																className={cn(
																	"w-full justify-start text-left font-normal",
																	!field.value && "text-muted-foreground",
																)}
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field.value ? (
																	format(field.value, "d MMM yyyy", {
																		locale: id,
																	})
																) : (
																	<span>Pilih tanggal</span>
																)}
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) => {
																const startDate =
																	form.getValues("registrationStart");
																return startDate ? date < startDate : false;
															}}
															initialFocus
															className={cn("p-3 pointer-events-auto")}
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="registrationUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Link Pendaftaran</FormLabel>
											<FormControl>
												<Input placeholder="https://..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="prize"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Hadiah</FormLabel>
											<FormControl>
												<Input
													placeholder="Contoh: Total Rp 50 Juta"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Mengirim..." : "Submit Kompetisi"}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
