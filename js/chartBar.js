import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getChartData } from "./getChartData";
import { MobileDesktopStatesManager } from "./MobileDesktopStatesManager";

const getChart = () => {
	const barChart = getChartData();
	const labelsOnTop = {
		id: "labelsOnTop",
		afterDatasetsDraw(chart, args, pluginOptions) {
			const {
				ctx,
				scales: { x, y },
			} = chart;

			chart.data.datasets[0].data.forEach((datapoints, i) => {
				const datasetArray = [];

				chart.data.datasets.forEach(dataset =>
					datasetArray.push(dataset.data[i])
				);

				const sum = datasetArray
					.reduce((total, values) => total + values, 0)
					.toFixed(2);

				ctx.font = "bold 0.85rem sans-serif";
				ctx.fillStyle = chart.data.datasets[2].borderColor[i];
				ctx.textAlign = "center";
				ctx.fillText(
					sum,
					x.getPixelForValue(i),
					chart.getDatasetMeta(2).data[i].y - 10
				);
			});
		},
	};

	const config = {
		type: "bar",
		plugins: [ChartDataLabels, labelsOnTop],
		data: {
			labels: barChart.dataLabels,
			datasets: [
				{
					label: barChart.labels[0],
					data: barChart.data[0],
					backgroundColor: barChart.colors.basic[0],
					hoverBackgroundColor: barChart.colors.hover[0],
					borderColor: barChart.colors.hover[0],
					borderWidth: 2,
					datalabels: {
						// color: chart => chart.dataset.borderColor[chart.dataIndex],
						color: barChart.colors.hover[1],
					},
				},
				{
					label: barChart.labels[1],
					data: barChart.data[1],
					backgroundColor: barChart.colors.basic[1],
					hoverBackgroundColor: barChart.colors.hover[1],
					borderColor: barChart.colors.hover[1],
					borderWidth: 2,
					datalabels: { color: barChart.colors.hover[2] },
				},
				{
					label: barChart.labels[2],
					data: barChart.data[2],
					backgroundColor: barChart.colors.basic[2],
					hoverBackgroundColor: barChart.colors.hover[2],
					borderColor: barChart.colors.hover[2],
					borderWidth: 2,
					datalabels: { color: barChart.colors.hover[0] },
				},
			],
		},

		options: {
			plugins: {
				tooltip: { enabled: false },
			},
			maintainAspectRatio: false,
			scales: {
				x: { stacked: true },
				y: {
					beginAtZero: true,
					stacked: true,
					grace: 10,
				},
			},
		},
	};

	document
		.querySelectorAll(".chart-bar")
		.forEach(ctx => new Chart(ctx, config));
};

getChart();

// ---
const barsFontSize = new MobileDesktopStatesManager(
	() => {
		Chart.defaults.font.size = 8;
	},
	() => {
		Chart.defaults.font.size = 13;
	}
);
barsFontSize.toggleStateOn(576);

// {
// 	"head": [
// 		[
// 			"August",
// 			"September",
// 			"November",
// 			"December",
// 			"January",
// 			"February",
// 			"March"
// 		],
// 		["data-4", "data-5", "data-6"]
// 	],
// 	"data": [
// 		[31.11, 23.55, 26.18],
// 		[41.32, 27.78, 32.84],
// 		[25.62, 36.21, 27.95],
// 		[21.74, 47.07, 34.83],
// 		[25.76, 28.62, 29.11],
// 		[27.87, 38.55, 29.44],
// 		[36.43, 42.12, 35.68]
// 	]
// }
