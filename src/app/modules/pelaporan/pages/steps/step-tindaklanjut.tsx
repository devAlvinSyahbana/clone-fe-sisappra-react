import React, {FC} from "react";
import Select from "react-select";

export const StepTindaklanjut: FC = () => {
    return (<div className='w-100'>
        <div className='pb-10 pb-lg-15'>
            <h2 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h2>

            <h3 className='fw-bolder text-dark'>ADMINISTRASI</h3>

            <div className="mb-10 form-group">
                <label className="required form-label">Jenis Pasal</label>
                <Select className="" value={0} options={[]} />
            </div>

            <div className="mb-10 form-group">
                <label className="required form-label">Jenis Penertiban</label>
                <input
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="mb-10 form-group">
                <label className="required form-label">Jenis Pelanggaran</label>
                <textarea
                    className="form-control"
                />
            </div>

            <div className="mb-10 form-group">
                <label className="required form-label">PERDA / PERKADA yang dilanggar</label>
                <textarea
                    className="form-control"
                />
            </div>

            <div className="row">
                <div className="col form-group">
                    <label className="required form-label">Penyelesaian</label>
                    <Select className="" value={0} options={[]} />
                </div>
                <div className="col form-group">
                    <label className="required form-label">Penindakan</label>
                    <Select className="" value={0} options={[]} />
                </div>
            </div>


            <div className="row mt-5">
                <div className="col">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3 className='fw-bolder text-dark'>IDENTITAS NAMA / USAHA</h3>
                    <div className="form-group">
                        <label className="required form-label">Nomor BAP</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-10">
                        <label className="required form-label">Nama/Penanggungjawab</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-10">
                        <label className="required form-label">Nama Usaha/Tempat</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-10">
                        <label className="required form-label">Alamat Usaha/Tempat</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-10">
                        <label className="required form-label">Alamat Pelanggar</label>
                        <textarea
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-10">
                        <label className="required form-label">NIK/Paspport</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-10">
                        <label className="required form-label">Jenis Usaha/Tempat</label>
                        <Select className="" value={0} options={[]} />
                    </div>
                </div>


                <div className="col">
                    <div className="form-group">
                        <label className="required form-label">Jumlah  Pelanggar</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <h3 className='fw-bolder text-dark mt-12'>JUMLAH DENDA</h3>
                    </div>

                    <div className="form-group mb-10">
                        <label className="required form-label">Non Pengadilan</label>
                        <input
                            type="number"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-10">
                        <label className="required form-label">Tanggal Setor</label>
                        <input
                            type="date"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-10">
                        <label className="required form-label">Nama Bank</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-10">
                        <label className="required form-label">No Validasi Bank</label>
                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>
                </div>

            </div>

        </div></div>)
}