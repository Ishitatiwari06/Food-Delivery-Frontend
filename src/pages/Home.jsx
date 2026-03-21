import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(9); // Items per page
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadData = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/foodData?page=${pageNum}&limit=${limit}`);
      const data = await response.json();
      setFoodItems(data.foodItems || []);
      setFoodCategory(data.foodCategory || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching food data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(page);
    // eslint-disable-next-line
  }, [page]);


  // Pagination controls
  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <main className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-yellow-50 via-orange-100 to-pink-100">
      <h1 className="text-4xl font-extrabold mb-2 text-orange-600 drop-shadow-lg tracking-tight">Welcome to FoodieExpress!</h1>
      <p className="mb-8 text-lg text-gray-700">Discover the best food around you and get it delivered fast.</p>
      <div className="w-full mb-12 flex justify-center">
        <div className="w-full xl:w-[90vw] 2xl:w-[80vw]">
          <Carousel search={search} setSearch={setSearch} />
        </div>
      </div>
      <div className="w-full max-w-5xl">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : foodCategory.length > 0 ? (
          (() => {
            const categoriesWithMatches = foodCategory.map((category) => {
              const filteredItems = foodItems.filter(
                (item) =>
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              );
              return filteredItems.length > 0 ? { ...category, filteredItems } : null;
            }).filter(Boolean);

            if (categoriesWithMatches.length === 0) {
              return <div className="text-gray-500 italic text-center py-12">No such data found</div>;
            }

            return <>
              {categoriesWithMatches.map((category) => (
                <section key={category._id} className="mb-12">
                  <h2 className="text-2xl font-bold text-pink-700 mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-6 bg-orange-400 rounded-full"></span>
                    {category.CategoryName}
                  </h2>
                  <hr className="mb-6 border-pink-200" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {category.filteredItems.map(filterItems => (
                      <div key={filterItems._id} className="">
                        <Card {...filterItems} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 my-8">
                  <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 rounded bg-orange-200 text-orange-700 disabled:opacity-50">Prev</button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(idx + 1)}
                      className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button onClick={handleNext} disabled={page === totalPages} className="px-3 py-1 rounded bg-orange-200 text-orange-700 disabled:opacity-50">Next</button>
                </div>
              )}
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
