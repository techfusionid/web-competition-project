import { ImageResponse } from "@cf-wasm/og/edge-light";
import type { NextRequest } from "next/server";

const WIDTH = 1200;
const HEIGHT = 630;

export const runtime = "edge";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const title = searchParams.get("title") || "Competition";
	const category = searchParams.get("category") || "";
	const type = searchParams.get("type") || "default";

	const fontSize = title.length > 50 ? 40 : title.length > 30 ? 48 : 60;

	return await ImageResponse.async(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: WIDTH,
				height: HEIGHT,
				position: "relative",
				overflow: "hidden",
				background:
					"linear-gradient(135deg, #161f35 0%, #1e2a3e 50%, #1a2940 100%)",
				fontFamily: "sans-serif",
			}}
		>
			{/* Grid overlay */}
			<div
				style={{
					position: "absolute",
					inset: "0px",
					opacity: 0.04,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Primary glow */}
			<div
				style={{
					position: "absolute",
					width: 500,
					height: 500,
					borderRadius: "50%",
					background:
						"radial-gradient(circle, rgba(120,140,255,0.15) 0%, transparent 70%)",
					top: -100,
					right: -100,
				}}
			/>

			{/* Accent glow */}
			<div
				style={{
					position: "absolute",
					width: 350,
					height: 350,
					borderRadius: "50%",
					background:
						"radial-gradient(circle, rgba(255,120,100,0.12) 0%, transparent 70%)",
					bottom: -80,
					left: 100,
				}}
			/>

			{/* Content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					height: "100%",
					padding: "0px 70px",
					position: "relative",
				}}
			>
				{/* Badge */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						padding: "4px 14px",
						background: "rgba(255,120,100,0.9)",
						color: "#f5f5fa",
						fontSize: 14,
						fontWeight: 500,
						borderRadius: 4,
						marginBottom: 20,
						alignSelf: "flex-start",
					}}
				>
					{type === "competition"
						? (category || "COMPETITION").toUpperCase()
						: "COMPETITION PLATFORM"}
				</div>

				{/* Title */}
				<div
					style={{
						color: "#f5f5fa",
						fontSize,
						fontWeight: 700,
						margin: "0px",
						lineHeight: 1.15,
						maxWidth: 900,
					}}
				>
					{title}
				</div>

				{/* Divider */}
				<div
					style={{
						width: 80,
						height: 3,
						background: "#ff7864",
						marginTop: type === "competition" ? 20 : 24,
					}}
				/>

				{/* Tagline for default type */}
				{type === "default" && (
					<div
						style={{
							color: "#a0aabe",
							fontSize: 24,
							marginTop: 16,
							fontWeight: 400,
						}}
					>
						Discover &amp; Join Exciting Competitions
					</div>
				)}
			</div>

			{/* URL bottom-right */}
			<div
				style={{
					position: "absolute",
					bottom: 24,
					right: 70,
					color: "rgba(160,170,190,0.6)",
					fontSize: 14,
					fontWeight: 500,
				}}
			>
				competition.techfusion.id
			</div>
		</div>,
		{ width: WIDTH, height: HEIGHT }
	);
}
