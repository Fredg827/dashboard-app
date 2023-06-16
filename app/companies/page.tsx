import React from "react";

import { CodatCommon } from "@codat/common";
import { ListCompaniesResponse } from "@codat/common/dist/sdk/models/operations";

import styles from "./page.module.css";

import NavBar from "../components/NavBar";
import CompaniesList from "../components/CompaniesList";

export const revalidate = 60;

const common = new CodatCommon({
  security: {
    authHeader: process.env.CODAT_AUTH_HEADER!,
  },
});

const getData = async () => {
  const res = await common.companies
    .list({
      page: 1,
      pageSize: 100,
    })
    .then((res: ListCompaniesResponse) => {
      if (res.statusCode == 200) {
        return res;
      }

      throw new Error("Companies not found");
    });

  return res.companies;
};

const Home = async () => {
  const companies = await getData();

  return (
    <>
      <NavBar />

      <main className={styles.main}>
        <h2 className={`${styles.center} ${styles.title}`}>Companies</h2>

        <CompaniesList companies={companies?.results}/>
      </main>
    </>
  );
};

export default Home;
