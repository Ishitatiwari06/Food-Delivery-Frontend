import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryPage, setCategoryPage] = useState(0); // index of current category
  const [itemPage, setItemPage] = useState(0); // page for items within category
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/foodData`);
      const data = await response.json();
      setFoodItems(data.foodItems || data[0] || []);
      setFoodCategory(data.foodCategory || data[1] || []);
    } catch (error) {
      console.error("Error fetching food data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset item page when category changes
  useEffect(() => {
    setItemPage(0);
  }, [categoryPage, search]);

  return (
    <main className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-yellow-50 via-orange-100 to-pink-100">
      <h1 className="text-4xl font-extrabold mb-2 text-orange-600 drop-shadow-lg tracking-tight">Welcome to FoodieExpress!</h1>
      <p className="mb-8 text-lg text-gray-700">Discover the best food around you and get it delivered fast.</p>
      <div className="w-full mb-4 flex justify-center">
        <div className="w-full xl:w-[90vw] 2xl:w-[80vw]">
          <Carousel search={search} setSearch={setSearch} />
        </div>
      </div>
      {/* Category Pagination Controls - moved below carousel */}
      {foodCategory.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 my-6">
          <button
            onClick={() => setCategoryPage((p) => Math.max(0, p - 1))}
            disabled={categoryPage === 0}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold shadow-md transition disabled:opacity-50"
          >
            &#8592; Prev
          </button>
          {[...Array(foodCategory.length)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCategoryPage(idx)}
              className={`px-4 py-2 rounded-full font-semibold shadow-md border-2 transition-all duration-200 ${categoryPage === idx ? 'bg-pink-600 border-pink-600 text-white scale-110' : 'bg-white border-orange-300 text-orange-600 hover:bg-orange-100'}`}
            >
              {foodCategory[idx].CategoryName}
            </button>
          ))}
          <button
            onClick={() => setCategoryPage((p) => Math.min(foodCategory.length - 1, p + 1))}
            disabled={categoryPage === foodCategory.length - 1}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold shadow-md transition disabled:opacity-50"
          >
            Next &#8594;
          </button>
        </div>
      )}
      <div className="w-full max-w-5xl">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : foodCategory.length > 0 ? (
          (() => {
            // Filter items for the current category
            const currentCategory = foodCategory[categoryPage];
            if (!currentCategory) {
              return <div className="text-gray-500 italic text-center py-12">No such data found</div>;
            }
            const filteredItems = foodItems.filter(
              (item) =>
                item.CategoryName === currentCategory.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            // Pagination for items in current category
            const totalItemPages = Math.ceil(filteredItems.length / itemsPerPage);
            const paginatedItems = filteredItems.slice(itemPage * itemsPerPage, (itemPage + 1) * itemsPerPage);
            return <>
              <section key={currentCategory._id} className="mb-12">
                <h2 className="text-2xl font-bold text-pink-700 mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-6 bg-orange-400 rounded-full"></span>
                  {currentCategory.CategoryName}
                </h2>
                <hr className="mb-6 border-pink-200" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {paginatedItems.length > 0 ? paginatedItems.map(filterItems => (
                    <div key={filterItems._id} className="">
                      <Card {...filterItems} />
                    </div>
                  )) : <div className="text-gray-500 italic text-center py-12 col-span-3">No items found in this category</div>}
                </div>
                {/* Item Pagination Controls */}
                {totalItemPages > 1 && (
                  <div className="flex justify-center items-center gap-2 my-6">
                    <button
                      onClick={() => setItemPage((p) => Math.max(0, p - 1))}
                      disabled={itemPage === 0}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold shadow-md transition disabled:opacity-50"
                    >
                      &#8592; Prev
                    </button>
                    {[...Array(totalItemPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setItemPage(idx)}
                        className={`px-4 py-2 rounded-full font-semibold shadow-md border-2 transition-all duration-200 ${itemPage === idx ? 'bg-pink-600 border-pink-600 text-white scale-110' : 'bg-white border-orange-300 text-orange-600 hover:bg-orange-100'}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setItemPage((p) => Math.min(totalItemPages - 1, p + 1))}
                      disabled={itemPage === totalItemPages - 1}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold shadow-md transition disabled:opacity-50"
                    >
                      Next &#8594;
                    </button>
                  </div>
                )}
              </section>
            </>;
          })()
        ) : (
          <div className="text-center text-gray-400 py-12">Loading categories...</div>
        )}
      </div>
    </main>
  );
}

export default Home;
