import { useState, useEffect } from 'react';
import './index.css'; 
import { InvContainer } from './StyledComponents';

const Products = () => {
  const [productItem, setProduct] = useState([]);
  const [searchProduct, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await fetch("https://dummyjson.com/products");
        const Data = await dataResponse.json();
        setProduct(Data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSearchProduct = (event) => {
    setSearch(event.target.value);
  };

  const filteredProducts = productItem.filter((item) =>
    item.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className='search-container'>
        <label>Search Item:  </label>
        <input
          type="search"
          placeholder="Search Product"
          onChange={onSearchProduct}
          value={searchProduct}
        />
      </div>

      {/* Check if filtered products exist, otherwise display "Item not found" */}
      <InvContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div className='card-container' key={item.id} onClick={() => openModal(item)}>
              <h1>{item.title}</h1>
              <img src={item.thumbnail} alt="avatar" />
            </div>
          ))
        ) : (
          <div className='not-found-message'>
            <h2>Item not found</h2>
          </div>
        )}
      </InvContainer>

      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedProduct.title}</h2>

            <div className="slider">
              <button className="prev-btn" onClick={prevSlide}>&#10094;</button>
              <img
                className="slider-image"
                src={selectedProduct.images[currentImageIndex]}
                alt={`${selectedProduct.title} view ${currentImageIndex + 1}`}
              />
              <button className="next-btn" onClick={nextSlide}>&#10095;</button>
            </div>

            <div className='pop-up-cardContainer'>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Brand:</strong> {selectedProduct.brand}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
