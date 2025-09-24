import './style.css';
import './components/topicSection/topicSection.js';

/***********
 * POPOVER *
 ***********/

function isPopoverSuported() {
	return Object.hasOwn(HTMLElement.prototype, 'popover');
}

export function displayPopover(popoverId) {
	console.log('show popover', popoverId);
	const popover = document.getElementById(popoverId);
	if (isPopoverSuported() && popover) {
		popover.showPopover();
	}
}

const nonScamPopover = document.getElementById('not-a-scam-popover');

const scamWraper = document.getElementById('scam');
const scamButton = document.getElementById('scam-button');

if (isPopoverSuported()) {
	nonScamPopover.addEventListener('beforetoggle', (event) => {
		console.log('popover event', event);
	});

	scamButton.popoverTargetAction = 'show';
	scamButton.addEventListener('click', () => {
		displayPopover('scam-popover');
		document.getElementsByTagName('body')[0].inert = true;
	});
} else {
	scamWraper.style.display = 'none';
}

/********************
 * CUSTOM HIGHLIGHT *
 ********************/
const SEARCH_HIGHLIGHT_NAME = 'search-results';
const searchInput = document.getElementById('search-input');
const searchContentParagraph = document.getElementById('search-content').firstChild;
const searchableContent = searchContentParagraph.textContent;

if (searchInput) {
	searchInput.addEventListener('input', (event) => {
		highlightText(event.target.value);
	});
}

function highlightText(search) {
	const ranges = [];

	if (search && search.trim().length > 0) {
		const searchRegex = new RegExp(search, 'gi');

		const searchHitIndexes = [...searchableContent.matchAll(searchRegex)].map((a) => a.index);

		searchHitIndexes.forEach((matchIndex) => {
			const searchRange = new Range();
			searchRange.setStart(searchContentParagraph, matchIndex);
			searchRange.setEnd(searchContentParagraph, matchIndex + search.length);

			ranges.push(searchRange);
		});

		console.log('### ranges ###', ranges);
	}
	const searchHighlight = new Highlight(...ranges);
	// Set the CSS highlight
	CSS.highlights.set(SEARCH_HIGHLIGHT_NAME, searchHighlight);
}
