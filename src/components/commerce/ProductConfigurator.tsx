import React, { useState } from 'react';
import { ProductCollectionItem, ProductVariant } from '../../types/platform';

interface ProductConfiguratorProps {
  product: ProductCollectionItem;
  onAddToCart: (variant: ProductVariant, customDimensions?: { width: number; height: number; depth: number }) => void;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [customWidth, setCustomWidth] = useState<number>(selectedVariant.dimensions.width);
  const [customHeight, setCustomHeight] = useState<number>(selectedVariant.dimensions.height);
  const [customDepth, setCustomDepth] = useState<number>(selectedVariant.dimensions.depth);

  // Dynamic pricing calculation algorithm based on scale expansion against base thresholds
  const calculateDynamicPrice = (): number => {
    let basePrice = selectedVariant.price;
    
    if (product.isCustomizable) {
      const widthDelta = Math.max(0, (customWidth - selectedVariant.dimensions.width) / selectedVariant.dimensions.width);
      const heightDelta = Math.max(0, (customHeight - selectedVariant.dimensions.height) / selectedVariant.dimensions.height);
      const depthDelta = Math.max(0, (customDepth - selectedVariant.dimensions.depth) / selectedVariant.dimensions.depth);
      
      // Scale dynamic modifier: 15% increase per proportional volumetric unit added
      const scaleFactor = (widthDelta + heightDelta + depthDelta) * 0.15;
      basePrice += basePrice * scaleFactor;
    }

    return Math.round(basePrice + selectedVariant.material.priceModifier);
  };

  const handleConfigurationSubmit = () => {
    const configuredVariant = {
      ...selectedVariant,
      price: calculateDynamicPrice()
    };
    
    onAddToCart(
      configuredVariant, 
      product.isCustomizable ? { width: customWidth, height: customHeight, depth: customDepth } : undefined
    );
  };

  return (
    <div className="bg-obsidian text-ivory p-8 border border-taupe/20 max-w-4xl mx-auto my-12 font-montserrat">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Visual Showcase (Cloudinary Framework Integration Asset) */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-taupe/5 border border-taupe/10 overflow-hidden relative">
            <img 
              src={product.images[0] || "/assets/placeholder-luxury.jpg"} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.slice(1, 4).map((img, i) => (
              <div key={i} className="aspect-square bg-taupe/5 border border-taupe/10 overflow-hidden">
                <img src={img} alt={`${product.title} perspective`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Configurations Parameters Panel */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-monumental text-gold font-medium block mb-2">
              {product.collectionName.replace('_', ' ')}
            </span>
            <h1 className="font-cinzel text-2xl tracking-editorial text-ivory mb-2">{product.title}</h1>
            <p className="font-playfair text-xs italic text-taupe leading-relaxed mb-6">{product.description}</p>
            
            {/* Structural Material Settings Variants Selection */}
            <div className="mb-6">
              <label className="text-[10px] uppercase tracking-editorial text-taupe block mb-2">Select Material Treatment</label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariant(v);
                      setCustomWidth(v.dimensions.width);
                      setCustomHeight(v.dimensions.height);
                      setCustomDepth(v.dimensions.depth);
                    }}
                    className={`p-3 text-left border text-xs transition-all ${
                      selectedVariant.id === v.id 
                        ? 'border-gold bg-gold/5 text-ivory' 
                        : 'border-taupe/20 bg-transparent text-taupe hover:border-taupe'
                    }`}
                  >
                    <span className="font-medium block">{v.material.name}</span>
                    <span className="text-[10px] text-gold">SKU: {v.sku}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Spatial Scale Parameters Matrix */}
            {product.isCustomizable && (
              <div className="p-4 bg-taupe/5 border border-taupe/10 space-y-4 mb-6">
                <span className="text-[10px] uppercase tracking-editorial text-gold font-semibold block">Adaptive Dimension Tool (mm)</span>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-taupe block mb-1">Width</label>
                    <input 
                      type="number" 
                      value={customWidth} 
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="w-full bg-obsidian border border-taupe/30 p-2 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-taupe block mb-1">Height</label>
                    <input 
                      type="number" 
                      value={customHeight} 
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="w-full bg-obsidian border border-taupe/30 p-2 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-taupe block mb-1">Depth</label>
                    <input 
                      type="number" 
                      value={customDepth} 
                      onChange={(e) => setCustomDepth(Number(e.target.value))}
                      className="w-full bg-obsidian border border-taupe/30 p-2 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
                <span className="text-[9px] text-taupe italic block mt-1">Scale modifications adjust manufacturing overhead algorithmically.</span>
              </div>
            )}
          </div>

          {/* Dynamic Valuation & Order Placement Interface */}
          <div className="pt-6 border-t border-taupe/10">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs uppercase tracking-editorial text-taupe">Computed Spec Value:</span>
              <span className="font-cinzel text-xl text-gold">
                {product.currency} {calculateDynamicPrice().toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleConfigurationSubmit}
              disabled={selectedVariant.stockCount === 0}
              className="w-full bg-gold hover:bg-gold-hover text-obsidian text-xs font-semibold tracking-editorial uppercase py-4 transition-all duration-300 disabled:bg-taupe/40 disabled:text-obsidian/50"
            >
              {selectedVariant.stockCount > 0 ? 'Commit Architecture Configuration' : 'Specification Out of Print'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
