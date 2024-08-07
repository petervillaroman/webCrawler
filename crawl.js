/** @format */
import { JSDOM } from 'jsdom';

function normalizeURL(urlString) {
	const url = new URL(urlString);
	let normalizedUrl = url.hostname + url.pathname;
	if (normalizedUrl.endsWith('/')) {
		normalizedUrl = normalizedUrl.slice(0, -1);
	}
	return normalizedUrl;
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody);
	const urls = Array.from(dom.window.document.querySelectorAll('a')).map(
		(a) => {
			let newURL = new URL(a.href, baseURL).toString();
			if (newURL.endsWith('/')) {
				newURL = newURL.slice(0, -1);
			}
			return newURL;
		}
	);
	return urls;
}

function isSameDomain(baseURL, currentURL) {
	const baseDomain = new URL(baseURL).hostname;
	const currentDomain = new URL(currentURL).hostname;
	return baseDomain === currentDomain;
}

async function fetchAndParseURL(urlToFetch) {
	try {
		const response = await fetch(urlToFetch);
		if (!response.ok) {
			console.warn(
				`Failed to fetch ${urlToFetch}: ${response.status} ${response.statusText}`
			);
			return '';
		}
		const html = await response.text();
		return html;
	} catch (error) {
		console.error(`Error fetching ${urlToFetch}:`, error);
		return '';
	}
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	if (!isSameDomain(baseURL, currentURL)) {
		return pages;
	}

	const normalizedURL = normalizeURL(currentURL);
	if (pages[normalizedURL]) {
		pages[normalizedURL]++;
		return pages;
	}

	pages[normalizedURL] = 1;

	const html = await fetchAndParseURL(currentURL);
	if (!html) {
		return pages;
	}

	const urls = getURLsFromHTML(html, baseURL);
	for (const url of urls) {
		pages = await crawlPage(baseURL, url, pages);
	}

	return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
