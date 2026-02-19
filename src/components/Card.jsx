import React from 'react'

export default function Card() {
  return (
    <div>
      <div className="mt-16 mb-32 bg-white rounded-lg shadow-lg w-72 flex flex-col">
        <img src="https://source.unsplash.com/random/300x200/?food" className="w-full h-48 object-cover" alt="..." />
        <div className="p-4 flex-1 flex flex-col">
          <h5 className="text-lg font-semibold mb-2">Delicious Pizza</h5>
          <p className="text-gray-600 mb-4">Try our mouth-watering pizza with fresh ingredients and a crispy crust.</p>
          <div className="flex w-full space-x-2 mt-auto">
            <select className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {Array.from(Array(6), (e, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <select className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">Add to Cart</button>
           

          </div>
        </div>
      </div>
    </div>
  )
}
