import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { XlviLoader } from "react-awesome-loaders";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewInvoice = ({ customers, inventory }) => {
  const [formData, setFormData] = useState({
    date_of_purchase: '',
    method: '',
    amount_paid: '',
    fee: '',
    tax: '',
    currency: '',
    customer_id: '',
    vehicle_id: '',
    installments: '',
    pending_cleared: '',
    signature: '',
    warranty: '',
    terms_and_conditions: '',
    agreement_details: '',
    additional_accessories: '',
    notes_instructions: '',
    payment_proof: '',
    sale_id: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sales, setSales] = useState([]);
  const { id } = useParams();

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValues = {};

    updatedValues[name] = (['amount_paid', 'fee', 'tax'].includes(name)) ? Number(value) : value;

    if (name === 'amount_paid' || name === 'fee') {
      const newTotalAmount = name === 'amount_paid' ? Number(value) : Number(formData.amount_paid);
      const newAmountPaid = name === 'amount_paid' ? Number(value) : Number(formData.amount_paid);
      const newTax = calculateTax(newTotalAmount);
      updatedValues.tax = newTax;
      updatedValues.balance = calculateBalance(newTotalAmount, newAmountPaid, newTax);
    }

    if (name === "date_of_purchase") {
      updatedValues[name] = formatDate(value);
    } else {
      updatedValues[name] = value;
    }

    setFormData(prev => ({
      ...prev,
      ...updatedValues
    }));
  };

  const calculateTax = (total) => {
    return total * 0.15;
  };

  const calculateBalance = (total, paid, tax) => {
    const totalNum = Number(total);
    const paidNum = Number(paid);
    const taxNum = Number(tax);

    return ((totalNum - paidNum) + taxNum).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create invoice');
      }

      toast.success(`Invoice created successfully with ID: ${data.invoice_id}`);
      setFormData({
        date_of_purchase: '',
        method: '',
        amount_paid: '',
        fee: '',
        tax: '',
        currency: '',
        customer_id: '',
        vehicle_id: '',
        installments: '',
        pending_cleared: '',
        signature: '',
        warranty: '',
        terms_and_conditions: '',
        agreement_details: '',
        additional_accessories: '',
        notes_instructions: '',
        payment_proof: '',
        sale_id: ''
      });
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('/saleinvoice', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        setSales(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="bg-slate200 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="vehicle_id" className="block text-sm font-medium text-gray-700">Vehicle</label>
            <select name="vehicle_id" id="vehicle_id" value={formData.vehicle_id} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
              <option value="">Select Vehicle</option>
              {inventory.map(item => (
                <option key={item.id} value={item.id}>{item.make} {item.model} - {item.year}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Customer</label>
            <select name="customer_id" id="customer_id" value={formData.customer_id} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
              ))}
            </select>
            <label htmlFor="sale_id" className="block text-sm font-medium text-gray-700">Sale</label>
            <select name="sale_id" id="sale_id" value={formData.sale_id} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
              <option value="">Select Sale</option>
              {sales.length > 0 ? sales.map(sale => (
                <option key={sale.id} value={sale.id}>{sale.customer.Names} -- {sale.inventory_id.name}</option>
              )) : <option value="">Loading sales...</option>}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="amount_paid" className="block text-sm font-medium text-gray-700">Amount Paid</label>
            <input type="number" name="amount_paid" id="amount_paid" value={formData.amount_paid} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="tax" className="block text-sm font-medium text-gray-700">Tax</label>
            <input type="number" name="tax" id="tax" value={formData.tax} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          {/* <div className="col-span-2 sm:col-span-1">
            <label htmlFor="amount_paid" className="block text-sm font-medium text-gray-700">Amount Paid</label>
            <input type="number" name="amount_paid" id="amount_paid" value={formData.amount_paid} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div> */}
          {/* <div className="col-span-2 sm:col-span-1">
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">Balance</label>
            <input type="text" name="balance" id="balance" value={formData.balance} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div> */}
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="date_of_purchase" className="block text-sm font-medium text-gray-700">Date of Purchase</label>
            <input type="date" name="date_of_purchase" id="date_of_purchase" value={formData.date_of_purchase} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="method" className="block text-sm font-medium text-gray-700">Method</label>
            <select name="method" id="method" value={formData.method} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
              <option value="">Select Method</option>
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="mobile_payment">Mobile Payment</option>
              <option value="check">Check</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <select name="currency" id="currency" value={formData.currency} onChange={handleChange}  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
              <option value="">Currency</option>
              <option value="KSH">KSH </option>
              <option value="USD">USD (US Dollar)</option>
            
            </select>
            {/* <input type="text"  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required /> */}
          </div>
          <div className="col-span-2">
            <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Fee</label>
            <input type="number" name="fee" id="fee" value={formData.fee} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>
          <div className="col-span-2">
            <label htmlFor="installments" className="block text-sm font-medium text-gray-700">Installments</label>
            <textarea name="installments" id="installments" value={formData.installments} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="pending_cleared" className="block text-sm font-medium text-gray-700">Pending Cleared</label>
            <textarea name="pending_cleared" id="pending_cleared" value={formData.pending_cleared} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="signature" className="block text-sm font-medium text-gray-700">Signature</label>
            <textarea name="signature" id="signature" value={formData.signature} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">Warranty</label>
            <textarea name="warranty" id="warranty" value={formData.warranty} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="terms_and_conditions" className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
            <textarea name="terms_and_conditions" id="terms_and_conditions" value={formData.terms_and_conditions} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="agreement_details" className="block text-sm font-medium text-gray-700">Agreement Details</label>
            <textarea name="agreement_details" id="agreement_details" value={formData.agreement_details} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="additional_accessories" className="block text-sm font-medium text-gray-700">Additional Accessories</label>
            <textarea name="additional_accessories" id="additional_accessories" value={formData.additional_accessories} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="notes_instructions" className="block text-sm font-medium text-gray-700">Notes/Instructions</label>
            <textarea name="notes_instructions" id="notes_instructions" value={formData.notes_instructions} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="payment_proof" className="block text-sm font-medium text-gray-700">Payment Proof</label>
            <textarea name="payment_proof" id="payment_proof" value={formData.payment_proof} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" disabled={loading} className="close px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50">
            {loading ? (
              <XlviLoader
                boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
                desktopSize={"60px"}
                mobileSize={"60px"}
              />
            ) : (
              'Create Invoice'
            )}
          </button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {/* {message && <div className="mt-4 text-green-500">{message}</div>} */}
    </div>
  );
};

NewInvoice.propTypes = {
  customers: PropTypes.array.isRequired,
  inventory: PropTypes.array.isRequired
};

export default NewInvoice;
