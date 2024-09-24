import { useState } from 'react';
import { DashboardContainer } from './StyledComponents';
import './index.css';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        brand: '',
        category: '',
        description: '',
        image: null,
    });

    const [showPopup, setShowPopup] = useState(false); // State for managing popup visibility

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

     
        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('price', formData.price);
        formPayload.append('brand', formData.brand);
        formPayload.append('category', formData.category);
        formPayload.append('description', formData.description);
        formPayload.append('image', formData.image);

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formPayload,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Product saved:', data);

            // Reset form fields
            setFormData({
                title: '',
                price: '',
                brand: '',
                category: '',
                description: '',
                image: null,
            });

         
            setShowPopup(true);

          
            setTimeout(() => {
                setShowPopup(false);
            }, 8000);

        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <DashboardContainer>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <fieldset>
                    <legend>Product Details</legend>

                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />

                    <button type="submit">Submit</button>
                </fieldset>
            </form>

         
            {showPopup && (
                <div className="popup">
                    Your data updated successfully!
                </div>
            )}
        </DashboardContainer>
    );
};

export default Dashboard;
