import './style.css';
import './components/topicSection/topicSection.js';

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
} else {
	scamWraper.style.display = 'none';
}

scamButton.addEventListener('click', () => {
	displayPopover('scam-popover');
});
