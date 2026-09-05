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

2. EXTRACT COMPETITION DATA AND ENSURE COMPETITION WORK VERY WELL

2. execute workflow and human in the loop `comp-extraction` run looping until 180 competition extract dgn baik 

2. run scheduled each 3 days `comp-extraction` and execute workflow 

2. run scheduled scrape each 3 days with filter deduplication handling
