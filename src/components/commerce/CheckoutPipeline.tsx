import React, { useState } from 'react';
import { ProductVariant, PaymentTransaction } from '../../types/platform';
import { ApiResponse } from '../../types/api';

interface CheckoutPipelineProps {
  cartItems: { variant: ProductVariant; quantity: number; customDimensions?: any }[];
  totalAmount: number;
  currency: string;
}

export const CheckoutPipeline: React.FC<CheckoutPipelineProps> = ({ cartItems, totalAmount, currency }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleFlutterwaveInitialization = async () => {
    setIsProcessingPayment(true);
    
    try {
      // 1. Structural handshake with Vercel/Next serverless endpoint to sign the transaction signature security hashes
      const response = await fetch('/api/payment/flutterwave-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: totalAmount, currency, name }),
      });

      const json: ApiResponse<{ checkoutUrl: string; txRef: string }> = await response.json();

      if (json.success && json.data?.checkoutUrl) {
        // Redirect user to Flutterwave's secure hosted billing ecosystem
        window.location.href = json.data.checkoutUrl;
      } else {
        alert(`Payment Initialization Fault: ${json.error?.message}`);
        setIsProcessingPayment(false);
      }
    } catch (err) {
      console.error("Critical checkout architecture error:", err);
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-obsidian border border-taupe/20 p-8 text-ivory font-montserrat my-16">
      
      {/* Structural Pipeline Indicator Progress Ticks */}
      <div className="flex justify-between items-center mb-12 border-b border-taupe/10 pb-4">
        {['01 Shipping Credentials', '02 Verification Matrix', '03 Financial Handshake'].map((label, idx) => (
          <span 
            key={idx} 
            className={`text-[9px] uppercase tracking-editorial ${
              step === idx + 1 ? 'text-gold font-semibold' : 'text-taupe'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Step 1: Logistics & Contact Information */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="font-cinzel text-sm text-ivory uppercase tracking-editorial mb-4">Delivery Vector Information</h2>
          <div>
            <label className="text-[10px] text-taupe uppercase block mb-1">Full Legal Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-taupe/5 border border-taupe/30 p-3 text-xs text-ivory focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-taupe uppercase block mb-1">Professional Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-taupe/5 border border-taupe/30 p-3 text-xs text-ivory focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-taupe uppercase block mb-1">Physical Site Destination Address</label>
            <textarea 
              rows={3} 
              value={deliveryAddress} 
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full bg-taupe/5 border border-taupe/30 p-3 text-xs text-ivory focus:border-gold focus:outline-none resize-none"
            />
          </div>
          <button
            onClick={() => name && email && deliveryAddress && setStep(2)}
            className="w-full bg-taupe/20 hover:bg-gold hover:text-obsidian transition-colors text-xs py-3 uppercase tracking-editorial mt-4"
          >
            Advance Configuration Review
          </button>
        </div>
      )}

      {/* Step 2: Verification Matrix */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-cinzel text-sm text-ivory uppercase tracking-editorial">Final Document Verification</h2>
          <div className="divide-y divide-taupe/10">
            {cartItems.map((item, i) => (
              <div key={i} className="py-3 flex justify-between text-xs">
                <div>
                  <p className="text-ivory font-medium">{item.variant.sku}</p>
                  <p className="text-[10px] text-taupe">Qty: {item.quantity}</p>
                </div>
                <span className="text-gold font-mono">{currency} {(item.variant.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-taupe/20 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-editorial text-taupe">Consolidated Subtotal:</span>
            <span className="font-cinzel text-xl text-gold">{currency} {totalAmount.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setStep(1)} 
              className="border border-taupe/30 py-3 text-xs uppercase tracking-editorial text-taupe hover:text-ivory"
            >
              Modify Shipping
            </button>
            <button 
              onClick={() => setStep(3)} 
              className="bg-gold text-obsidian font-semibold py-3 text-xs uppercase tracking-editorial hover:bg-gold-hover"
            >
              Confirm Statement
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Financial Handshake Redirect Pipeline */}
      {step === 3 && (
        <div className="text-center py-12 space-y-6 animate-fade-in">
          <h2 className="font-cinzel text-base text-gold uppercase tracking-monumental">Authorize Secure Transaction</h2>
          <p className="text-xs text-taupe max-w-sm mx-auto leading-relaxed">
            You are now routing to our secure institutional ledger powered by **Flutterwave**. Do not refresh or break this active link framework.
          </p>
          <button
            onClick={handleFlutterwaveInitialization}
            disabled={isProcessingPayment}
            className="bg-gold text-obsidian font-bold text-xs uppercase tracking-editorial px-8 py-4 transition-all duration-300 disabled:opacity-50"
          >
            {isProcessingPayment ? 'Securing Environment...' : 'Initialize Flutterwave Engine'}
          </button>
        </div>
      )}

    </div>
  );
};
