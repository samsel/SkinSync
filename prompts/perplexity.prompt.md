### **Objective:**

You are an AI agent tasked with collecting and preparing structured product data for a skincare and makeup recommendation app. This app will recommend products based on **skin undertone**, **complexion**, and **skin type**. Your output will be imported into a Supabase database, and you must format the data exactly according to the schema provided in the attached image.

### **Context:**

The app categorizes products into the following **6 categories**:

1.  Foundation
    
2.  Concealer
    
3.  Compact Powder
    
4.  Setting Powder
    
5.  Blush
    
6.  Highlighter
    

You must collect data for each of these categories across **10 to 20 popular skincare or makeup brands**.

### **Instructions:**

#### **Data Collection:**

*   For each brand, collect product listings for all 6 categories.
    
*   For each product, extract **as many of the following fields** as possible based on the schema image provided:
    
    *   Product Name
        
    *   Brand Name
        
    *   Category (must be one of the 6 listed above)
        
    *   Description
        
    *   Price
        
    *   Product URL
        
    *   Image URL
        
    *   Any shade or color options available
        

#### **Derived Attributes:**

You must **analyze** each product and its options (such as shade names, color descriptions, target audience, or product claims) and assign values to:

*   **Undertone**: must be one of "warm", "cool", or "neutral"
    
*   **Complexion**: must be one of "fair", "light", "medium", "tan", "deep", or "dark"
    
*   **Skin Type**: must be one of "dry", "oily", "combination", or "normal"
    

Base your analysis on:

*   Product descriptions
    
*   Shade naming (e.g., “Warm Beige” → warm undertone, medium complexion)
    
*   Marketing language on the product page
    
*   Customer reviews, if available
    

#### **Output Format:**

*   Produce the final dataset as a **CSV file**, with one row per product variant (if multiple undertones or complexions apply, make separate rows).
    
*   Ensure the column headers **match the Supabase schema exactly** (as shown in the attached image).
    
*   Maintain consistent formatting across all entries.
    

### **Checklist for Each Product:**

*   Belongs to one of the 6 categories
    
*   From one of the 10–20 brands
    
*   Has a valid product URL and image URL
    
*   Contains assigned values for **undertone**, **complexion**, and **skin\_type**
    
*   Formatted in a clean, import-ready CSV
    

### **Constraints:**

*   **Do not use values outside the allowed lists** for undertone, complexion, or skin\_type.
    
*   Do not invent product data; base all entries on real-world products listed on actual brand websites or trusted retailers.
    
*   Make sure that there is enough coverage across all combinations of **Undertone, Complexion, Skin Type**
    
*   Find at least  200 products
    

There should be atleast 3 products for each of the various combinations of **Undertone, Complexion, Skin Type**:
