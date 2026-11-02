import { useEffect, useState } from 'react';
import cat01 from '../assets/cats/cat-01.jpg';
import cat02 from '../assets/cats/cat-02.jpg';
import cat03 from '../assets/cats/cat-03.jpg';
import cat04 from '../assets/cats/cat-04.jpg';
import './Photos.css';

const photos = [cat01, cat02, cat03, cat04];
const photoNames = ['Cleo 01.jpg', 'Tuna 01.jpg', 'Tuna 02.jpg', 'Cleo 02.jpg'];

export default function Photos({ keyboardActive = true }) {
  const [selected, setSelected] = useState(0);
  function move(direction) {
    setSelected(current => (current + direction + photos.length) % photos.length);
  }
  useEffect(() => {
    if (!keyboardActive) return;
    function handleArrow(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        setSelected(current => (current + direction + photos.length) % photos.length);
      }
    }
    window.addEventListener('keydown', handleArrow);
    return () => window.removeEventListener('keydown', handleArrow);
  }, [keyboardActive]);
  return (
    <section className="cat-gallery" aria-label="Cat photo gallery">
      <div className="photo-heading"><h2>My cats</h2><span>My Pictures</span></div>
      <div className="photo-preview"><img src={photos[selected]} alt={photoNames[selected].replace(/ \d+\.jpg$/, '')} /></div>
      <div className="photo-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous photo">◀</button>
        <span aria-live="polite">Photo {selected + 1} of {photos.length}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next photo">▶</button>
      </div>
      <div className="photo-filmstrip" aria-label="Choose a cat photo">
        {photos.map((src, index) => (
          <button type="button" key={src} aria-label={`View ${photoNames[index]}`} aria-pressed={selected === index} onClick={() => setSelected(index)}>
            <img src={src} alt="" /><span>{photoNames[index]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
