// Search only the local product catalogue. No information is sent anywhere.
const searchForm = document.querySelector('#product-search');
const searchInput = document.querySelector('#search-input');
const feedback = document.querySelector('#search-feedback');
const message = document.querySelector('#search-message');
const sections = document.querySelectorAll('#mice, #mousepads');
const cards = document.querySelectorAll('.product-card');

function filterProducts(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.hidden = !words.every(word => text.includes(word));
    if (!card.hidden) count++;
  });
  sections.forEach(section => {
    section.hidden = ![...section.querySelectorAll('.product-card')].some(card => !card.hidden);
  });
  feedback.hidden = words.length === 0;
  message.textContent = count ? `${count} product${count === 1 ? '' : 's'} found for “${query.trim()}”.` : `No products found for “${query.trim()}”. Try a brand, mouse or mousepad.`;
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  filterProducts(searchInput.value);
  document.querySelector('#products').scrollIntoView({ behavior: 'auto' });
});
searchInput.addEventListener('input', () => {
  if (!searchInput.value.trim()) filterProducts('');
});
document.querySelector('#clear-search').addEventListener('click', () => {
  searchInput.value = '';
  filterProducts('');
  searchInput.focus({ preventScroll: true });
});
