// src/pages/AboutPage.jsx
import React from 'react';

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Tentang FlashLearn</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        FlashLearn adalah aplikasi web inovatif yang didedikasikan untuk merevolusi cara Anda belajar dan menghafal. Dengan memanfaatkan kekuatan *flashcard* interaktif, kami memungkinkan Anda membuat koleksi pembelajaran yang dipersonalisasi, melacak kemajuan Anda, dan menguasai materi apa pun dengan mudah.
      </p>
      <p className="text-lg text-gray-700 text-center max-w-2xl mt-4">
        Dibuat dengan React JS dan Tailwind CSS, FlashLearn menawarkan pengalaman pengguna yang responsif, intuitif, dan menyenangkan. Mari belajar lebih cerdas, bukan lebih keras!
      </p>
    </div>
  );
}

export default AboutPage;