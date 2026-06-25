export function formatNumberWithCommas(value?: string | number | null) {
	const numericValue = Number(value ?? 0);

	if (Number.isNaN(numericValue)) {
		return "0.00";
	}

	return numericValue.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

export function formatCurrency(value?: string | number | null, prefix = "Rs.") {
	return `${prefix} ${formatNumberWithCommas(value)}`;
}
