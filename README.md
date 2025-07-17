# Belanjain

Halo gua ikhsan, ini adalah web belanjain tapi versi next js karena sebelumnya gua udh pernah bikin versi codeigniter4, gua memutuskan memindahkan project ini ke next js karena next js enak dipake dan gua udh terbiasa dengan next js.

untuk menjalankan project web ini kalian membutuhkan database mysql di localhost kalian dan pastikan portnya di 3306.

pastikan ada nodejs dalam komputer kalian, dan ada bun di dalam komputer kalian karena gua pake bun disini.

jalankan perintah dibawah untuk menginstall depedensi

```bash
bun i
```

lalu buat file .env di root folder project ini, dan isi seperti ini

```text
DATABASE_URL="mysql://root@localhost:3306/belanjain_next"
```

jika database mysql kalian ada password tinggal ubah seperti ini

```text
DATABASE_URL="mysql://root:password@localhost:3306/belanjain_next"
```

lalu jangan lupa jalankan

```bash
bun x prisma db push
```

lalu build project dengan command

```bash
bun run build
```

setelah selesai tinggal jalankan

```bash
bun start
```
