import { useState, memo } from "react";
import { Image } from "../types";
import { useTheme } from "@mui/material/styles";
import { Box, styled } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const CarouselContainer = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "255px"
};

const CarouselView = {
	display: "flex",
	justifyContent: "center",
	width: "100%",
	position: "relative" as "relative"
};

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "255px",
	height: "200px",
	overflow: "hidden",
	aspectRatio: "16 / 9"
});

const StepperNavigation = {
	position: "absolute" as "absolute",
	background: "transparent",
	width: "255px",
	padding: 0,
	height: "200px"
};

const ButtonsStyled = { height: "255px", padding: 0, fontSize: "4rem" };

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SwipeableTextMobileStepper = memo(({ images }: { images: Image[] }) => {
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
		<Box sx={CarouselContainer}>
			<AutoPlaySwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
				style={CarouselView}
			>
				{images.map(({ url, alt = "" }: Image) => (
					<div key={url}>
						{Math.abs(activeStep - 1) <= 2 ? <Img src={url} alt={alt} /> : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<MobileStepper
				style={StepperNavigation}
				steps={0}
				position="static"
				activeStep={activeStep}
				nextButton={
					maxSteps > 1 && (
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
});

export default SwipeableTextMobileStepper;
