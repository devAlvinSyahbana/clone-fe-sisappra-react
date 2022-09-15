import React, {useState, useEffect, Fragment} from 'react'
import {Link,useParams} from 'react-router-dom'





const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function LihatLaporanSarana() {


  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card mb-3 mb-xl-2">
              <div className="card-body">
              
              <div className="card-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="/sarana_prasarana/LaporanSaranaPrasarana">
                    <button className="btn btn-secondary"><i
                      className="fa-solid fa-arrow-left"></i> Kembali
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
    </div>
  )
}