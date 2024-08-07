/** @format */

function printReport(pages) {
	console.log('Report is starting...');
	for (const [url, count] of Object.entries(pages)) {
		// sort the entries by count
		const sortedEntries = Object.entries(pages).sort((a, b) => b[1] - a[1]);
		for (const [url, count] of sortedEntries) {
			console.log(`${url}: ${count}`);
		}
	}
}
export { printReport };
