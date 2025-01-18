# MusicPlayer Uygulaması Backend

Bu proje, **Express.js**, **Node.js** ve **MongoDB** kullanılarak geliştirilmiş bir Music Player uygulamasının backend kısmıdır. 

## Özellikler

- Kullanıcı oturum yönetimi
- CRUD operasyonları
- MongoDB ile veri depolama
- Hızlı ve güvenli API uç noktaları

## Kullanılan Teknolojiler

- **Node.js**: JavaScript çalıştırma ortamı.
- **Express.js**: Web uygulamaları için minimal ve esnek bir framework.
- **MongoDB**: NoSQL veritabanı.
- **Mongoose**: MongoDB için nesne modelleme aracı.

## Kurulum ve Kullanım

Bu projeyi çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gerekli Bağımlılıkların Yüklenmesi

Projenin bulunduğu dizine gidin ve aşağıdaki komutu çalıştırarak bağımlılıkları yükleyin:

```bash
npm install

```

### 2. Çevre Değişkenlerini Ayarlayın
.env dosyasını oluşturun ve gerekli çevre değişkenlerini tanımlayın:

```
CONNECTION_STRING=mongodb://127.0.0.1:27017/music_app
LOG_LEVEL=info
PORT=3000

```
### 3. Geliştirme Sunucusunu Başlatın
Aşağıdaki komut ile sunucuyu başlatabilirsiniz:

```bash
npm start
```
Varsayılan olarak, sunucu http://localhost:3000 adresinde çalışır

## 4. API Endpoint'leri

API, şarkılarla ilgili işlemler için aşağıdaki endpoint'leri sunmaktadır:

| HTTP Yöntemi | Endpoint                | Açıklama              | Request Body                                                                                   | Response                                                                                         |
|--------------|-------------------------|-----------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `GET`        | `/api/songs`           | Şarkıların listesini döner. | Yok                                                                                           | `{ "success": true, "data": [ { "_id": "12345", "title": "Şarkı Adı", "category": "Kategori", "fileUrl": "https://example.com/song.mp3" } ] }` |
| `POST`       | `/api/songs/add`       | Yeni bir şarkı ekler. | `{ "title": "Şarkı Adı", "category": "Kategori", "fileUrl": "https://example.com/song.mp3" }` | `{ "success": true, "message": "Şarkı başarıyla eklendi." }`                                     |
| `POST`       | `/api/songs/delete`    | Belirtilen `_id` ile bir şarkıyı siler. | `{ "_id": "12345" }`                                                                          | `{ "success": true, "message": "Şarkı başarıyla silindi." }`                                     |

### Açıklamalar:

- **GET `/api/songs`**  
  Bu endpoint, veritabanındaki mevcut tüm şarkıların listesini döner.

- **POST `/api/songs/add`**  
  Yeni bir şarkı eklemek için kullanılır. Gönderilecek veriler:
  ```json
  {
    "title": "Şarkı Adı",
    "category": "Kategori",
    "fileUrl": "https://example.com/song.mp3"
  }
  
- **POST `/api/songs/delete`**  
  Belirtilen '_id' değeriyle bir şarkıyı silmek için kullanılır. Gönderilecek veri:
  ```json
  {
  "_id": "12345"
}
```
  