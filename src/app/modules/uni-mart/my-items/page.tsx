// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getUserProducts, deleteProduct } from "../services/product.service";
// import Link from "next/link";
// import { Product } from "../types";
// import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";

// export default function MyItemsPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [deleteError, setDeleteError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setIsLoading(true);
//         // Only load AVAILABLE items for Active Listings page
//         const data = await getUserProducts("AVAILABLE");
//         setProducts(data);
//       } catch (error) {
//         console.error("Failed to load products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   const handleDelete = async (productId: string) => {
//     const confirmed = window.confirm("Are you sure you want to delete this item?");
//     if (!confirmed) return;

//     try {
//       setDeletingId(productId);
//       setDeleteError(null);
//       await deleteProduct(productId);
//       setProducts((previous) => previous.filter((product) => product.id !== productId));
//     } catch (error) {
//       console.error("Failed to delete product:", error);
//       const message = error instanceof Error ? error.message : "Failed to delete item";
//       setDeleteError(message);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <p className="text-gray-500">Loading your items...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6"
//       >
//         <ArrowLeft size={20} />
//         Back
//       </button>

//       {/* Tabs Navigation */}
//       <div className="flex gap-6 border-b mb-8 pb-0">
//         <button
//           onClick={() => {}}
//           className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-3 px-1 transition"
//         >
//           Active Listings
//         </button>
//         <button
//           onClick={() => router.push("/modules/uni-mart/sales-history")}
//           className="text-gray-500 hover:text-gray-700 pb-3 px-1 transition border-b-2 border-transparent hover:border-gray-300"
//         >
//           Sales History
//         </button>
//       </div>

//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">Active Listings</h1>
//           <p className="text-gray-600 mt-2">Items available for buyers</p>
//         </div>
//         <Link
//           href="/modules/uni-mart/new"
//           className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium"
//         >
//           <Plus size={20} />
//           Post New Item
//         </Link>
//       </div>

//       {deleteError && (
//         <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
//           {deleteError}
//         </div>
//       )}

//       {products.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-12 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//             <Plus className="text-gray-400" size={32} />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">No Items Yet</h2>
//           <p className="text-gray-600 mb-6">
//             You haven't posted any items yet. Start selling today!
//           </p>
//           <Link
//             href="/modules/uni-mart/new"
//             className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium"
//           >
//             Post Your First Item
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               {/* Image */}
//               <div className="relative h-40 bg-gray-200">
//                 {product.images[0] ? (
//                   <img
//                     src={product.images[0]}
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400">
//                     No image
//                   </div>
//                 )}
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
//                   {product.title}
//                 </h3>
//                 <p className="text-2xl font-bold text-blue-600 mb-3">
//                   Rs. {product.price.toLocaleString()}
//                 </p>

//                 <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
//                   <span>{product.category}</span>
//                   <span className="bg-gray-100 px-2 py-1 rounded">
//                     {product.condition}
//                   </span>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 pt-4 border-t">
//                   <Link
//                     href={`/modules/uni-mart/my-items/${product.id}/edit`}
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 font-medium transition-colors"
//                   >
//                     <Edit2 size={16} />
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     disabled={deletingId === product.id}
//                     className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     <Trash2 size={16} />
//                     {deletingId === product.id ? "Deleting..." : "Delete"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProducts, deleteProduct } from "../services/product.service";
import Link from "next/link";
import { Product } from "../types";
import { Plus, Edit2, Trash2, ArrowLeft, PackageSearch, Tag } from "lucide-react";

export default function MyItemsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // Only load AVAILABLE items for Active Listings page
        const data = await getUserProducts("AVAILABLE");
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      setDeletingId(productId);
      setDeleteError(null);
      await deleteProduct(productId);
      setProducts((previous) => previous.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
      const message = error instanceof Error ? error.message : "Failed to delete item";
      setDeleteError(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Top Navigation Bar */}
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
          <ArrowLeft size={18} />
        </div>
        Back to Dashboard
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Active Listings
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage your currently available items for sale
          </p>
        </div>
        <Link
          href="/modules/uni-mart/new"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold active:scale-[0.98]"
        >
          <Plus size={20} strokeWidth={2.5} />
          Post New Item
        </Link>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button
          onClick={() => {}}
          className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-4 px-1 transition-all"
        >
          Active Listings
          <span className="ml-2 bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs">
            {products.length}
          </span>
        </button>
        <button
          onClick={() => router.push("/modules/uni-mart/sales-history")}
          className="font-medium text-gray-500 hover:text-gray-800 pb-4 px-1 transition-all border-b-2 border-transparent hover:border-gray-300"
        >
          Sales History
        </button>
      </div>

      {/* Error Message */}
      {deleteError && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          {deleteError}
        </div>
      )}

      {/* Content Area */}
      {products.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
            <PackageSearch size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Active Items</h2>
          <p className="text-gray-500 max-w-md mb-8">
            You don't have any items listed for sale right now. Click the button below to start adding products to your store.
          </p>
          <Link
            href="/modules/uni-mart/new"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-md"
          >
            <Plus size={18} />
            Post Your First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                    <Tag size={32} opacity={0.5} />
                    <span className="text-sm font-medium">No Image</span>
                  </div>
                )}
                {/* Condition Badge overlapping image */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                  {product.condition}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
                  {product.title}
                </h3>
                
                {/* Price formatting updated to show .00 */}
                <p className="text-2xl font-extrabold text-blue-600 mt-auto pt-4">
                  Rs. {Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 my-4"></div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/modules/uni-mart/my-items/${product.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2.5 rounded-xl hover:bg-gray-100 hover:text-blue-600 font-semibold text-sm transition-colors border border-gray-200 hover:border-blue-200"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="flex items-center justify-center p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete item"
                  >
                    {deletingId === product.id ? (
                      <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}