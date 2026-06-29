import React, { useState } from 'react';

export type CheckoutStep = 'CART_DRAWER' | 'SHIPPING_DETAILS' | 'PAYMENT_GATEWAY' | 'ORDER_SUCCESS';
export type SupportedCurrency = 'UGX' | 'USD' | 'EUR';

interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export const CheckoutPipelineCluster: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('CART_DRAWER');
  const [currency, setCurrency] = useState<SupportedCurrency>('UGX');
  
  // High-fidelity state simulation for bespoke cart elements
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod-monolith-01',
      name: 'The Nero Monolith Dining Surface',
      sku: 'NM-ASH-240',
      price: 18500000,
      quantity: 1
    }
  ]);

  // Shipping & logistics intake state form
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    cityRegion: 'Kampala',
    postalCode: ''
  });

  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Exchange rate lookup modifiers relative to baseline UGX
  const currencySymbols: Record<SupportedCurrency, string> = { UGX: 'UGX', USD: '$', EUR: '€' };
  const exchangeRates: Record<SupportedCurrency, number> = { UGX: 1, USD: 0.00027, EUR: 0.00025 };

  const formatPrice = (ugxAmount: number) => {
    const converted = ugxAmount * exchangeRates[currency];
    if (currency === 'UGX') {
      return `${currencySymbols[currency]} ${ugxAmount.toLocaleString()}`;
    }
    return `${currencySymbols[currency]}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const logisticsInsurance = currency === 'UGX' ? 450000 : 120; // Bespoke port transit / local delivery insurance
  const grandTotal = subtotal + (currency === 'UGX' ? logisticsInsurance : logisticsInsurance / exchangeRates[currency]);

  // Simulates standard Flutterwave Standard checkout redirect configuration handshake
  const initializeFlutterwavePayment = () => {
    setIsProcessingPayment(true);
    
    // Simulating API webhook response delay from verification networks
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCurrentStep('ORDER_SUCCESS');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col pt-16">
      
      {/* PERSISTENT SUB-BAR: Transactional Metadata Context Node */}
      <div className="bg-taupe/5 border-b border-taupe/10 py-3 px-6 text-[9px] uppercase tracking-monumental flex justify-between items-center z-10">
        <div className="flex space-x-6 font-mono">
          <span className={currentStep === 'CART_DRAWER' ? 'text-gold font-bold' : 'text-taupe'}>19. Cart Ledger</span>
          <span className={currentStep === 'SHIPPING_DETAILS' ? 'text-gold font-bold' : 'text-taupe'}>20. Logistics Allocation</span>
          <span className={currentStep === 'PAYMENT_GATEWAY' ? 'text-gold font-bold' : 'text-taupe'}>21. Flutterwave Vault</span>
          <span className={currentStep === 'ORDER_SUCCESS' ? 'text-gold font-bold' : 'text-taupe'}>22. Receipt Genesis</span>
        </div>

        {/* Global Currency Conversion Toggle */}
        <div className="flex bg-obsidian border border-taupe/20 p-0.5 font-mono text-[8px]">
          {(['UGX', 'USD', 'EUR'] as SupportedCurrency[]).map(curr => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2 py-1 transition-all ${currency === curr ? 'bg-gold text-obsidian font-bold' : 'text-taupe hover:text-ivory'}`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSACTION ENGINE CONTROLLER VIEW DISPATCHER */}
      <main className="flex-1 p-6 lg:p-12 max-w-4xl w-full mx-auto">
        
        {/* PAGE 19: CART DRAWER / OVERVIEW SHEET */}
        {currentStep === 'CART_DRAWER' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-taupe/10 pb-4">
              <span className="text-[10px] text-gold uppercase tracking-monumental block">Acquisition Queue</span>
              <h1 className="font-cinzel text-xl uppercase tracking-editorial text-ivory mt-0.5">Your Curated Selections</h1>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-xs text-taupe italic py-12 text-center border border-dashed border-taupe/20">Your procurement allocation buffer is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="border border-taupe/20 bg-taupe/5 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="font-cinzel text-xs text-ivory uppercase tracking-wide font-semibold">{item.name}</h3>
                      <p className="text-[9px] font-mono text-gold mt-0.5">SKU Footprint: {item.sku}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-8">
                      <div className="flex items-center space-x-2 font-mono text-xs">
                        <span className="text-taupe text-[9px] uppercase mr-1">Qty:</span>
                        <span>{item.quantity}</span>
                      </div>
                      <span className="font-mono text-xs text-ivory font-bold">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                ))}

                {/* Subtotal Segment Mapping */}
                <div className="pt-6 border-t border-taupe/10 flex flex-col items-end space-y-2 font-mono text-xs">
                  <div className="flex justify-between w-64 text-taupe">
                    <span>Subtotal Matrix:</span>
                    <span className="text-ivory">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-[9px] text-taupe tracking-wide text-right max-w-xs mt-2 font-sans">Logistics and direct-to-site white glove setup handling options are calculated at the next interface node boundary.</p>
                  
                  <button
                    onClick={() => setCurrentStep('SHIPPING_DETAILS')}
                    className="w-full sm:w-64 bg-gold text-obsidian text-[10px] font-bold tracking-editorial uppercase py-3 mt-4 hover:bg-gold-hover transition-all text-center"
                  >
                    Proceed to Logistics &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 20: SHIPPING & SITE OPERATION INTAKE DETAILS */}
        {currentStep === 'SHIPPING_DETAILS' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-taupe/10 pb-4">
              <button onClick={() => setCurrentStep('CART_DRAWER')} className="text-[9px] font-mono text-gold uppercase hover:underline">&larr; Return to Cart Summary</button>
              <h1 className="font-cinzel text-xl uppercase tracking-editorial text-ivory mt-2">Logistics Allocation & Delivery Target</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[10px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Full Legal Name / Entity Designation</label>
                  <input 
                    type="text" 
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                    className="w-full bg-taupe/5 border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold"
                    placeholder="e.g., Alexander Khayesi"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Secure Contact Email Address</label>
                  <input 
                    type="email" 
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                    className="w-full bg-taupe/5 border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold"
                    placeholder="client@studio-alliance.com"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Telemetry Contact Phone (MTN / Airtel Mobile Link)</label>
                  <input 
                    type="tel" 
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
                    className="w-full bg-taupe/5 border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold"
                    placeholder="+256 772 000000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Physical Site Destination Address</label>
                  <input 
                    type="text" 
                    value={shippingForm.deliveryAddress}
                    onChange={(e) => setShippingForm({...shippingForm, deliveryAddress: e.target.value})}
                    className="w-full bg-taupe/5 border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold"
                    placeholder="Plot 42, Nakasero Ridge Road"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">City / Region Destination Boundary</label>
                  <input 
                    type="text" 
                    value={shippingForm.cityRegion}
                    onChange={(e) => setShippingForm({...shippingForm, cityRegion: e.target.value})}
                    className="w-full bg-taupe/5 border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setCurrentStep('PAYMENT_GATEWAY')}
                    disabled={!shippingForm.fullName || !shippingForm.phone || !shippingForm.deliveryAddress}
                    className="w-full bg-gold text-obsidian text-[10px] font-bold tracking-editorial uppercase py-3.5 hover:bg-gold-hover transition-all disabled:bg-taupe/20 disabled:text-taupe"
                  >
                    Lock Execution Vectors &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 21: FLUTTERWAVE GATEWAY CORE MODAL LAYOUT */}
        {currentStep === 'PAYMENT_GATEWAY' && (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto">
            <div className="border-b border-taupe/10 pb-4 text-center">
              <button onClick={() => setCurrentStep('SHIPPING_DETAILS')} className="text-[9px] font-mono text-gold uppercase hover:underline block mb-2">&larr; Revise Logistics Matrix</button>
              <h1 className="font-cinzel text-xl uppercase tracking-editorial text-ivory">Secure Clearing Vault</h1>
            </div>

            {/* Ledger Breakdown Receipt Panel */}
            <div className="border border-taupe/20 bg-taupe/5 p-5 font-mono text-[11px] space-y-3">
              <div className="flex justify-between border-b border-taupe/10 pb-2 text-taupe">
                <span>Curation Selections:</span>
                <span className="text-ivory">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between border-b border-taupe/10 pb-2 text-taupe">
                <span>Custom Transit & Install Matrix:</span>
                <span className="text-ivory">{currency === 'UGX' ? `UGX ${logisticsInsurance.toLocaleString()}` : formatPrice(logisticsInsurance / exchangeRates[currency])}</span>
              </div>
              <div className="flex justify-between pt-1 text-xs text-gold font-bold">
                <span>GRAND TOTAL BINDING:</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Simulated Flutterwave Payment Interface Gateway Node */}
            <div className="border border-gold/30 bg-gold/5 p-6 space-y-4 text-center">
              <div className="flex justify-center items-center space-x-2">
                <span className="text-[9px] font-mono text-gold bg-gold/20 border border-gold/40 px-2 py-0.5 uppercase tracking-widest">Flutterwave Core Link</span>
              </div>
              
              <p className="text-[11px] text-taupe max-w-xs mx-auto leading-relaxed">Clicking below fires the direct encrypted API bridge connection allowing for instantaneous processing of Local Mobile Money nodes, Visa cards, and international commercial banking vectors.</p>
              
              <button
                onClick={initializeFlutterwavePayment}
                disabled={isProcessingPayment}
                className="w-full bg-gold text-obsidian text-[10px] font-bold tracking-editorial uppercase py-3.5 hover:bg-gold-hover transition-all flex items-center justify-center space-x-2"
              >
                {isProcessingPayment ? (
                  <span className="animate-pulse tracking-widest font-mono">Verifying Handshake Tokens...</span>
                ) : (
                  <span>Initialize Secure Payment Network</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* PAGE 22: ORDER SUCCESS / RECEIPT METRIC GENESIS */}
        {currentStep === 'ORDER_SUCCESS' && (
          <div className="text-center space-y-6 max-w-md mx-auto py-8 animate-fade-in">
            <div className="inline-flex p-3 bg-gold/10 border border-gold/30 text-gold rounded-full font-mono text-sm font-bold">
              &radic;
            </div>
            
            <div className="space-y-2">
              <span className="text-[9px] text-gold font-mono uppercase block tracking-monumental">// Clearing Protocol Complete</span>
              <h1 className="font-cinzel text-xl text-ivory uppercase tracking-editorial">Allocation Token Sanctified</h1>
              <p className="text-xs text-taupe leading-relaxed font-playfair italic">Your financial commitment has cleared processing validation layers. Your transaction record identifier has been appended to the secure tracking schema.</p>
            </div>

            {/* Cryptographic Transaction Summary Receipt Component */}
            <div className="border border-taupe/20 bg-taupe/5 p-5 text-left font-mono text-[10px] space-y-2 text-taupe">
              <div className="flex justify-between">
                <span>Vault Ledger reference:</span>
                <span className="text-ivory">FLW-TX-90281-REV</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Project Node:</span>
                <span className="text-ivory">REV-HOLD-026</span>
              </div>
              <div className="flex justify-between">
                <span>Recipient Identity:</span>
                <span className="text-ivory">{shippingForm.fullName || 'Authenticated Guest'}</span>
              </div>
            </div>

            <p className="text-[10px] text-taupe leading-normal">A senior procurement officer from our regional architecture studio will initialize live milestone verification timelines within your designated portal area within 24 business hours.</p>
            
            <div className="pt-4">
              <button 
                onClick={() => {
                  setCartItems([]);
                  setCurrentStep('CART_DRAWER');
                }}
                className="border border-taupe/30 text-taupe hover:border-gold hover:text-gold text-[10px] uppercase font-bold tracking-editorial px-6 py-3 transition-colors bg-taupe/5"
              >
                Return to Digital Flagship Index
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
