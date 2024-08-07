/** @format */

import { test, expect } from '@jest/globals';
import { normalizeURL, getURLsFromHTML } from './crawl';

test('strips http:// or https:// from URL', () => {
	expect(normalizeURL('http://www.example.com')).toBe('www.example.com');
	expect(normalizeURL('https://www.example.com')).toBe('www.example.com');
});
test('gets anchor tags from HTML - single link', () => {
	expect(
		getURLsFromHTML(
			'<a href="http://www.example.com">Example</a>',
			'http://www.example.com'
		)
	).toEqual(['http://www.example.com']);
});

test('gets anchor tags from HTML - multiple links', () => {
	expect(
		getURLsFromHTML(
			'<a href="http://www.example.com">Example</a><a href="http://www.example.com/2">Example 2</a>',
			'http://www.example.com'
		)
	).toEqual(['http://www.example.com', 'http://www.example.com/2']);
});

test('gets anchor tags from HTML - with nested elements', () => {
	expect(
		getURLsFromHTML(
			`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`
		)
	).toEqual(['https://blog.boot.dev']);
});
