// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ProductPage = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const { productId } = useParams();
//   console.log("product Id",productId)
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState('');

//   // Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`${backendUrl}/api/food/product/${productId}`);
//         setProduct(res.data);
//       } catch (error) {
//         toast.error("Failed to load product.");
//         navigate('/products');
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   // Submit rating
//   const handleSubmitRating = async () => {
//     try {
//       await axios.post(`${backendUrl}/api/food/rate/${productId}`, {
//         rating,
//         review,
//       });
//       toast.success("Rating submitted!");
//       // Refresh product data
//       const res = await axios.get(`${backendUrl}/api/food/product/${productId}`);
//       setProduct(res.data);
//     } catch (error) {
//       toast.error("Failed to submit rating.");
//     }
//   };

//   if (!product) return <div className="text-center p-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-5 text-blue-400 hover:text-blue-600"
//       >
//         ← Back to Products
//       </button>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         <div className="bg-zinc-700 rounded-lg p-5 flex justify-center">
//           <img 
//             src={`${backendUrl}/images/${product.image}`} 
//             alt={product.name} 
//             className="max-h-96 object-contain"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="space-y-4">
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           <p className="text-gray-300">{product.description}</p>
//           <p className="text-xl">Rs {product.price}</p>
//           <p className="text-sm">Stock: {product.stock}</p>

//           {/* Rating Display */}
//           <div className="mt-4">
//             <div className="flex items-center">
//               <div className="text-yellow-400 text-2xl">
//                 {'★'.repeat(Math.round(product.averageRating || 0))}
//                 {'☆'.repeat(5 - Math.round(product.averageRating || 0))}
//               </div>
//               <span className="ml-2">
//                 ({product.ratings?.length || 0} reviews)
//               </span>
//             </div>
//           </div>

//           {/* Rating Form */}
//           <div className="mt-6 border-t pt-4">
//             <h3 className="font-medium mb-3">Rate this product</h3>
//             <div className="flex gap-1 mb-3">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button 
//                   key={star} 
//                   onClick={() => setRating(star)}
//                   className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
//                 >
//                   {star <= rating ? '★' : '☆'}
//                 </button>
//               ))}
//             </div>
//             <textarea
//               placeholder="Your review (optional)"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               className="w-full bg-zinc-700 rounded p-2 min-h-20"
//             />
//             <button
//               onClick={handleSubmitRating}
//               disabled={!rating}
//               className={`mt-2 px-4 py-2 rounded ${rating ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'}`}
//             >
//               Submit Rating
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Existing Reviews */}
//       <div className="mt-10">
//         <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
//         {product.ratings?.length > 0 ? (
//           product.ratings.map((rating, i) => (
//             <div key={i} className="mb-4 pb-4 border-b border-zinc-700">
//               <div className="flex gap-1 text-yellow-400">
//                 {'★'.repeat(rating.rating)}
//               </div>
//               <p className="mt-1">{rating.review}</p>
//               <p className="text-xs text-gray-400 mt-1">
//                 {new Date(rating.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;



import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const RatingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/food/${id}`)
        setProduct(response.data)
      } catch (error) {
        toast.error("Failed to load product")
        navigate('/Products')
      }
    }
    fetchProduct()
  }, [id])

  const handleSubmitRating = async () => {
    try {
      await axios.post(`${backendUrl}/api/food/rate/${id}`, {
        rating,
        review
      })
    
      toast.success("Rating submitted!")
      const response = await axios.get(`${backendUrl}/api/food/${id}`)
      setProduct(response.data)
    } catch (error) {
      toast.error("Failed to submit rating")
    }
  }

  if (!product) return <div className="text-center p-10">Loading...</div>

  return (
 <>
 <ToastContainer/>
 <div className="max-w-4xl mx-auto p-5">

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-zinc-700 rounded-lg p-5 flex justify-center">
          <img 
            src={`${backendUrl}/images/${product.image}`} 
            alt={product.name} 
            className="max-h-96 object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-xl">Rs {product.price}</p>
          <p className="text-sm">Stock: {product.stock}</p>

          <div className="mt-4">
            <div className="flex items-center">
              <div className="text-yellow-400 text-2xl">
                {'★'.repeat(Math.round(product.averageRating || 0))}
                {'☆'.repeat(5 - Math.round(product.averageRating || 0))}
              </div>
              <span className="ml-2">
                ({product.ratings?.length || 0} reviews)
              </span>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-3">Rate this product</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  {star <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Your review (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full bg-zinc-700 rounded p-2 min-h-20"
            />
            <button
              onClick={handleSubmitRating}
              disabled={!rating}
              className={`mt-2 px-4 py-2 rounded ${rating ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'}`}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
        {product.ratings?.length > 0 ? (
          product.ratings.map((rating, i) => (
            <div key={i} className="mb-4 pb-4 border-b border-zinc-700">
              <div className="flex gap-1 text-yellow-400">
                {'★'.repeat(rating.rating)}
              </div>
              <p className="mt-1">{rating.review}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(rating.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
 </>
  )
}

export default RatingPage