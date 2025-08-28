import './style.css';
import './components/topicSection/topicSection.js';

function isPopoverSuported() {
	return Object.hasOwn(HTMLElement.prototype, 'popover');
}
const nonScamPopover = document.getElementById('not-a-scam-popover');

const scamWraper = document.getElementById('scam');
const scamButton = document.getElementById('scam-button');
const scamPopover = document.getElementById('scam-popover');

if (isPopoverSuported()) {
	scamPopover.popover = 'auto';
	scamButton.popoverTargetElement = scamPopover;
	scamButton.popoverTargetAction = 'toggle';

	nonScamPopover.addEventListener('beforetoggle', (event) => {
		console.log('popover event', event);
	});
} else {
	scamWraper.style.display = 'none';
}
