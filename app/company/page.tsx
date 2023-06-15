"use client";
import { List } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import { CodatCommon } from "@codat/common";
import { ListCompaniesResponse } from "@codat/common/dist/sdk/models/operations";
import React, { useState } from "react";
import Overlay from "../components/Overlay";
import styles from "./page.module.css";
import NavBar from "../components/NavBar";

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
  const [openOverlay, setOpenOverlay] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<{
    id: string;
    name: string;
    lastSync: string;
    created: string;
  } | null>(null);

  const companies = await getData();

  const handleCompanyClick = (company) => {
    setSelectedCompany({
      id: company.id,
      name: company.name,
      lastSync: company.lastSync ?? "N/A",
      created: company.created ?? "N/A",
    });
    setOpenOverlay(true);
  };

  const handleOverlayClose = () => {
    setOpenOverlay(false);
  };

  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <h2 className={`${styles.center} ${styles.title}`}>Companies</h2>
        <div className={styles.companyList}>
          <List>
            <Table className={styles.fancyTable}>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.tableHeader}>Name</TableCell>
                  <TableCell className={styles.tableHeader}>
                    Last Pull
                  </TableCell>
                  <TableCell className={styles.tableHeader}>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies?.results?.length! >= 1 ? (
                  companies?.results?.map((company) => (
                    <TableRow
                      key={company.id}
                      hover
                      className={styles.tableRow}
                      onClick={() => {
                        handleCompanyClick(company.id);
                      }}
                    >
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company?.lastSync}</TableCell>
                      <TableCell>{company?.created}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className={styles.card}>
                        <h2>No companies</h2>
                        <p>
                          Head to the{" "}
                          <a
                            href="https://app.codat.io/companies"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Codat Portal
                          </a>{" "}
                          to add your first company
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </List>
        </div>
        <Overlay companyId={selectedCompany?.id} onClose={handleOverlayClose} />
      </main>
    </>
  );
};

export default Home;
