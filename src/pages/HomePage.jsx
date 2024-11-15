import { useEffect, useState } from "react";
import { Button } from "../components/Elements/button/Button";
import NavbarTailwind from "../components/Fragments/Navbar/NavbarTailwind";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../api/axiosInstance";

function HomePage() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const limit = 9;

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchShops = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/shops?limit=${limit}&page=${currentPage}&productName=${filter}`
        );
        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
          setTotalPages(data.data.totalPages);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [currentPage, filter, navigate]);

  const handleNextPage = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = (event) => {
    event.preventDefault();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <main className="text-center mt-8">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by product name"
          className="mb-4 p-2 border rounded-md"
        />

        {loading ? (
          <p className="text-lg font-semibold text-gray-500 mt-10">
            Loading...
          </p>
        ) : error ? (
          <p className="text-lg font-semibold text-red-500 mt-10">
            Error: {error}
          </p>
        ) : (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.length === 0 ? (
              <p className="text-lg font-semibold text-gray-500 mt-10">
                Data not found
              </p>
            ) : (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-white shadow-md"
                >
                  <img
                    src={shop.products[0].images[0]}
                    alt={shop.products[0].name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="font-semibold text-blue-950">
                    {shop.products[0].name}
                  </h3>
                  <p className="text-green-500 font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(shop.products[0].price)}{" "}
                    / Hari
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <span>4 orang</span>
                    <span>Manual</span>
                    <span>Tahun 2020</span>
                  </div>
                  <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">
                    Pilih Mobil
                  </button>
                </div>
              ))
            )}
          </section>
        )}

        <div className="flex justify-center items-center mt-8">
          <Button
            handerAction={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
          <p className="mx-4">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            handerAction={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
          </Button>
        </div>
      </main>
    </>
  );
}

export default HomePage;
