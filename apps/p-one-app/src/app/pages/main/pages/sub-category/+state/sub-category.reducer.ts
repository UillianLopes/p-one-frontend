import { Action, createReducer, on } from '@ngrx/store';
import {
  CategoryFilter,
  CategoryModel,
  PaginatedFilter,
} from '@p-one/domain/financial';

import {
  closeCreateSubCategoryDialogSuccess,
  closeUpdateSubCategoryDialogSuccess,
  createSubCategory,
  createSubCategoryFailure,
  createSubCategorySuccess,
  deleteSelectedSubCategories,
  deleteSelectedSubCategoriesFailure,
  deleteSelectedSubCategoriesSuccess,
  deleteSubCategory,
  deleteSubCategoryFailure,
  deleteSubCategorySuccess,
  filterSubCategories,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  loadSubCategories,
  loadSubCategoriesFailure,
  loadSubCategoriesSuccess,
  paginateSubCategories,
  resetState,
  selectMultipleSubCategories,
  selectSubCategory,
  setCategoriesFilter,
  setOpenedCreateSubCategoryDialog,
  setOpenedDeleteSubCategoryDialog,
  setOpenedUpdateSubCategoryDialog,
  setSubCategoriesPage,
  unselectMultipleSubCategories,
  unselectSubCategory,
  updateSubCategory,
  updateSubCategoryFailure,
  updateSubCategorySuccess,
} from './sub-category.actions';

export const SUB_CATEGORY_KEY = 'SUB_CATEGORY';

export interface SubCategoryState {
  loading: boolean;
  filter: CategoryFilter;
  pagination: PaginatedFilter;
  subCategories: CategoryModel[];
  error?: any;

  selectedSubCategoryIds: string[];

  createSubCategoryDialogId?: string;
  updateSubCategoryDialogId?: string;
  deleteSubCategoryDialogId?: string;

  categories?: CategoryModel[];
  isCategoriesLoading: boolean;
  categoryFilter?: string;
}

const initialState: SubCategoryState = {
  loading: false,
  isCategoriesLoading: false,
  subCategories: [],
  selectedSubCategoryIds: [],
  pagination: {
    page: 1,
    pageSize: 50,
  },
  filter: {},
};

const _subCategoryReducer = createReducer<SubCategoryState>(
  initialState,

  on(loadSubCategories, (state, _) => {
    return { ...state, loading: true };
  }),

  on(loadSubCategoriesSuccess, (state, action) => {
    return { ...state, subCategories: action.categories, loading: false };
  }),

  on(loadSubCategoriesFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),

  on(createSubCategory, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(createSubCategorySuccess, (state, action) => {
    return {
      ...state,
      subCategories: [...state.subCategories, action.category],
      loading: false,
    };
  }),

  on(createSubCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(updateSubCategory, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(updateSubCategorySuccess, (state, { subCategory }) => {
    return {
      ...state,
      subCategories: [
        ...state.subCategories.filter((c) => c.id != subCategory.id),
        subCategory,
      ],
      loading: false,
    };
  }),

  on(updateSubCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(setOpenedCreateSubCategoryDialog, (state, action) => {
    return {
      ...state,
      createSubCategoryDialogId: action.createCategoryDialogId,
    };
  }),

  on(closeCreateSubCategoryDialogSuccess, (state) => {
    return {
      ...state,
      createSubCategoryDialogId: undefined,
    };
  }),

  on(setOpenedUpdateSubCategoryDialog, (state, action) => {
    return {
      ...state,
      updateSubCategoryDialogId: action.updateCategoryDialogId,
    };
  }),

  on(closeUpdateSubCategoryDialogSuccess, (state) => {
    return {
      ...state,
      updateSubCategoryDialogId: undefined,
    };
  }),

  on(paginateSubCategories, (state, action) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...action.pagination,
      },
    };
  }),

  on(selectSubCategory, (state, action) => {
    return {
      ...state,
      selectedSubCategoryIds: [
        ...state.selectedSubCategoryIds,
        action.subCategoryId,
      ],
    };
  }),

  on(unselectSubCategory, (state, action) => {
    return {
      ...state,
      selectedSubCategoryIds: [
        ...state.selectedSubCategoryIds.filter(
          (categoryId) => categoryId != action.subCategoryId
        ),
      ],
    };
  }),

  on(selectMultipleSubCategories, (state, action) => {
    return {
      ...state,
      selectedSubCategoryIds: [...(action.subCategoryIds ?? [])],
    };
  }),

  on(unselectMultipleSubCategories, (state, action) => {
    return {
      ...state,
      selectedSubCategoryIds: [...(action.subCategoryIds ?? [])],
    };
  }),

  on(setOpenedDeleteSubCategoryDialog, (state, action) => {
    return {
      ...state,
      deleteSubCategoryDialogId: action.deleteSubCategoryDialogId,
    };
  }),

  on(deleteSubCategory, (state) => {
    return { ...state, loading: true };
  }),

  on(deleteSubCategorySuccess, (state, { subCategoryId: categoryId }) => {
    return {
      ...state,
      loading: false,
      subCategories: [...state.subCategories.filter((c) => c.id != categoryId)],
    };
  }),

  on(deleteSubCategoryFailure, (state) => {
    return { ...state, loading: false };
  }),

  on(deleteSelectedSubCategories, (state) => {
    return { ...state, loading: true };
  }),

  on(
    deleteSelectedSubCategoriesSuccess,
    (state, { subCategoriesIds: categoriesIds }) => {
      return {
        ...state,
        loading: false,
        selectedSubCategoryIds: [],
        subCategories: [
          ...state.subCategories.filter(
            (e) => !(e.id && categoriesIds.includes(e.id))
          ),
        ],
      };
    }
  ),

  on(deleteSelectedSubCategoriesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(filterSubCategories, (state, { filter }) => {
    return {
      ...state,
      filter,
    };
  }),

  on(paginateSubCategories, (state, { pagination }) => {
    return {
      ...state,
      pagination,
    };
  }),

  on(setSubCategoriesPage, (state, { page }) => {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        page,
      },
    };
  }),
  on(loadCategories, (state) => {
    return {
      ...state,
      isCategoriesLoading: true,
    };
  }),
  on(loadCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories,
      isCategoriesLoading: false,
    };
  }),

  on(loadCategoriesFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isCategoriesLoading: false,
    };
  }),

  on(setCategoriesFilter, (state, { categoryFilter }) => {
    return {
      ...state,
      categoryFilter,
    };
  }),

  on(resetState, (_) => {
    return {
      ...initialState,
    };
  })
);

export function subCategoryReducer(state: SubCategoryState, action: Action) {
  return _subCategoryReducer(state, action);
}
