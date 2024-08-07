/** @format */
import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
	if (argv.length < 3) {
		console.log('Not enough arguments. Usage: npm start <URL>');
		process.exit(1);
	}

	if (argv.length > 3) {
		console.log('Too many arguments. Usage: npm start <URL>');
		process.exit(1);
	}

	if (argv.length === 3) {
		const currentURL = argv[2];
		const pages = await crawlPage(currentURL);
		printReport(pages);
	}
}

main();
