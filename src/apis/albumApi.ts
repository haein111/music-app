import axios from "axios";
import { GetNewReleasesResponse } from "../models/album";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const getNewReleases = async (
  clientCedentialToken: string
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCedentialToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch new releases");
  }
};
