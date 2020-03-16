// @flow

import axios from "axios";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

const baseUrl = "https://api.thecatapi.com/v1/";

export default {
  getImages(breedId, ...rest) {
    const [type, categoryId] = rest;
    const typesQuery =
      type === "animated"
        ? "gif"
        : type === "all" || type === "null"
        ? ""
        : type === "static"
        ? "jpg,png"
        : "";
    const categoryIdQuery = categoryId ? categoryId : "";
    const breedIdQuery = breedId ? breedId : "";
    if (rest.length > 1) {
      return axios.get(
        `${baseUrl}images/search?limit=8&mime_types=${typesQuery}&order=Random&size=full&page=0&category_ids=${categoryIdQuery}&breed_ids=${breedIdQuery}`,
        axiosConfig
      );
    } else {
      return axios.get(
        `${baseUrl}images/search?limit=8&size=full&page=0`,
        axiosConfig
      );
    }
  },
  getCatsCategories() {
    return axios.get(`${baseUrl}categories`, axiosConfig);
  },
  getCatsBreeds() {
    return axios.get(`${baseUrl}breeds`, axiosConfig);
  },
  getSpecificBreed(id) {
    return axios.get(`${baseUrl}images/search?breed_ids=${id}`, axiosConfig);
  }
};
