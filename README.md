# BASIC AUTHENTICATION
api authentication ini merupakan proses langsung dari database, api ini basic dari semua aplikasi butuhkan mulai dari register, verifikasi email, login, forgot-password -> change-password(sebelum login) dan change-password(setelah login).

api ini terhubung dengan [api-gateway-nodejs](https://github.com/razizs/api-gateway-nodejs) module utama yang digunakan pembuatan api ini adalah express, knex, redis, jsonwebtoken, dan bcrypt


## INSTALLATION
package manager menggunakan [npm](https://www.npmjs.com/get-npm) gunakan perintah dibawah untuk install modul-modulnya
```bash 
npm install
``` 

buka config file di folder middleware untuk pasang settingan database anda. module database ini menggunakan knex.

download redis di situs resminya [redis](https://redis.io/) untuk cache


*Struktur tabel user*

name | type | default | extra
---- | ---- | ------- | -----
id | int | none | auto_increment
email | varchar | none | -
passsword | varchar | none | - 
active | tinyint | 1 | - 
join_date | int | none | - 
phone_number | varchar | none | - 
full_name | varchar | none | - 
username | varchar | none | - 
logedin | int | null | - 
logedout | int | null | - 
age | int | none | - 

## USAGE
pertama jalankan redis-servernya terlebih dahulu dan server local anda untuk menjalankan database mysql, lalu gunakan perintah dibawah untuk menjalankannya
```bash 
npm start
``` 