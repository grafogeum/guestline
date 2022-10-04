import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const Rating = ({ value = 0 }: { value: number }) => {
	const maxRating = 5;
	const ratingStars = [
		...Array(value).fill(value),
		...Array(maxRating - value).fill(null)
	];

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ ml: 2 }}>
				{ratingStars.map((star, i) =>
					star ? <StarIcon key={i} /> : <StarBorderIcon key={i} />
				)}
			</Box>
		</Box>
	);
};
