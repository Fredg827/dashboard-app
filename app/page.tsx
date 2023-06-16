"use client";
import { List } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CodatCommon } from "@codat/common";
import { ListCompaniesResponse } from "@codat/common/dist/sdk/models/operations";
import React, { useState } from "react";
import NavBar from "./components/NavBar";

import styles from "./page.module.css";
import { CodatAccounting } from "@codat/accounting";

export const revalidate = 60;

const accounting = new CodatAccounting({
  security: {
    authHeader: process.env.CODAT_AUTH_HEADER!,
  },
});

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
    name: string;
    lastSync: string;
    created: string;
  } | null>(null);

  const companies = await getData();

  const handleCompanyClick = (company) => {
    setSelectedCompany({
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
        <Dialog open={openOverlay} onClose={handleOverlayClose}>
          {selectedCompany && (
            <>
              <DialogTitle>{selectedCompany.name}</DialogTitle>
              <DialogContent>
                <p>Last pull: {selectedCompany.lastSync}</p>
                <p>Created: {selectedCompany.created}</p>
              </DialogContent>
              <DialogActions>{/* button to the company */}</DialogActions>
            </>
          )}
        </Dialog>
      </main>
    </>
  );
};

export default Home;
