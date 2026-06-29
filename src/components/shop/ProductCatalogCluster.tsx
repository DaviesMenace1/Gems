import React, { useState } from 'react';
import { ProductCollectionItem } from '../../types/platform';

export type CatalogViewMode = 'COLLECTIONS_INDEX' | 'CATEGORY_GRID' | 'VARIANT_DETAIL';

export const ProductCatalogCluster: React.FC = () => {
  const [viewMode, setViewMode] = useState<CatalogViewMode>('COLLECTIONS_INDEX');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<ProductCollectionItem | null>(null);
  const [activeVariantSku, setActiveVariantSku] = useState<string>('');

  // High-fidelity architectural catalog data registry matching Pages 16-18 specifications
  const catalogRegistry: ProductCollectionItem[] = [
    {
      id: 'prod-monolith-01',
      name: 'The Nero Monolith Dining Surface',
      category: 'FURNITURE',
      basePrice: 18500000,
      description: 'A structural slab of hand-honed volcanic stone supported by an interlocking carbonized ash frame structural matrix.',
      variants: [
        { sku: 'NM-ASH-240', name: '240cm Charcoal Ash / Nero Marquina', priceModifier: 0, stock: 3, specifications: { Dimensions: '2400mm x 1100mm x 750mm', Finish: 'Matte Acid-Etched' } },
        { sku: 'NM-OAK-300', name: '300cm Smoked Oak / Nero Marquina', priceModifier: 3200000, stock: 2, specifications: { Dimensions: '3000mm x 1200mm x 750mm', Finish: 'Satin Brushed Stone' } }
      ],
      primaryImage: '/assets/products/monolith_front.jpg',
      tags: ['Volcanic Stone', 'Dining', 'Monolithic']
    },
    {
      id: 'prod-sconce-02',
      name: 'The Brushed Travertine Sconce',
      category: 'LIGHTING',
      basePrice: 4200000,
      description: 'Solid milled Roman travertine stone projecting a soft, diffused indirect lighting spectrum along physical vertical vectors.',
      variants: [
        { sku: 'TS-TRA-900', name: '900mm Honed Travertine', priceModifier: 0, stock: 8, specifications: { Output: '2700K Warm Dimming', Weight: '14kg' } },
        { sku: 'TS-ALB-900', name: '900mm Spanish Alabaster Limited Run', priceModifier: 1800000, stock: 1, specifications: { Output: '2400K Ultra-Warm', Weight: '12kg' } }
      ],
      primaryImage: '/assets/products/sconce_front.jpg',
      tags: ['Travertine', 'Sconce', 'Ambient']
    },
    {
      id: 'prod-slab-03',
      name: 'The Patagonia Quartzite Selection Block',
      category: 'MATERIALS',
      basePrice: 29000000,
      description: 'Architectural-grade premium crystal quartzite slabs sourced directly for master accent facings and custom monolithic vanity routing.',
      variants: [
        { sku: 'SL-PAT-A', name: 'Bookmatch Slab Variant Alpha', priceModifier: 0, stock: 1, specifications: { Dimensions: '3200mm x 1950mm x 20mm', Origin: 'Brazil Quarry Access' } }
      ],
      primaryImage: '/assets/products/patagonia_slab.jpg',
      tags: ['Slab', 'Quartzite', 'Exotic']
    }
  ];

  const handleProductSelect = (product: ProductCollectionItem) => {
    setSelectedProduct(product);
    setActiveVariantSku(product.variants[0].sku);
    setViewMode('VARIANT_DETAIL');
  };

  const activeVariant = selectedProduct?.variants.find(v => v.sku === activeVariantSku) || selectedProduct?.variants[0];
  const activePrice = selectedProduct ? selectedProduct.basePrice + (activeVariant?.priceModifier || 0) : 0;

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col pt-16">
      
      {/* PERSISTENT SUB-BAR: Catalog Context Node Layer */}
      <div className="bg-taupe/5 border-b border-taupe/10 py-3 px-6 text-[9px] uppercase tracking-monumental flex justify-between items-center z-10">
        <div className="flex space-x-6">
          <button 
            onClick={() => setViewMode('COLLECTIONS_INDEX')} 
            className={`hover:text-gold transition-colors ${viewMode === 'COLLECTIONS_INDEX' ? 'text-gold font-bold' : 'text-taupe'}`}
          >
            16. Collections Index
          </button>
          <button 
            onClick={() => { setViewMode('CATEGORY_GRID'); setSelectedCategory('ALL'); }} 
            className={`hover:text-gold transition-colors ${viewMode === 'CATEGORY_GRID' ? 'text-gold font-bold' : 'text-taupe'}`}
          >
            17. Category Master Matrix
          </button>
        </div>
        <span className="text-taupe font-mono hidden sm:inline">CURATION BUFFER // ASSET VERIFIED</span>
      </div>

      {/* RENDER VIEW CONTROLLER DISPATCH CORES */}
      <main className="flex-1 p-6 lg:p-12 max-w-6xl w-full mx-auto">
        
        {/* PAGE 16: COLLECTIONS INDEX EDITORIAL SPLIT GRID */}
        {viewMode === 'COLLECTIONS_INDEX' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-2xl space-y-2">
              <span className="text-[10px] text-gold uppercase tracking-monumental block">The Limited Showroom</span>
              <h1 className="font-cinzel text-2xl uppercase tracking-editorial text-ivory">The Curated Single-Run Release Layers</h1>
              <p className="text-xs text-taupe leading-relaxed font-playfair italic">Exploring structural stability through micro-batches of uncompromised furnishing elements, lighting sculptures, and raw quartzite stone selections.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {['FURNITURE', 'LIGHTING', 'MATERIALS'].map((cat, idx) => {
                const sampleItem = catalogRegistry.find(item => item.category === cat);
                return (
                  <div 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setViewMode('CATEGORY_GRID'); }}
                    className="border border-taupe/20 bg-taupe/5 p-6 flex flex-col justify-between aspect-[3/4] cursor-pointer group hover:border-gold transition-all duration-300"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-gold block">COLLECTION MATRIX 0{idx + 1}</span>
                      <h2 className="font-cinzel text-sm uppercase tracking-widest text-ivory mt-1 group-hover:text-gold transition-colors">{cat} ARCHETYPE</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="h-32 bg-taupe/10 border border-taupe/10 flex items-center justify-center font-mono text-[9px] text-taupe uppercase tracking-widest">
                        [ Asset Preview Node ]
                      </div>
                      <p className="text-[10px] text-taupe uppercase tracking-editorial text-right group-hover:text-ivory transition-colors">Initialize Ledger Matrix &rarr;</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PAGE 17: CATEGORY GRID INTERFACE LAYER */}
        {viewMode === 'CATEGORY_GRID' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-taupe/10 pb-4">
              <div>
                <span className="text-[9px] text-gold uppercase tracking-monumental block">Catalog Ledger Filtering</span>
                <h1 className="font-cinzel text-xl uppercase tracking-editorial text-ivory mt-0.5">Category Node View: {selectedCategory}</h1>
              </div>

              {/* Segment Pill Filters */}
              <div className="flex bg-taupe/5 border border-taupe/20 p-1 text-[9px] font-bold uppercase tracking-editorial font-mono">
                {['ALL', 'FURNITURE', 'LIGHTING', 'MATERIALS'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 transition-all ${selectedCategory === cat ? 'bg-gold text-obsidian font-bold' : 'text-taupe hover:text-ivory'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Mapping Loop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {catalogRegistry
                .filter(item => selectedCategory === 'ALL' || item.category === selectedCategory)
                .map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="border border-taupe/20 bg-taupe/5 p-5 flex flex-col justify-between group cursor-pointer hover:border-gold transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="aspect-video bg-taupe/10 border border-taupe/20 flex items-center justify-center text-[9px] font-mono text-taupe uppercase tracking-widest">
                        [ Component Visual Canvas Frame ]
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9px] font-mono text-gold tracking-wider uppercase">{product.category}</span>
                        <span className="text-[10px] text-ivory font-mono font-bold">UGX {product.basePrice.toLocaleString()}</span>
                      </div>
                      <h3 className="font-cinzel text-xs text-ivory uppercase tracking-wide group-hover:text-gold transition-colors font-semibold">{product.name}</h3>
                      <p className="text-xs text-taupe line-clamp-2 leading-relaxed font-playfair italic">{product.description}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-taupe/10 flex justify-between items-center text-[9px] font-mono text-taupe">
                      <span>{product.variants.length} Variant Footprints</span>
                      <span className="text-gold uppercase tracking-editorial font-bold group-hover:underline">Spec Detail &rarr;</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* PAGE 18: VARIANT DETAIL ROUTING LAYOUT VIEW */}
        {viewMode === 'VARIANT_DETAIL' && selectedProduct && (
          <div className="animate-fade-in space-y-8">
            <div>
              <button 
                onClick={() => setViewMode('CATEGORY_GRID')} 
                className="text-[9px] font-mono text-gold uppercase hover:underline"
              >
                &larr; Back to Category Grid Array
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product Visual Mock Space */}
              <div className="space-y-4">
                <div className="aspect-square bg-taupe/5 border border-taupe/20 flex items-center justify-center text-taupe font-mono text-[10px] uppercase tracking-monumental">
                  [ High-Fidelity Multi-Angle Showroom Frame Asset ]
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square w-20 bg-taupe/5 border border-taupe/20 flex items-center justify-center text-[8px] font-mono text-taupe">Angle {i}</div>
                  ))}
                </div>
              </div>

              {/* Product Configuration Panel Meta */}
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono bg-taupe/10 border border-taupe/20 text-gold px-2 py-0.5 uppercase">{selectedProduct.category} LAYER</span>
                  <h1 className="font-cinzel text-xl text-ivory uppercase tracking-editorial mt-2">{selectedProduct.name}</h1>
                  <p className="text-lg font-mono text-gold font-bold mt-1">UGX {activePrice.toLocaleString()}</p>
                </div>

                <p className="text-xs text-taupe leading-relaxed font-playfair italic border-l-2 border-gold/40 pl-4 py-1">{selectedProduct.description}</p>

                {/* Variant Switch Selection Matrix */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-ivory font-mono block">Select Specification Variant Variant Matrix:</label>
                  <div className="space-y-2">
                    {selectedProduct.variants.map(v => (
                      <div
                        key={v.sku}
                        onClick={() => setActiveVariantSku(v.sku)}
                        className={`p-3 border transition-all cursor-pointer flex justify-between items-center font-mono text-[10px] ${
                          activeVariantSku === v.sku
                            ? 'border-gold bg-gold/5 text-ivory'
                            : 'border-taupe/20 bg-taupe/5 text-taupe hover:border-taupe/50 hover:text-ivory'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{v.name}</p>
                          <p className="text-[8px] opacity-60">SKU Core: {v.sku} | Allocation Buffer: {v.stock} units left</p>
                        </div>
                        {v.priceModifier !== 0 && (
                          <span className="text-gold font-bold">
                            {v.priceModifier > 0 ? '+' : ''} UGX {v.priceModifier.toLocaleString()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specification Matrix Block */}
                {activeVariant && (
                  <div className="border border-taupe/20 bg-taupe/5 p-4 font-mono text-[10px] space-y-2">
                    <span className="text-[9px] text-gold font-bold uppercase tracking-wider block">// Immutable Physical Matrix Parameters</span>
                    <div className="divide-y divide-taupe/10">
                      {Object.entries(activeVariant.specifications).map(([key, value]) => (
                        <div key={key} className="py-1.5 flex justify-between">
                          <span className="text-taupe uppercase text-[9px]">{key}</span>
                          <span className="text-ivory text-right font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Interface Row */}
                <div className="pt-2">
                  <button 
                    disabled={activeVariant?.stock === 0}
                    className="w-full bg-gold text-obsidian text-[10px] font-bold tracking-editorial uppercase py-3.5 hover:bg-gold-hover disabled:bg-taupe/20 disabled:text-taupe transition-all"
                  >
                    {activeVariant && activeVariant.stock > 0 ? 'Request Acquisition Allocation Handshake' : 'Out of Allocation Buffer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
