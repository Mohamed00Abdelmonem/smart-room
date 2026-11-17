import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_BRANDS,
  INITIAL_PLACES,
  INITIAL_MARKETPLACE_PRODUCTS,
} from '../data/marketplaceSeed';
import type {
  ListingStatus,
  MarketplaceBrand,
  MarketplacePlace,
  MarketplaceProduct,
} from '../types';

const STORAGE_KEY = 'vesta_showroom_marketplace_v1';

interface PersistedMarketplaceState {
  brands: MarketplaceBrand[];
  places: MarketplacePlace[];
  products: MarketplaceProduct[];
}

interface ShowroomMarketplaceContextValue {
  brands: MarketplaceBrand[];
  places: MarketplacePlace[];
  products: MarketplaceProduct[];
  publishedBrands: MarketplaceBrand[];
  publishedPlaces: MarketplacePlace[];
  publishedProducts: MarketplaceProduct[];
  getBrandById: (id: string) => MarketplaceBrand | undefined;
  getBrandBySlug: (slug: string) => MarketplaceBrand | undefined;
  getPlaceById: (id: string) => MarketplacePlace | undefined;
  getPlaceBySlug: (slug: string) => MarketplacePlace | undefined;
  getProductBySlug: (slug: string) => MarketplaceProduct | undefined;
  getProductsByBrand: (brandId: string, includeDraft?: boolean) => MarketplaceProduct[];
  getProductsByPlace: (placeId: string, includeDraft?: boolean) => MarketplaceProduct[];
  getPlacesForProduct: (product: MarketplaceProduct) => MarketplacePlace[];
  getPlacesForBrand: (brandId: string) => MarketplacePlace[];
  getBrandsForPlace: (place: MarketplacePlace) => MarketplaceBrand[];
  // Admin Management CRUD
  saveBrand: (brand: Omit<MarketplaceBrand, 'id' | 'createdAt'> & { id?: string }) => void;
  toggleBrandFeatured: (id: string) => void;
  setBrandStatus: (id: string, status: ListingStatus) => void;
  savePlace: (place: Omit<MarketplacePlace, 'id' | 'createdAt'> & { id?: string }) => void;
  togglePlaceFeatured: (id: string) => void;
  setPlaceStatus: (id: string, status: ListingStatus) => void;
  saveProduct: (product: Omit<MarketplaceProduct, 'id' | 'createdAt'> & { id?: string }) => void;
  toggleProductFeatured: (id: string) => void;
  setProductStatus: (id: string, status: ListingStatus) => void;
  resetMarketplaceData: () => void;
}

const ShowroomMarketplaceContext = createContext<ShowroomMarketplaceContextValue | undefined>(undefined);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const ShowroomMarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedMarketplaceState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedMarketplaceState;
        if (parsed.brands?.length && parsed.places?.length && parsed.products?.length) {
          return parsed;
        }
      }
    } catch {
      // Fallback cleanly to initial mock dataset
    }
    return {
      brands: INITIAL_BRANDS,
      places: INITIAL_PLACES,
      products: INITIAL_MARKETPLACE_PRODUCTS,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state]);

  const publishedBrands = useMemo(
    () => state.brands.filter((b) => b.status === 'published'),
    [state.brands]
  );

  const publishedPlaces = useMemo(
    () => state.places.filter((p) => p.status === 'published'),
    [state.places]
  );

  const publishedProducts = useMemo(
    () => state.products.filter((p) => p.status === 'published'),
    [state.products]
  );

  const getBrandById = (id: string) => state.brands.find((b) => b.id === id);
  const getBrandBySlug = (slug: string) => state.brands.find((b) => b.slug === slug);
  const getPlaceById = (id: string) => state.places.find((p) => p.id === id);
  const getPlaceBySlug = (slug: string) => state.places.find((p) => p.slug === slug);
  const getProductBySlug = (slug: string) => state.products.find((p) => p.slug === slug);

  const getProductsByBrand = (brandId: string, includeDraft = false) =>
    state.products.filter(
      (p) => p.brandId === brandId && (includeDraft || p.status === 'published')
    );

  const getProductsByPlace = (placeId: string, includeDraft = false) =>
    state.products.filter(
      (p) => p.storeIds.includes(placeId) && (includeDraft || p.status === 'published')
    );

  const getPlacesForProduct = (product: MarketplaceProduct) =>
    state.places.filter((pl) => product.storeIds.includes(pl.id) && pl.status === 'published');

  const getPlacesForBrand = (brandId: string) => {
    const storeIdsFromProducts = new Set(
      state.products.filter((p) => p.brandId === brandId).flatMap((p) => p.storeIds)
    );
    return state.places.filter(
      (pl) =>
        pl.status === 'published' &&
        (pl.brandIds.includes(brandId) || storeIdsFromProducts.has(pl.id))
    );
  };

  const getBrandsForPlace = (place: MarketplacePlace) => {
    const brandIdsFromProducts = new Set(
      state.products.filter((p) => p.storeIds.includes(place.id)).map((p) => p.brandId)
    );
    return state.brands.filter(
      (b) =>
        b.status === 'published' &&
        (place.brandIds.includes(b.id) || brandIdsFromProducts.has(b.id))
    );
  };

  const saveBrand: ShowroomMarketplaceContextValue['saveBrand'] = (input) => {
    setState((prev) => {
      if (input.id) {
        return {
          ...prev,
          brands: prev.brands.map((b) =>
            b.id === input.id ? { ...b, ...input, slug: input.slug || b.slug } : b
          ),
        };
      }
      const created: MarketplaceBrand = {
        ...input,
        id: `brand-${Date.now()}`,
        slug: input.slug || slugify(input.name) || `brand-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      return { ...prev, brands: [created, ...prev.brands] };
    });
  };

  const toggleBrandFeatured = (id: string) => {
    setState((prev) => ({
      ...prev,
      brands: prev.brands.map((b) => (b.id === id ? { ...b, featured: !b.featured } : b)),
    }));
  };

  const setBrandStatus = (id: string, status: ListingStatus) => {
    setState((prev) => ({
      ...prev,
      brands: prev.brands.map((b) => (b.id === id ? { ...b, status } : b)),
    }));
  };

  const savePlace: ShowroomMarketplaceContextValue['savePlace'] = (input) => {
    setState((prev) => {
      if (input.id) {
        return {
          ...prev,
          places: prev.places.map((pl) =>
            pl.id === input.id ? { ...pl, ...input, slug: input.slug || pl.slug } : pl
          ),
        };
      }
      const created: MarketplacePlace = {
        ...input,
        id: `place-${Date.now()}`,
        slug: input.slug || slugify(input.name) || `place-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      return { ...prev, places: [created, ...prev.places] };
    });
  };

  const togglePlaceFeatured = (id: string) => {
    setState((prev) => ({
      ...prev,
      places: prev.places.map((pl) => (pl.id === id ? { ...pl, featured: !pl.featured } : pl)),
    }));
  };

  const setPlaceStatus = (id: string, status: ListingStatus) => {
    setState((prev) => ({
      ...prev,
      places: prev.places.map((pl) => (pl.id === id ? { ...pl, status } : pl)),
    }));
  };

  const saveProduct: ShowroomMarketplaceContextValue['saveProduct'] = (input) => {
    setState((prev) => {
      if (input.id) {
        return {
          ...prev,
          products: prev.products.map((p) =>
            p.id === input.id
              ? { ...p, ...input, slug: input.slug || p.slug, legacyProduct: undefined }
              : p
          ),
        };
      }
      const created: MarketplaceProduct = {
        ...input,
        id: `prod-${Date.now()}`,
        slug: input.slug || slugify(input.name) || `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      return { ...prev, products: [created, ...prev.products] };
    });
  };

  const toggleProductFeatured = (id: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    }));
  };

  const setProductStatus = (id: string, status: ListingStatus) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, status } : p)),
    }));
  };

  const resetMarketplaceData = () => {
    const fresh: PersistedMarketplaceState = {
      brands: INITIAL_BRANDS,
      places: INITIAL_PLACES,
      products: INITIAL_MARKETPLACE_PRODUCTS,
    };
    setState(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
  };

  return (
    <ShowroomMarketplaceContext.Provider
      value={{
        brands: state.brands,
        places: state.places,
        products: state.products,
        publishedBrands,
        publishedPlaces,
        publishedProducts,
        getBrandById,
        getBrandBySlug,
        getPlaceById,
        getPlaceBySlug,
        getProductBySlug,
        getProductsByBrand,
        getProductsByPlace,
        getPlacesForProduct,
        getPlacesForBrand,
        getBrandsForPlace,
        saveBrand,
        toggleBrandFeatured,
        setBrandStatus,
        savePlace,
        togglePlaceFeatured,
        setPlaceStatus,
        saveProduct,
        toggleProductFeatured,
        setProductStatus,
        resetMarketplaceData,
      }}
    >
      {children}
    </ShowroomMarketplaceContext.Provider>
  );
};

export const useShowroomMarketplace = (): ShowroomMarketplaceContextValue => {
  const ctx = useContext(ShowroomMarketplaceContext);
  if (!ctx) {
    throw new Error('useShowroomMarketplace must be used inside ShowroomMarketplaceProvider');
  }
  return ctx;
};
