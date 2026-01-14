import { create } from 'zustand';
import type { Company, Review, CompanyFilters } from '@/types';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppState {
  // Companies
  companies: Company[];
  selectedCompany: Company | null;
  companyFilters: CompanyFilters;
  isLoadingCompanies: boolean;

  // Reviews
  reviews: Review[];
  isLoadingReviews: boolean;

  // UI State
  toasts: ToastMessage[];
  searchQuery: string;
  isSearching: boolean;
  searchResults: Company[];

  // Modal states
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;

  // Actions
  setCompanies: (companies: Company[]) => void;
  addCompanies: (companies: Company[]) => void;
  setSelectedCompany: (company: Company | null) => void;
  setCompanyFilters: (filters: Partial<CompanyFilters>) => void;
  setIsLoadingCompanies: (loading: boolean) => void;

  setReviews: (reviews: Review[]) => void;
  addReviews: (reviews: Review[]) => void;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
  removeReview: (reviewId: string) => void;
  setIsLoadingReviews: (loading: boolean) => void;

  setSearchQuery: (query: string) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchResults: (results: Company[]) => void;

  addToast: (type: ToastMessage['type'], message: string) => void;
  removeToast: (id: string) => void;

  setLoginModalOpen: (open: boolean) => void;
  setSignUpModalOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  companies: [],
  selectedCompany: null,
  companyFilters: { sortBy: 'recent' },
  isLoadingCompanies: false,

  reviews: [],
  isLoadingReviews: false,

  toasts: [],
  searchQuery: '',
  isSearching: false,
  searchResults: [],

  isLoginModalOpen: false,
  isSignUpModalOpen: false,

  // Actions
  setCompanies: (companies) => set({ companies }),
  addCompanies: (companies) =>
    set((state) => ({ companies: [...state.companies, ...companies] })),
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setCompanyFilters: (filters) =>
    set((state) => ({ companyFilters: { ...state.companyFilters, ...filters } })),
  setIsLoadingCompanies: (loading) => set({ isLoadingCompanies: loading }),

  setReviews: (reviews) => set({ reviews }),
  addReviews: (reviews) =>
    set((state) => ({ reviews: [...state.reviews, ...reviews] })),
  updateReview: (reviewId, updates) =>
    set((state) => ({
      reviews: state.reviews.map((r) =>
        r.id === reviewId ? { ...r, ...updates } : r
      ),
    })),
  removeReview: (reviewId) =>
    set((state) => ({
      reviews: state.reviews.filter((r) => r.id !== reviewId),
    })),
  setIsLoadingReviews: (loading) => set({ isLoadingReviews: loading }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearching: (searching) => set({ isSearching: searching }),
  setSearchResults: (results) => set({ searchResults: results }),

  addToast: (type, message) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 5000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
  setSignUpModalOpen: (open) => set({ isSignUpModalOpen: open }),
}));
