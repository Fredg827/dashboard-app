"use client"

import React, { useState } from "react";

import { List } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import styles from "./CompaniesList.module.css";

import Overlay from "./Overlay";

const CompaniesList = ({companies}) => {
  const [selectedCompany, setSelectedCompany] = useState();
  const [openOverlay, setOpenOverlay] = useState(false);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setOpenOverlay(true);
  };

  console.log({selectedCompany, openOverlay, companies})

  return (
    <>
      { !!openOverlay &&
        <Overlay 
          companyId={selectedCompany} 
          companies={companies} 
          onClose={() => {setOpenOverlay(false)}} 
        />
      }

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
              {companies?.length! >= 1 ? (
                companies?.map((company) => (
                  <TableRow
                    key={company.id}
                    hover
                    className={styles.tableRow}
                    onClick={() => {
                      console.log('foo');
                      handleCompanyClick(company.id);
                    }}
                  >
                    <TableCell>
                        {company.name}
                    </TableCell>
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
    </>
  )
}

export default CompaniesList