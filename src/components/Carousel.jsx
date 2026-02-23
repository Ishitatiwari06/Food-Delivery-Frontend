
import { useState, useEffect } from "react";

const Carousel = ({ search, setSearch }) => {
  const slides = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b"
];


  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-2xl group">
      {/* Search Bar Overlay */}
      <form
        className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-3/4 max-w-xl flex"
        onSubmit={e => e.preventDefault()}
        autoComplete="off"
      >
        <div className="relative w-full flex rounded-full overflow-hidden bg-white bg-opacity-90 border border-gray-300 shadow">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setSearch(e.target.value);
              }
            }}
            placeholder="Search for food items..."
            className="flex-1 px-4 py-2 bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10 rounded-full"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 focus:outline-none"
              tabIndex={-1}
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {slides.map((slide, idx) => (
        idx === current && (
          <img
            key={slide + '-' + idx}
            src={slide}
            alt={`slide-${idx}`}
            className="w-full h-full object-cover absolute top-0 left-0 brightness-50"
          />
        )
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border-2 border-white ${idx === current ? 'bg-white' : 'bg-transparent'} transition-colors duration-300`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
