"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  category_id: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326",
        );
        setProducts(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category_id)),
  );

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "90%", margin: "0 auto", display: "flex" }}>
      {/* Categories List */}
      <div
        style={{
          flex: "1",
          maxWidth: "200px",
          marginRight: "20px",
          borderRight: "1px solid #ddd",
          paddingRight: "20px",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                backgroundColor:
                  selectedCategory === category ? "#f0f0f0" : "transparent",
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Products List */}
      <div style={{ flex: "3", maxHeight: "500px", overflowY: "auto" }}>
        <ul style={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              style={{
                listStyle: "none",
                flex: "1 0 30%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
              <div
                style={{
                  borderRadius: "10px",
                  margin: "15px",
                  width: "150px",
                  textAlign: "center",
                }}
              >
                <img
                  width={"150px"}
                  style={{ borderRadius: "20px" }}
                  src={product.thumbnail}
                  alt={product.title}
                />
                <p>{product.title}</p>
                <p>{product.category_id}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
