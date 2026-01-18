"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CATEGORIES, LEVELS } from "@/types/competition";

const formSchema = z.object({
	title: z
		.string()
		.trim()
		.min(5, "Title must be at least 5 characters")
		.max(100, "Title must be at most 100 characters"),
	organizer: z
		.string()
		.trim()
		.min(3, "Organizer must be at least 3 characters")
		.max(100, "Organizer must be at most 100 characters"),
	description: z
		.string()
		.trim()
		.min(20, "Description must be at least 20 characters")
		.max(1000, "Description must be at most 1000 characters"),
	category: z.string().min(1, "Select category"),
	level: z.string().min(1, "Select level"),
	format: z.enum(["online", "offline", "hybrid"]),
	participationType: z.enum(["individual", "team"]),
	registrationStart: z.date(),
	registrationEnd: z.date(),
	registrationUrl: z.string().trim().url("URL is invalid"),
	prize: z.string().trim().min(1, "Enter prize"),
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
			"Competition submitted successfully! Our team will review within 1-2 working days."
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
								Submit Competition
							</h1>
							<p className="mt-2 text-sm text-muted-foreground">
								Help students across Indonesia discover new competitions
							</p>
						</div>

						<Form {...form}>
							<form
								className="space-y-6"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Competition Name</FormLabel>
											<FormControl>
												<Input placeholder="e.g., Gemastik XVII" {...field} />
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
											<FormLabel>Organizer</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g., Ministry of Education"
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
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													className="min-h-[100px] resize-none"
													placeholder="Describe this competition..."
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
												<FormLabel>Category</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select category" />
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
												<FormLabel>Level</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select level" />
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
															<SelectValue placeholder="Select format" />
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
												<FormLabel>Participation Type</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="individual">
															Individual
														</SelectItem>
														<SelectItem value="team">Team</SelectItem>
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
												<FormLabel>Registration Start</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																className={cn(
																	"w-full justify-start text-left font-normal",
																	!field.value && "text-muted-foreground"
																)}
																variant="outline"
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field.value ? (
																	format(field.value, "d MMM yyyy")
																) : (
																	<span>Pick a date</span>
																)}
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent align="start" className="w-auto p-0">
														<Calendar
															className={cn("p-3 pointer-events-auto")}
															initialFocus
															mode="single"
															onSelect={field.onChange}
															selected={field.value}
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
												<FormLabel>Registration End</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																className={cn(
																	"w-full justify-start text-left font-normal",
																	!field.value && "text-muted-foreground"
																)}
																variant="outline"
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field.value ? (
																	format(field.value, "d MMM yyyy")
																) : (
																	<span>Pick a date</span>
																)}
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent align="start" className="w-auto p-0">
														<Calendar
															className={cn("p-3 pointer-events-auto")}
															disabled={(date) => {
																const startDate =
																	form.getValues("registrationStart");
																return startDate ? date < startDate : false;
															}}
															initialFocus
															mode="single"
															onSelect={field.onChange}
															selected={field.value}
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
											<FormLabel>Registration Link</FormLabel>
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
											<FormLabel>Prize</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g., Total Rp 50 Million"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									className="w-full"
									disabled={isSubmitting}
									type="submit"
								>
									{isSubmitting ? "Sending..." : "Submit Competition"}
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
