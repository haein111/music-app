import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import {
  SearchCategoriesRequest,
  SearchCategoriesResponse,
  SearchRequestParams,
  SearchResponse,
} from "../models/search";

export const searchItemsByKeyword = async (
  token: string,
  params: SearchRequestParams
): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(",")); // join으로 array를 string으로 변환

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external)
      searchParams.append("include_external", params.include_external);
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to search items by keyword");
  }
};

// Categories
export const getSearchCategories = async (
  token: string,
  params: SearchCategoriesRequest
): Promise<SearchCategoriesResponse> => {
  try {
    const searchParams = new URLSearchParams();
    if (params.locale) searchParams.append("locale", params.locale);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());

    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/categories?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to get search categories");
  }
};
