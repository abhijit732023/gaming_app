import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Shipping Policy</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
          <p className="mt-2 text-lg text-gray-700">
            We offer reliable and affordable shipping options to all our customers. Our goal is to get your orders to you as quickly as possible. Below are some important details regarding our shipping policies:
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Shipping Time</h3>
          <p className="mt-2 text-lg text-gray-700">
            We process and ship all orders within 2-3 business days. Delivery times depend on your location:
            <ul className="list-disc pl-6">
              <li>Domestic orders: 3-5 business days</li>
              <li>International orders: 7-14 business days</li>
            </ul>
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Shipping Charges</h3>
          <p className="mt-2 text-lg text-gray-700">
            Shipping charges are calculated at checkout based on your location and the size of the order. We offer free shipping on orders over ₹2000.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Order Tracking</h3>
          <p className="mt-2 text-lg text-gray-700">
            Once your order is shipped, you will receive an email with tracking information to track your shipment.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Customs and Import Duties</h3>
          <p className="mt-2 text-lg text-gray-700">
            For international orders, customs duties or taxes may apply depending on the destination country. These charges are the responsibility of the customer and are not included in the price at checkout.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Address Accuracy</h3>
          <p className="mt-2 text-lg text-gray-700">
            Please ensure that your shipping address is accurate and complete. We are not responsible for delayed shipments or undelivered packages due to incorrect address information.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Lost or Damaged Shipments</h3>
          <p className="mt-2 text-lg text-gray-700">
            If your order is lost or damaged in transit, please contact us immediately. We will help you file a claim with the shipping carrier and assist in getting a replacement or refund, as applicable.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold">Customer Support</h3>
          <p className="mt-2 text-lg text-gray-700">
            If you have any questions about our shipping policy or need assistance with an order, please feel free to contact our customer support team at <a href="mailto:support@yourwebsite.com" className="text-yellow-500">support@yourwebsite.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
