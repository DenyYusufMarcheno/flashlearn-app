# FlashLearn - Aplikasi Pembelajaran Flashcard Interaktif

**By:** Deny Yusuf Marcheno

**Kategori:** EduTech

FlashLearn adalah sebuah platform web pembelajaran interaktif yang dirancang untuk membantu pengguna menghafal dan menguasai berbagai materi pelajaran menggunakan metode *flashcard* yang efektif. Aplikasi ini berfokus pada kemudahan penggunaan, antarmuka yang bersih, dan pengalaman belajar yang efisien.

## 🌟 Fitur Aplikasi

* **Manajemen Deck Flashcard:**
    * Melihat daftar koleksi *deck* (*flashcard*) yang tersedia.
    * Membuat *deck* baru dengan judul dan kategori yang disesuaikan.
    * Menghapus *deck* yang sudah ada.
* **Pembelajaran Flashcard Interaktif:**
    * Memilih *deck* tertentu untuk memulai sesi latihan.
    * Melihat *flashcard* satu per satu (sisi depan dan belakang).
    * Membalik kartu untuk melihat jawabannya.
    * Navigasi antar kartu (maju dan mundur).
* **Manajemen Kartu dalam Deck:**
    * Menambah kartu baru ke dalam *deck* yang sedang dipilih (memasukkan sisi depan dan belakang).
    * Menghapus kartu yang sedang ditampilkan dari *deck* yang aktif.
* **Navigasi Multi-Halaman:**
    * Aplikasi memiliki beberapa halaman (misal: Home, About, halaman detail *deck*) menggunakan React Router.
    * Navigasi antar halaman dilakukan menggunakan `<Link>` (untuk tautan) dan `useNavigate` (untuk navigasi programatik).
* **Desain Modern & Responsif:**
    * Tampilan antarmuka yang bersih dan intuitif.
    * Di-*styling* menggunakan Tailwind CSS untuk *layout* yang responsif dan estetika yang modern.
    * Komponen modular yang dapat digunakan kembali (`Header`, `Footer`, `SectionLayout`, `DeckCard`, `Flashcard`, `CardControls`, `CreateDeckForm`, `CreateCardForm`).
* **State Management Efisien:**
    * Menggunakan React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) untuk mengelola *state* lokal, *side effects*, dan mengoptimalkan performa.
    * Menggunakan React Context (`useContext`) untuk pengelolaan *state* global, menghindari *prop drilling*.
