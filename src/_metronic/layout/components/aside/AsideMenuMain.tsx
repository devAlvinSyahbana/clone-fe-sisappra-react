/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Modul</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      >
        <AsideMenuItem
          to='/dashboard/dashboard-kepegawaian'
          title='Dashboard Kepegawaian'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/dashboard/dashboard-sarana-dan-prasarana'
          title='Dashboard Sarana dan Prasarana'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/dashboard/dashboard-penegakan-perda-dan-perkada'
          title='Dashboard Penegakan Perda dan Perkada'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/dashboard/dashboard-ketentraman-dan-ketertiban-umum'
          title='Dashboard Ketentraman dan Ketertiban Umum'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/dashboard/dashboard-wasdak-protokol-kesehatan'
          title='Dashboard Wasdak Protokol Kesehatan (PPKM)'
          hasBullet={true}
        />
        <AsideMenuItem to='/dashboard/peta-titik-rawan' title='Peta Titik Rawan' hasBullet={true} />
        <AsideMenuItem
          to='/dashboard/peta-titik-reklame'
          title='Peta Titik Reklame'
          hasBullet={true}
        />
        <AsideMenuItem to='/dashboard/peta-kejadian' title='Peta Kejadian' hasBullet={true} />
        <AsideMenuItem
          to='/dashboard/peta-ploting-anggota'
          title='Peta Ploting Anggota'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/pelaporan'
        title='Pelaporan'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='/pelaporan/LaporanKegiatan' title='Laporan Kegiatan' hasBullet={true} />
        <AsideMenuItem to='/pelaporan/LaporanKejadian' title='Laporan Kejadian' hasBullet={true} />
        <AsideMenuItem
          to='/pelaporan/LaporanPengawasan'
          title='Laporan Pengawasan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/pelaporan/LaporanTamuDaerah'
          title='Laporan Tamu Daerah'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/kepegawaian'
        title='Kepegawaian'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem
          to='/kepegawaian/InformasiDataPegawai'
          title='Informasi Data Pegawai'
          hasBullet={true}
        />
        <AsideMenuItem to='/kepegawaian/HirarkiPegawai' title='Hirarki Pegawai' hasBullet={true} />
        <AsideMenuItem
          to='/kepegawaian/LaporanRekapitulasiPegawai'
          title='Laporan Rekapitulasi Pegawai'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/kepegawaian/PenyidikPegawaiNegeriSipil'
          title='Penyidik Pegawai Negeri Sipil (PPNS)'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/kepegawaian/KehadiranPegawai'
          title='Kehadiran Pegawai'
          hasBullet={true}
        />
        <AsideMenuItem to='/kepegawaian/JadwalPiket' title='Jadwal Piket' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/sarana_prasarana'
        title='Sarana & Prasarana'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem
          to='/sarana_prasarana/LaporanSaranaPrasarana'
          title='Laporan Sarana & Prasarana'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/master'
        title='Master'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem
          to='/Kota/Master'
          title='Kota'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/Kecamatan/Master'
          title='Kecamatan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/Kelurahan/Master'
          title='Kelurahan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisKegiatan/Master'
          title='Jenis Kegiatan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/InstansiTerkait/Master'
          title='Instansi Terkait'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisBantuan/Master'
          title='Jenis Bantuan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/KorbanMaterial/Master'
          title='Korban Material '
          hasBullet={true}
        />
        <AsideMenuItem
          to='/KorbanJiwa/Master'
          title='Korban Jiwa'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/Kelurahan/Master'
          title='Kelurahan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisPertolongan/Master'
          title='Jenis Pertolongan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisPerdaPerkada/Master'
          title='Jenis Perda'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisPerdaPerkada/Master'
          title='Jenis Perkada'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisPenindakan/Master'
          title='Jenis Penindakan'
          hasBullet={true}
        />
        <AsideMenuItem
          to='/JenisPelanggaran/Master'
          title='Jenis Pelanggaran'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
    </>
  )
}
