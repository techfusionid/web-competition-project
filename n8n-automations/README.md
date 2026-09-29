# run website project competition
env
```bash
actor_180_comp_scrapping = https://console.apify.com/actors/tasks/B6RO5dPaqhyk1x7Mq/
actor_20_comp_scrapping = https://console.apify.com/actors/tasks/Y0KsmBcBY7fBHevum/

S3_endpoint = https://4c7c10d0a0b9ffcead7f92c375ec9f12.r2.cloudflarestorage.com
region = us-east-1
access_key_id = 8efd4e941ad1761826ec3c33cfda7f84
secret_access_key=
```

database postgres


1. SCRAPE LOT OF DATA FOR COMPETITIONS BANK

scrape (6*30) 180 competitions scrapping instagram to postgres and cloudflare R2 in n8n

2. EXTRACT COMPETITION DATA AND ENSURE COMPETITION WORKFLOW WORKING PROPERLY


## n8n workflow in markdown

### dev 
1. ambil 2 data
2. text extract dulu
3. baru extract gambar
4.


## checklist
- [x] 1. tech stack project fixed: n8n and nextjs
- [x] 2. skema database website 
- [ ] 3. n8n: mekanisme get data dan update data ke postgres database
- [ ] 4. n8n: mekanisme timpa kolom data text extractor
- [ ] 5. naikin akurasi structured output dgn refine prompt
- [ ] panduan migrasi database
- [ ] final testing menuju ke automation


logging
1. scrape konten instagram (berapa yg baru, berapa yg )
2. data postgres yg diambil 
3. hasil ekstraksi text
4. update ke postgres database
5. hasil ekstraksi gambar
6. full data yg diekstrak ke 

hasil ekstraksi gambar
