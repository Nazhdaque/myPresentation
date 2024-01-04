import { GetCustomPropsValues } from "./GetCustomPropsValues";
import { ChartValues } from "./ChartValues.js";

export const getChartData = async url => {
	const responce = await fetch(url);
	const data = await responce.json();
	const values = new ChartValues(data, chartColors);
	return values.getValues();
};

const getColors = new GetCustomPropsValues();
const clrValues = getColors.getValues([
	"--clr-1a",
	"--clr-1b",
	"--clr-2a",
	"--clr-2b",
	"--clr-2c",
]);

const chartColors = {
	basic: [
		`hsl(${clrValues[0]}, 0.6)`,
		`hsl(${clrValues[1]}, 0.6)`,
		`hsl(${clrValues[3]}, 0.6)`,
	],
	hover: [
		`hsl(${clrValues[0]}, 1)`,
		`hsl(${clrValues[1]}, 1)`,
		`hsl(${clrValues[3]}, 1)`,
	],
};
