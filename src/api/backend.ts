import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "services/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  ReplayListProps,
  MagazineListProps,
  PlatformProps,
  LiveDate,
  LiveLink,
  PDFProps,
} from "../pages/platform/services/platform.types";
import { BaseQueryApi } from "@reduxjs/toolkit/src/query/baseQueryTypes";

export const PlatformGetApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mock-clubjang.trevari.co.kr",
  }),
  tagTypes: ["GET"],
  endpoints: (builder) => ({
    getPlatform: builder.query<Array<PlatformProps>, { platformID: number }>({
      query: ({ platformID }) => ({
        url: `/platform/${platformID}`,
        method: "get",
        prepareHeaders: async (
          headers: Headers,
          { getState }: BaseQueryApi
        ) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        variables: { platformID },
      }),
      transformResponse: (response: { data: PlatformProps }) => {
        return response;
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response.status;
      },
      providesTags: (result, error) => [{ type: "GET" }],
    }),
    getReplay: builder.query<
      Array<ReplayListProps[]>,
      { platformID: number; searchParams: string }
    >({
      query: ({ platformID, searchParams }) => ({
        url: `/platform/${platformID}/archive?${searchParams}`,
        method: "get",
        prepareHeaders: async (
          headers: Headers,
          { getState }: BaseQueryApi
        ) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        variables: { platformID },
      }),
      transformResponse: (response: { data: ReplayListProps }) => {
        return response;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    getMagazine: builder.query<
      Array<MagazineListProps>,
      { platformID: number; searchParams: string }
    >({
      query: ({ platformID, searchParams }) => ({
        url: `/platform/${platformID}/archive?${searchParams}`,
        method: "get",
        prepareHeaders: async (
          headers: Headers,
          { getState }: BaseQueryApi
        ) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        variables: { platformID },
      }),
      transformResponse: (response: { data: MagazineListProps }) => {
        return response;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result, error) => [{ type: "GET" }],
    }),
    getLiveDate: builder.query<Array<LiveDate[]>, { platformID: number }>({
      query: ({ platformID }) => ({
        url: `/platform/${platformID}/liveDate`,
        method: "get",
        prepareHeaders: async (
          headers: Headers,
          { getState }: BaseQueryApi
        ) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        variables: { platformID },
      }),
      transformResponse: (response: { data: LiveDate[] }) => {
        return response;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result, error) => [{ type: "GET" }],
    }),
    getLiveLink: builder.query<Array<LiveLink>, { platformID: number }>({
      query: ({ platformID }) => ({
        url: `/platform/${platformID}/liveLink`,
        method: "get",
        prepareHeaders: async (
          headers: Headers,
          { getState }: BaseQueryApi
        ) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        variables: { platformID },
      }),
      transformResponse: (response: { data: LiveLink }) => {
        return response;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result, error) => [{ type: "GET" }],
    }),
    getPDFInfo: builder.query<
      Array<PDFProps>,
      { platformID: number; magazineID: number }
    >({
      query: ({ platformID, magazineID }) => ({
        url: `/platform/${platformID}/magazine/${magazineID}`,
        method: "get",
        prepareHeaders: async (
          headers: Headers,
          { getState }: BaseQueryApi
        ) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        variables: { platformID, magazineID },
      }),
      transformResponse: (response: { data: PDFProps }) => {
        return response;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result, error) => [{ type: "GET" }],
    }),
  }),
});

export const {
  endpoints: {
    getReplay,
    getMagazine,
    getPlatform,
    getLiveDate,
    getLiveLink,
    getPDFInfo,
  },
} = PlatformGetApi;
