import React from 'react'

export default function Card(props) {
  let options=props.options[0];
  let priceOptions=Object.keys(options);
  return (
    <div>
      <div className="mt-16 mb-32 bg-white rounded-lg shadow-lg w-72 flex flex-col">
        <img src={props.img} className="w-full h-48 object-cover" alt="..." />
        <div className="p-4 flex-1 flex flex-col">
          <h5 className="text-lg font-semibold mb-2">{props.name}</h5>
          <p className="text-gray-600 mb-4">{props.description}</p>
          <div className="flex w-full space-x-2 mt-auto">
            <select className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {Array.from(Array(6), (e, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <select className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">Add to Cart</button>
           

          </div>
        </div>
      </div>
    </div>
  )
}
