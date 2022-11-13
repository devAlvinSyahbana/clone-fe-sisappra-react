/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Modul</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/dashboard'
        icon='/media/icons/duotune/general/gen008.svg'
        title='Dashboards'
        fontIcon='bi-app-indicator'
      >
        <SidebarMenuItem
          to='/dashboard/dashboard-kepegawaian'
          title='Dashboard Kepegawaian'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/dashboard/dashboard-sarana-dan-prasarana'
          title='Dashboard Sarana dan Prasarana'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/dashboard/dashboard-penegakan-perda-dan-perkada'
          title='Dashboard Penegakan Perda dan Perkada'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/dashboard/dashboard-ketentraman-dan-ketertiban-umum'
          title='Dashboard Ketentraman dan Ketertiban Umum'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/dashboard/dashboard-wasdak-protokol-kesehatan'
          title='Dashboard Wasdak Protokol Kesehatan (PPKM)'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/dashboard/peta-titik-rawan'
          title='Peta Titik Rawan'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/dashboard/peta-titik-reklame'
          title='Peta Titik Reklame'
          hasBullet={true}
        />
        <SidebarMenuItem to='/dashboard/peta-kejadian' title='Peta Kejadian' hasBullet={true} />
        <SidebarMenuItem
          to='/dashboard/peta-ploting-anggota'
          title='Peta Ploting Anggota'
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/pelaporan'
        title='Pelaporan'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen055.svg'
      >
        <SidebarMenuItem
          to='/pelaporan/LaporanKegiatan'
          title='Laporan Kegiatan'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/pelaporan/LaporanKejadian'
          title='Laporan Kejadian'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/pelaporan/LaporanPengawasan'
          title='Laporan Pengawasan'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/pelaporan/LaporanTamuDaerah'
          title='Laporan Tamu Daerah'
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/kepegawaian'
        title='Kepegawaian'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/communication/com005.svg'
      >
        <SidebarMenuItem
          to='/kepegawaian/informasi-data-pegawai'
          title='Informasi Data Pegawai'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/kepegawaian/HirarkiPegawai'
          title='Hirarki Pegawai'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/kepegawaian/laporan-rekapitulasi-pegawai'
          title='Laporan Rekapitulasi Pegawai'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/kepegawaian/PenyidikPegawaiNegeriSipil/TabRekapitulasiPPNS'
          title='Penyidik Pegawai Negeri Sipil (PPNS)'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/kepegawaian/KehadiranPegawai'
          title='Kehadiran Pegawai'
          hasBullet={true}
        />
        <SidebarMenuItem to='/kepegawaian/JadwalPiket' title='Jadwal Piket' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/sarana-prasarana'
        title='Sarana & Prasarana'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/abstract/abs046.svg'
      >
        <SidebarMenuItem
          to='/sarana-prasarana/LaporanSaranaPrasarana'
          title='Laporan Sarana & Prasarana'
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/master'
        title='Master'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/abstract/abs015.svg'
      >
        <SidebarMenuItem to='/master/Kota' title='Kota' hasBullet={true} />
        <SidebarMenuItem to='/master/SKPD' title='SKPD' hasBullet={true} />
        <SidebarMenuItem to='/master/Pangkat' title='Pangkat' hasBullet={true} />
        <SidebarMenuItem to='/master/Agama' title='Agama' hasBullet={true} />
        <SidebarMenuItem to='/master/KorbanJiwa' title='Korban Jiwa' hasBullet={true} />
        <SidebarMenuItem to='/master/Kecamatan' title='Kecamatan' hasBullet={true} />
        <SidebarMenuItem to='/master/Kelurahan' title='Kelurahan' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisKegiatan' title='Jenis Kegiatan' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisKejadian' title='Jenis Kejadian' hasBullet={true} />
        <SidebarMenuItem to='/master/InstansiTerkait' title='Instansi Terkait' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisBantuan' title='Jenis Bantuan' hasBullet={true} />
        <SidebarMenuItem to='/master/KorbanMaterial' title='Korban Material ' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisPertolongan' title='Jenis Pertolongan' hasBullet={true} />
        <SidebarMenuItem
          to='/master/JenisPerdaPerkada'
          title='Jenis Perda / Perkada'
          hasBullet={true}
        />
        <SidebarMenuItem to='/master/JenisPenindakan' title='Jenis Penindakan' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisPelanggaran' title='Jenis Pelanggaran' hasBullet={true} />
        
        <SidebarMenuItem
          to='/master/TempatPelaksanaan'
          title='Tempat Pelaksanaan'
          hasBullet={true}
        />

        <SidebarMenuItem to='/master/Pendidikan' title='Pendidikan' hasBullet={true} />
        <SidebarMenuItem
          to='/master/JenisSaranaPrasarana'
          title='Jenis Sarana Prasarana'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/master/KondisiSaranaPrasarana'
          title='Kondisi Sarana Prasarana'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/master/StatusSaranaPrasarana'
          title='Status Sarana Prasarana'
          hasBullet={true}
        />
        <SidebarMenuItem to='/master/Golongan' title='Golongan' hasBullet={true} />
        <SidebarMenuItem to='/master/Eselon' title='Eselon' hasBullet={true} />
        <SidebarMenuItem to='/master/Jabatan' title='Jabatan' hasBullet={true} />
        <SidebarMenuItem
          to='/master/JenisPenyelesaian'
          title='Jenis Penyelesaian'
          hasBullet={true}
        />
        <SidebarMenuItem to='/master/SumberInformasi' title='Sumber Informasi' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisKekerasan' title='Jenis Kekerasan' hasBullet={true} />
        <SidebarMenuItem to='/master/JenisPenertiban' title='Jenis Penertiban' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Pengaturan</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/manajamen-pengguna'
        title='Manajemen Pengguna'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/gen051.svg'
      >
        <SidebarMenuItem to='/apps/data-pengguna' title='Pengguna' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Hak Akses' hasBullet={true} />
        <SidebarMenuItem to='/apps/akses-kontrol' title='Akses Kontrol' hasBullet={true} />
      </SidebarMenuItemWithSub>
    </>
  )
}

export { SidebarMenuMain }
