import React, { useState, useEffect } from 'react';
import {
  Instagram,
  MapPin,
  MessageCircle,
  X,
  ChevronDown,
  Car,
  Facebook,
  Share,
  Copy,
  Check,
  Twitter,
  Clock,
  ShieldCheck,
  Star,
  Quote,
  Info,
  ThumbsUp
} from 'lucide-react';

interface CarItem {
  id: number;
  brand: string;
  name: string;
  type: string;
  year: string;
  condition: 'Seken' | 'Baru' | string;
  transmission: string;
  price: string;
  image: string;
}

interface Testimonial {
  name: string;
  car: string;
  rating: number;
  text: string;
}

interface Advantage {
  name: string;
  icon: string;
}

interface Faq {
  q: string;
  a: string;
}

const pageData = {
  name: "babemobil.id",
  phone: "6289529605601", // Nomor WA Showroom
  address: "Jl. Jend. Sudirman No. 88, Jakarta Selatan",
  title: "Pusat Mobil Seken & Baru Berkualitas",
  description: "Temukan mobil impian Anda dengan harga terbaik, kondisi terjamin, dan proses yang cepat. Melayani pembelian cash, kredit, dan tukar tambah.",
  history: "Berdiri sejak tahun 2015, babemobil.id bermula dari sebuah garasi kecil yang melayani jual beli mobil bekas antar teman. Berkat komitmen kami terhadap transparansi, kualitas, dan kepuasan pelanggan, kini kami telah berkembang menjadi salah satu showroom terpercaya dengan ratusan unit mobil pilihan yang siap menemani perjalanan Anda.",
  profileImg: "./logo.png",
  heroImg: "./background.jpg",
  links: {
    instagram: "https://www.instagram.com/solusilokal.id",
    maps: "https://maps.app.goo.gl/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/"
  },
  advantages: [
    { name: "Garansi Mesin", icon: "ShieldCheck" },
    { name: "Bebas Banjir & Tabrak", icon: "ThumbsUp" },
    { name: "Surat Kendaraan Aman", icon: "Check" },
    { name: "Bisa Test Drive", icon: "Car" }
  ] as Advantage[],
  testimonials: [
    { name: "Nabila", car: "Toyota Innova 2020", rating: 5, text: "Proses kredit sangat cepat dibantu sampai deal. Mobil kondisinya istimewa banget, luar dalam mulus. Terima kasih babemobil.id!" },
    { name: "Jesica", car: "Honda Brio 2021", rating: 5, text: "Beli mobil bekas rasa baru. Stafnya ramah dan transparan soal kondisi mobil. Dapat bonus poles bodi juga." },
    { name: "Apresia", car: "Mitsubishi Pajero 2019", rating: 4, text: "Pilihan unitnya banyak dan rapi. Harga juga bersaing. Rekomen buat yang cari SUV gagah kondisi prima." }
  ] as Testimonial[],
  faqs: [
    { q: "Apakah melayani pembelian secara kredit?", a: "Tentu! Kami bekerja sama dengan berbagai lembaga pembiayaan terpercaya. DP dan angsuran bisa disesuaikan dengan budget Anda." },
    { q: "Bisa tukar tambah (Trade-in) dengan mobil lama saya?", a: "Sangat bisa. Bawa mobil lama Anda ke showroom kami untuk dilakukan taksiran harga dengan nilai yang pantas dan transparan." },
    { q: "Apakah mobil bekas di sini ada garansinya?", a: "Ya, kami memberikan garansi mesin dan transmisi selama 1 bulan hingga 1 tahun (tergantung unit) untuk ketenangan Anda." },
    { q: "Bagaimana cara booking atau test drive?", a: "Anda bisa menghubungi kami via WhatsApp dengan mengisi form di bawah, atau langsung datang ke lokasi showroom kami." }
  ] as Faq[]
};

const carCatalog: CarItem[] = [
  // MPV
  { id: 1, brand: "Toyota", name: "Avanza 1.3 G", type: "MPV", year: "2019", condition: "Seken", transmission: "Manual", price: "Rp 165 Jt", image: "./galeri-toyota-avanza.png" },
  { id: 2, brand: "Toyota", name: "Innova Zenix", type: "MPV", year: "2023", condition: "Baru", transmission: "CVT", price: "Rp 425 Jt", image: "./galeri-toyota-innova.png" },
  { id: 8, brand: "Daihatsu", name: "Xenia 1.3 R", type: "MPV", year: "2020", condition: "Seken", transmission: "Automatic", price: "Rp 175 Jt", image: "./galeri-daihatsu-xenia.png" },
  { id: 9, brand: "Suzuki", name: "Ertiga GL", type: "MPV", year: "2018", condition: "Seken", transmission: "Manual", price: "Rp 150 Jt", image: "./galeri-suzuki-ertiga.png" },
  { id: 15, brand: "Toyota", name: "Voxy 2.0 A/T", type: "MPV", year: "2021", condition: "Seken", transmission: "Auto", price: "Rp 450 Jt", image: "./galeri-toyota-voxy.png" },

  // SUV
  { id: 4, brand: "Toyota", name: "Fortuner GR", type: "SUV", year: "2022", condition: "Seken", transmission: "Auto", price: "Rp 550 Jt", image: "./galeri-toyota-fortuner.png" },
  { id: 5, brand: "Honda", name: "BR-V Prestige", type: "SUV", year: "2020", condition: "Seken", transmission: "Auto", price: "Rp 235 Jt", image: "./galeri-honda-prestige.png" },
  { id: 7, brand: "Mitsubishi", name: "Pajero Dakar", type: "SUV", year: "2018", condition: "Seken", transmission: "Auto", price: "Rp 420 Jt", image: "./galeri-mitsubishi-pajero.png" },
  { id: 10, brand: "Hyundai", name: "Creta Prime", type: "SUV", year: "2023", condition: "Baru", transmission: "IVT", price: "Rp 408 Jt", image: "./galeri-hyundai-creta.png" },
  { id: 16, brand: "Honda", name: "HR-V SE", type: "SUV", year: "2022", condition: "Seken", transmission: "CVT", price: "Rp 350 Jt", image: "./galeri-honda.png" },
  { id: 17, brand: "Toyota", name: "Rush TRD", type: "SUV", year: "2020", condition: "Seken", transmission: "Auto", price: "Rp 220 Jt", image: "./galeri-toyota-rush.png" },

  // LCGC & City Car
  { id: 3, brand: "Honda", name: "Brio Satya E", type: "LCGC", year: "2021", condition: "Seken", transmission: "CVT", price: "Rp 145 Jt", image: "./galeri-honda-brio.png" },
  { id: 11, brand: "Toyota", name: "Agya 1.2 G", type: "LCGC", year: "2022", condition: "Seken", transmission: "Manual", price: "Rp 135 Jt", image: "./galeri-toyota-agya.png" },
  { id: 12, brand: "Daihatsu", name: "Ayla 1.0 M", type: "LCGC", year: "2019", condition: "Seken", transmission: "Manual", price: "Rp 95 Jt", image: "./galeri-daihatsu-ayla.png" },
  { id: 18, brand: "Daihatsu", name: "Sigra 1.2 R", type: "LCGC", year: "2022", condition: "Baru", transmission: "Manual", price: "Rp 155 Jt", image: "./galeri-daihatsu-sigra.png" },
  { id: 19, brand: "Toyota", name: "Calya 1.2 G", type: "LCGC", year: "2021", condition: "Seken", transmission: "Auto", price: "Rp 140 Jt", image: "./galeri-toyota-calya.png" },

  // Pickup & Commercial
  { id: 6, brand: "Suzuki", name: "Carry Pickup", type: "Pickup", year: "2022", condition: "Baru", transmission: "Manual", price: "Rp 160 Jt", image: "./galeri-suzuki-carry-pickup.png" },
  { id: 13, brand: "Daihatsu", name: "GranMax PU", type: "Pickup", year: "2021", condition: "Seken", transmission: "Manual", price: "Rp 120 Jt", image: "./galeri-daihatsu-granmax.png" },
  { id: 14, brand: "Mitsubishi", name: "L300 PU FB", type: "Pickup", year: "2023", condition: "Baru", transmission: "Manual", price: "Rp 230 Jt", image: "./galeri-mitsubishi.png" },
  { id: 20, brand: "Toyota", name: "Hilux Single Cabin", type: "Pickup", year: "2022", condition: "Seken", transmission: "Manual", price: "Rp 210 Jt", image: "./galeri-toyota-hilux.png" },
];

const categories = ["Semua", "MPV", "SUV", "LCGC", "Pickup"];

export default function App() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const carInterest = formData.get('carInterest');
    const paymentMethod = formData.get('paymentMethod');
    const notes = formData.get('notes');

    const waUrl = `https://wa.me/${pageData.phone}?text=Halo%20*${pageData.name}*,%20saya%20*${name}*.%0A%0ASaya%20tertarik%20dengan%20unit%20*${carInterest}*.%0ARencana%20pembelian:%20*${paymentMethod}*.%0A%0ACatatan/Pertanyaan:%20${notes}`;
    window.open(waUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: pageData.name,
      text: pageData.title,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderAdvantageIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'ThumbsUp': return <ThumbsUp size={20} />;
      case 'Check': return <Check size={20} />;
      case 'Car': return <Car size={20} />;
      default: return <Info size={20} />;
    }
  };

  const filteredCars = activeCategory === "Semua"
    ? carCatalog
    : carCatalog.filter(car => car.type === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body {
          background-color: #F1F5F9;
          color: #0F172A;
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <main className="w-full max-w-[480px] mx-auto relative shadow-2xl bg-[#F8FAFC] min-h-screen overflow-hidden pb-32">

        {/* HERO SECTION */}
        <section className="relative w-full min-h-[90dvh] flex flex-col justify-end pb-12 px-6 bg-slate-900">

          <button
            onClick={handleShare}
            aria-label="Share this page"
            className="absolute top-6 right-6 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-black/60 transition-all shadow-sm"
          >
            <Share size={20} />
          </button>

          <div className="absolute inset-0 z-0">
            <img
              src={pageData.heroImg}
              alt={pageData.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/30"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mt-32">
            <div className="w-24 h-24 rounded-full p-1 bg-white/10 backdrop-blur-md mb-5 shadow-2xl border border-red-500/50">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-2">
                <img src={pageData.profileImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
              <Car size={14} /> Showroom Auto
            </div>

            <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight drop-shadow-md">
              {pageData.name}
            </h1>
            <p className="text-slate-300 font-light text-sm leading-relaxed mb-6 max-w-[95%]">
              {pageData.description}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
              <a
                href={pageData.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <Instagram size={18} /> Instagram
              </a>
              <a
                href={pageData.links.maps}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <MapPin size={18} /> Lokasi
              </a>
            </div>

            <button
              onClick={() => scrollToSection('katalog-mobil')}
              className="group relative flex items-center justify-center gap-3 w-full max-w-sm py-4 bg-red-600 text-white rounded-2xl font-bold text-[13px] uppercase tracking-wider hover:bg-red-700 transition-all shadow-[0_8px_30px_rgba(220,38,38,0.4)]"
            >
              Lihat Katalog Mobil
              <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* TENTANG KAMI & HISTORY */}
        <section className="py-10 px-6 bg-white border-b border-slate-200">
          <div className="mb-6 flex flex-col gap-2 text-center items-center">
            <span className="text-red-600 font-bold text-xs tracking-widest uppercase">Tentang Kami</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kisah {pageData.name}</h2>
            <div className="w-12 h-1 bg-red-600 rounded-full mt-2"></div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <Quote size={80} className="absolute -top-4 -left-4 text-slate-200/50 -rotate-12" />
            <p className="text-slate-600 text-sm leading-loose relative z-10 text-justify">
              {pageData.history}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {pageData.advantages.map((adv, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="bg-red-50 p-2 rounded-xl text-red-600">
                  {renderAdvantageIcon(adv.icon)}
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">{adv.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* KATALOG MOBIL */}
        <section id="katalog-mobil" className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="px-6 mb-6">
            <span className="text-red-600 font-bold text-xs tracking-widest uppercase mb-1 block">Koleksi Kami</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Katalog Mobil Pilihan</h2>
            <p className="text-slate-500 text-xs mt-2">Temukan mobil seken atau baru yang sesuai dengan kebutuhan Anda.</p>
          </div>

          {/* Filter Kategori */}
          <div className="flex overflow-x-auto gap-2 px-6 pb-4 no-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List Mobil (Horizontal Scroll) */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 pt-2 no-scrollbar">
            {filteredCars.map((car) => (
              <div key={car.id} className="snap-start shrink-0 w-[240px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col pb-3">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 rounded-t-2xl">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Price Tag positioned in image */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
                    <span className="text-[11px] font-extrabold text-slate-900">{car.price}</span>
                  </div>

                  {/* Condition Tag */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold text-white shadow-sm backdrop-blur-md ${car.condition === 'Baru' ? 'bg-green-600/90' : 'bg-red-600/90'}`}>
                      {car.condition}
                    </span>
                  </div>
                </div>

                <div className="px-3 pt-3 flex-1 flex flex-col">
                  <h3 className="text-[13px] font-extrabold text-slate-900 leading-tight mb-1.5">{car.brand} {car.name}</h3>

                  <div className="text-[10px] text-slate-500 leading-relaxed mb-3 flex-1">
                    <span className="text-red-500 font-serif mr-1">"</span>
                    Tahun {car.year}, transmisi {car.transmission}. Kondisi {car.condition.toLowerCase()} terawat. Tipe {car.type}.
                  </div>

                  <div className="mt-auto pt-2 border-t border-slate-100/60">
                    <button
                      onClick={() => {
                        setActiveCategory(car.type);
                        scrollToSection('booking-form');
                      }}
                      className="w-full text-center bg-slate-900 text-white py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-800 transition-colors"
                    >
                      Tanya Unit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State Check */}
          {filteredCars.length === 0 && (
            <div className="text-center py-10 mx-6 bg-white rounded-3xl border border-slate-200">
              <Car size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">Belum ada unit {activeCategory} yang tersedia.</p>
            </div>
          )}
        </section>

        {/* LOKASI */}
        <section className="py-10 px-6 bg-slate-900 text-white">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-red-400">
              <MapPin size={24} />
            </div>
            <h2 className="text-2xl font-extrabold mb-2">Kunjungi Showroom Kami</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-[300px]">
              Lihat langsung unit pilihan Anda, test drive, dan dapatkan penawaran terbaik di tempat.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full">
              <p className="font-semibold text-[15px] mb-1">{pageData.address}</p>
              <div className="flex justify-center gap-4 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-slate-400"><Clock size={14} /> Buka Setiap Hari</span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400"><Clock size={14} /> 08:00 - 17:30</span>
              </div>
            </div>
            <a
              href={pageData.links.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-6 bg-white text-slate-900 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-slate-200 transition-colors shadow-lg"
            >
              Buka di Google Maps
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-6 bg-white border-b border-slate-200">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Tanya Jawab (FAQ)</h2>
            <p className="text-slate-500 text-xs">Informasi yang sering ditanyakan pelanggan kami.</p>
          </div>

          <div className="flex flex-col gap-3">
            {pageData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-transparent"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span className="font-bold text-[13px] text-slate-800 pr-4">{faq.q}</span>
                  <div className={`p-1 rounded-full bg-white border border-slate-200 transition-transform duration-300 shrink-0 ${openFaqIndex === idx ? 'rotate-180 bg-red-50 border-red-100' : ''}`}>
                    <ChevronDown size={16} className={openFaqIndex === idx ? 'text-red-600' : 'text-slate-500'} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-5 pt-0 text-slate-600 text-xs leading-relaxed border-t border-slate-100/50 mt-1">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONI */}
        <section className="py-12 px-6 bg-slate-50 border-b border-slate-200">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kata Mereka</h2>
            <p className="text-slate-500 text-xs">Pengalaman pelanggan yang telah membeli mobil di {pageData.name}.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {pageData.testimonials.map((testi, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[280px] bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <Quote size={20} className="text-slate-200" />
                </div>
                <p className="text-slate-600 text-[13px] leading-relaxed">"{testi.text}"</p>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <span className="block text-[13px] font-bold text-slate-900 mb-0.5">{testi.name}</span>
                  <span className="block text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Car size={12} className="text-red-500" /> Membeli {testi.car}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING / INQUIRY FORM */}
        <section id="booking-form" className="py-12 px-6 bg-slate-900">
          <div className="bg-white rounded-[2rem] p-7 shadow-2xl relative overflow-hidden">

            <div className="relative z-10 mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Tertarik & Ingin Nego?</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Isi form di bawah untuk menanyakan stok, nego harga, atau mengatur jadwal test drive via WhatsApp.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Nama Anda</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ketik nama lengkap"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Mobil yang Diminati</label>
                <select
                  name="carInterest"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none"
                >
                  <option value="">Pilih mobil dari katalog...</option>
                  <option value="Tanya unit lain">Cari unit lain (Tanya ketersediaan)</option>
                  {carCatalog.map(car => (
                    <option key={car.id} value={`${car.name} (${car.year})`}>{car.name} - {car.year}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Rencana Pembelian</label>
                <select
                  name="paymentMethod"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none"
                >
                  <option value="Cash / Tunai">Cash / Tunai</option>
                  <option value="Kredit (Leasing)">Kredit (Leasing)</option>
                  <option value="Tukar Tambah (Trade-in)">Tukar Tambah (Trade-in)</option>
                  <option value="Masih Pikir-pikir / Tanya Dulu">Tanya Dulu</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide ml-1">Pesan Tambahan</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Cth: Ingin janjian test drive hari Sabtu pagi..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#25D366] text-white font-bold text-sm tracking-wide py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg border border-[#20bd5a]"
              >
                Kirim via WhatsApp
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-10 pb-12 text-center flex flex-col items-center justify-center mx-6">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden border-2 border-red-500 p-1 shadow-md">
            <img src={pageData.profileImg} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <div className="text-slate-500 text-xs flex flex-col gap-1 items-center">
            <span className="font-extrabold text-slate-800 text-sm">{pageData.name}</span>
            <span className="max-w-[250px]">{pageData.address}</span>
          </div>

          <p className="text-slate-400 text-[10px] mt-8">
            © {new Date().getFullYear()} {pageData.name}. Hak Cipta Dilindungi.
          </p>

          <a
            href="https://www.solusilokal.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 text-[10px] mt-2 tracking-wide font-medium hover:text-slate-700 transition-colors"
          >
            powered by solusilokal.id
          </a>
        </footer>

        {/* STICKY CTA */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[432px] z-40 transition-all duration-500 ease-out ${showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
            }`}
        >
          <button
            onClick={() => scrollToSection('booking-form')}
            className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 backdrop-blur-xl border border-red-500/50 rounded-2xl text-white shadow-[0_10px_40px_rgba(15,23,42,0.4)] hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm tracking-wide text-white">Tanya Harga / Stok</span>
              <span className="text-[10px] text-slate-400">Hubungi kami via WhatsApp</span>
            </div>
            <div className="bg-red-600 text-white p-2.5 rounded-xl shadow-inner">
              <MessageCircle size={20} className="fill-none stroke-current stroke-2" />
            </div>
          </button>
        </div>

      </main>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm sm:items-center transition-opacity"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white sm:rounded-3xl rounded-t-3xl p-6 relative overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center mb-6 relative">
              <h3 className="text-slate-900 font-bold text-[15px]">Bagikan Showroom Kami</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute right-0 p-1 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar justify-center px-1 mb-4">
              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={copyToClipboard}
                  className="w-[60px] h-[60px] rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all shadow-sm border border-slate-200"
                >
                  {copied ? <Check size={26} className="text-green-600" /> : <Copy size={26} />}
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">
                  {copied ? 'Tersalin' : 'Salin Tautan'}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pageData.name)}`, '_blank')}
                  className="w-[60px] h-[60px] rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all shadow-sm"
                >
                  <Twitter size={26} />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">X</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-[60px] h-[60px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm"
                >
                  <Facebook size={26} className="fill-current" />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">Facebook</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(pageData.title + ' ' + window.location.href)}`, '_blank')}
                  className="w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm"
                >
                  <MessageCircle size={26} className="fill-current" />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">WhatsApp</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
