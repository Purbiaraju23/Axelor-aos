import { Grid, Typography, Divider, Box } from "@mui/material";
import React from "react";
import "../../Styles/AddProduct.css";

function ProductTotal({ data }) {
  return (
    <div className="container-main-card">
      <div className="total-card">
        <div style={{ padding: 20 }}>
          <Grid container justifyContent="center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
            <div className="total-content">
              <div className="total-list">
                <Box>
                  <div className="product-wt">
                    <div className="label">
                      <Typography variant="subtitle1" gutterBottom sx={{ fontSize: "1.5rem" }}>
                        Total W.T.
                      </Typography>
                    </div>
                    <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                      {`${data.currency?.symbol || ""} ${data.exTaxTotal}`}
                    </Typography>
                  </div>
                </Box>
                <Box>
                  <div className="product-tax">
                    <div className="label">
                      <Typography variant="subtitle1" gutterBottom sx={{ fontSize: "1.5rem" }}>
                        Total tax
                      </Typography>
                    </div>
                    <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                      {`${data.currency?.symbol || ""} ${data.taxTotal}`}
                    </Typography>
                  </div>
                </Box>
              </div>
              <Divider />
              <div className="total-list">
                <Box>
                  <div className="product-ati">
                    <div className="label">
                      <Typography variant="subtitle1" gutterBottom sx={{ fontSize: "1.5rem" }}>
                        Total A.T.I.
                      </Typography>
                    </div>
                    <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                      {`${data.currency?.symbol || ""} ${data.inTaxTotal}`}
                    </Typography>
                  </div>
                </Box>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ProductTotal;
