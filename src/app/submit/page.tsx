"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { type Control, type FieldPath, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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

// ─── Reusable form field components ───────────────────────────────────────

interface TextFieldProps {
	control: Control<FormData>;
	name: FieldPath<FormData>;
	label: string;
	placeholder: string;
}

function TextField({ control, name, label, placeholder }: TextFieldProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							onBlur={field.onBlur}
							onChange={field.onChange}
							placeholder={placeholder}
							ref={field.ref}
							value={field.value as string}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

interface TextareaFieldProps {
	control: Control<FormData>;
	name: FieldPath<FormData>;
	label: string;
	placeholder: string;
}

function TextareaField({
	control,
	name,
	label,
	placeholder,
}: TextareaFieldProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							className="min-h-[100px] resize-none"
							onBlur={field.onBlur}
							onChange={field.onChange}
							placeholder={placeholder}
							ref={field.ref}
							value={field.value as string}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

interface SelectOption {
	value: string;
	label: string;
}

interface SelectFieldProps {
	control: Control<FormData>;
	name: FieldPath<FormData>;
	label: string;
	placeholder: string;
	options: SelectOption[];
}

function SelectField({
	control,
	name,
	label,
	placeholder,
	options,
}: SelectFieldProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} value={field.value as string}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

interface DatePickerFieldProps {
	control: Control<FormData>;
	name: FieldPath<FormData>;
	label: string;
	minDate?: Date;
}

function DatePickerField({
	control,
	name,
	label,
	minDate,
}: DatePickerFieldProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
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
								className={cn("pointer-events-auto p-3")}
								disabled={minDate ? (date) => date < minDate : undefined}
								initialFocus
								mode="single"
								onSelect={field.onChange}
								selected={field.value as Date}
							/>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// ─── Page component ───────────────────────────────────────────────────────

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
		<main className="py-8 md:py-12">
			<div className="container">
				<div className="mx-auto max-w-2xl">
					<div className="mb-8 text-center">
						<h1 className="font-semibold text-2xl text-foreground md:text-3xl">
							Submit Competition
						</h1>
						<p className="mt-2 text-muted-foreground text-sm">
							Help students across Indonesia discover new competitions
						</p>
					</div>

					<Form {...form}>
						<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
							<TextField
								control={form.control}
								label="Competition Name"
								name="title"
								placeholder="e.g., Gemastik XVII"
							/>

							<TextField
								control={form.control}
								label="Organizer"
								name="organizer"
								placeholder="e.g., Ministry of Education"
							/>

							<TextareaField
								control={form.control}
								label="Description"
								name="description"
								placeholder="Describe this competition..."
							/>

							<div className="grid gap-4 sm:grid-cols-2">
								<SelectField
									control={form.control}
									label="Category"
									name="category"
									options={CATEGORIES.map((c) => ({ value: c, label: c }))}
									placeholder="Select category"
								/>

								<SelectField
									control={form.control}
									label="Level"
									name="level"
									options={LEVELS.map((l) => ({
										value: l.value,
										label: l.label,
									}))}
									placeholder="Select level"
								/>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<SelectField
									control={form.control}
									label="Format"
									name="format"
									options={[
										{ value: "online", label: "Online" },
										{ value: "offline", label: "Offline" },
										{ value: "hybrid", label: "Hybrid" },
									]}
									placeholder="Select format"
								/>

								<SelectField
									control={form.control}
									label="Participation Type"
									name="participationType"
									options={[
										{ value: "individual", label: "Individual" },
										{ value: "team", label: "Team" },
									]}
									placeholder="Select type"
								/>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<DatePickerField
									control={form.control}
									label="Registration Start"
									name="registrationStart"
								/>

								<DatePickerField
									control={form.control}
									label="Registration End"
									minDate={form.watch("registrationStart")}
									name="registrationEnd"
								/>
							</div>

							<TextField
								control={form.control}
								label="Registration Link"
								name="registrationUrl"
								placeholder="https://..."
							/>

							<TextField
								control={form.control}
								label="Prize"
								name="prize"
								placeholder="e.g., Total Rp 50 Million"
							/>

							<Button className="w-full" disabled={isSubmitting} type="submit">
								{isSubmitting ? "Sending..." : "Submit Competition"}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</main>
	);
}
