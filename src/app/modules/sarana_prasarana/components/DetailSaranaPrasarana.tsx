import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function DetailSaranaPrasarana() {
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
          <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
              <div id="kt_app_content_container" className="app-container container-xxl">
                <div className="card mb-5 mb-xl-10">
                  <div className="card-body">
                  </div>
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
          </div>
    )
  }