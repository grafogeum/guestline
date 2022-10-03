import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const ButtonsStyled = { height: "255px", padding: 0, fontSize: "4rem" };

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper({
	images
}: {
	images: [{ url: string; alt: string }];
}) {
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return (
		<Box
			sx={{ maxWidth: 255 }}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "255px"
			}}
		>
			<AutoPlaySwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					position: "relative"
				}}
			>
				{images.map(({ url, alt }: { url: string; alt: string }) => (
					<div key={url}>
						{Math.abs(activeStep - 1) <= 2 ? (
							<Box
								component="img"
								sx={{
									height: 255,
									display: "block",
									maxWidth: 255,
									overflow: "hidden",
									width: "100%"
								}}
								src={url}
								alt={alt}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<MobileStepper
				style={{
					position: "absolute",
					background: "transparent",
					width: "255px",
					padding: 0,
					height: "255px"
				}}
				steps={0}
				position="static"
				activeStep={activeStep}
				nextButton={
					maxSteps && (
						<Button
							size="large"
							onClick={handleNext}
							disabled={activeStep === maxSteps - 1}
							color={"primary"}
							sx={ButtonsStyled}
						>
							{theme.direction === "rtl" ? (
								<KeyboardArrowLeft fontSize="inherit" />
							) : (
								<KeyboardArrowRight fontSize="inherit" />
							)}
						</Button>
					)
				}
				backButton={
					maxSteps > 1 && (
						<Button
							size="large"
							onClick={handleBack}
							disabled={activeStep === 0}
							color={"primary"}
							sx={ButtonsStyled}
						>
							{theme.direction === "rtl" ? (
								<KeyboardArrowRight fontSize="inherit" />
							) : (
								<KeyboardArrowLeft fontSize="inherit" />
							)}
						</Button>
					)
				}
			/>
		</Box>
	);
}

export default SwipeableTextMobileStepper;
